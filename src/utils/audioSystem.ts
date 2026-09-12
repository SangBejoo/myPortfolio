// Web Audio API procedural sound synthesizer for Portfolio Shooting Range
// 100% zero-dependency, zero-latency, works offline and respects browser autoplay

export type SoundCategory = 'profile' | 'project' | 'cert' | 'boss' | 'contact'

class ShootingRangeAudio {
  private ctx: AudioContext | null = null
  private ambientGain: GainNode | null = null
  private masterGain: GainNode | null = null
  private ambientOsc: OscillatorNode | null = null
  private ambientNoiseSource: AudioBufferSourceNode | null = null
  private isMuted: boolean = false
  private volume: number = 0.6
  private isAmbientPlaying: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('range_audio_muted')
      const savedVol = localStorage.getItem('range_audio_volume')
      if (savedMute !== null) this.isMuted = savedMute === 'true'
      if (savedVol !== null) this.volume = Math.max(0, Math.min(1, parseFloat(savedVol)))
    }
  }

  // Ensure AudioContext is created/resumed on user gesture
  public init(): boolean {
    if (typeof window === 'undefined') return false
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        this.ctx = new AudioCtx()

        this.masterGain = this.ctx.createGain()
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime)
        this.masterGain.connect(this.ctx.destination)
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      return true
    } catch {
      return false
    }
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('range_audio_muted', String(muted))
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime)
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted)
    return this.isMuted
  }

  public getVolume(): number {
    return this.volume
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol))
    if (typeof window !== 'undefined') {
      localStorage.setItem('range_audio_volume', String(this.volume))
    }
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime)
    }
  }

  // Gunshot SFX with slight variations to prevent repetition fatigue
  public playGunshot(variation: number = 0): void {
    if (!this.init() || !this.ctx || !this.masterGain || this.isMuted) return
    const now = this.ctx.currentTime

    // 1. Transient noise snap (powder explosion)
    const noiseBuffer = this.createNoiseBuffer(0.18)
    const noiseSource = this.ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const noiseFilter = this.ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(variation % 2 === 0 ? 1200 : 1600, now)
    noiseFilter.Q.setValueAtTime(2.0, now)

    const noiseGain = this.ctx.createGain()
    noiseGain.gain.setValueAtTime(1.0, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(this.masterGain)
    noiseSource.start(now)
    noiseSource.stop(now + 0.18)

    // 2. Punch sub-thump (punchy kick)
    const osc = this.ctx.createOscillator()
    const oscGain = this.ctx.createGain()
    osc.type = variation % 2 === 0 ? 'sine' : 'triangle'
    osc.frequency.setValueAtTime(variation % 2 === 0 ? 190 : 230, now)
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.12)

    oscGain.gain.setValueAtTime(0.9, now)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

    osc.connect(oscGain)
    oscGain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.15)
  }

  // Miss / Ricochet SFX (metallic whistle & deflecting ricochet)
  public playMissRicochet(): void {
    if (!this.init() || !this.ctx || !this.masterGain || this.isMuted) return
    const now = this.ctx.currentTime

    // Whistle glide
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sawtooth'

    const startFreq = 1600 + Math.random() * 800
    const endFreq = 400 + Math.random() * 300
    osc.frequency.setValueAtTime(startFreq, now)
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.22)

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(startFreq, now)
    filter.frequency.exponentialRampToValueAtTime(endFreq, now + 0.22)
    filter.Q.setValueAtTime(12, now)

    gain.gain.setValueAtTime(0.35, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.25)
  }

  // Reload SFX (tactical double-click: mag out / mag in)
  public playReload(): void {
    if (!this.init() || !this.ctx || !this.masterGain || this.isMuted) return
    const now = this.ctx.currentTime

    ;[0, 0.16].forEach((offset, i) => {
      if (!this.ctx || !this.masterGain) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'square'
      osc.frequency.setValueAtTime(i === 0 ? 320 : 480, now + offset)

      gain.gain.setValueAtTime(0.25, now + offset)
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.07)

      osc.connect(gain)
      gain.connect(this.masterGain)
      osc.start(now + offset)
      osc.stop(now + offset + 0.08)
    })
  }

  // Boss shield hit deflect
  public playBossShieldDeflect(remainingHealth: number): void {
    if (!this.init() || !this.ctx || !this.masterGain || this.isMuted) return
    const now = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(520 + (3 - remainingHealth) * 180, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.2)

    gain.gain.setValueAtTime(0.5, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(now)
    osc.stop(now + 0.23)
  }

  // Hit / Reveal Jingle per Category
  public playRevealJingle(category: SoundCategory): void {
    if (!this.init() || !this.ctx || !this.masterGain || this.isMuted) return
    const now = this.ctx.currentTime

    switch (category) {
      case 'profile':
        // Warm electronic chime triad (C5 - G5 - C6)
        ;[523.25, 783.99, 1046.5].forEach((freq, i) => {
          this.playBellTone(freq, now + i * 0.08, 0.4, 'sine')
        })
        break

      case 'project':
        // Retro cyber arpeggio (E5 - G#5 - B5 - E6)
        ;[659.25, 830.61, 987.77, 1318.51].forEach((freq, i) => {
          this.playBellTone(freq, now + i * 0.06, 0.35, 'triangle')
        })
        break

      case 'cert':
        // Metallic achievement fanfare (A5 - D6 - F#6 - A6)
        ;[880.0, 1174.66, 1479.98, 1760.0].forEach((freq, i) => {
          this.playBellTone(freq, now + i * 0.07, 0.45, 'sine', 0.6)
        })
        break

      case 'boss':
        // Flagship Boss Explosion & Victory chord
        this.playBossShatterExplosion(now)
        break

      case 'contact':
        // Communication beacon ping (G5 - D6)
        ;[783.99, 1174.66].forEach((freq, i) => {
          this.playBellTone(freq, now + i * 0.09, 0.5, 'sine')
        })
        break
    }
  }

  private playBellTone(
    freq: number,
    startTime: number,
    duration: number,
    type: OscillatorType = 'sine',
    resonance: number = 0.35
  ): void {
    if (!this.ctx || !this.masterGain) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, startTime)

    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(resonance, startTime + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

    osc.connect(gain)
    gain.connect(this.masterGain)
    osc.start(startTime)
    osc.stop(startTime + duration)
  }

  private playBossShatterExplosion(startTime: number): void {
    if (!this.ctx || !this.masterGain) return

    // Deep explosion rumble
    const noiseBuffer = this.createNoiseBuffer(0.7)
    const noiseSource = this.ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, startTime)
    filter.frequency.exponentialRampToValueAtTime(90, startTime + 0.65)

    const noiseGain = this.ctx.createGain()
    noiseGain.gain.setValueAtTime(0.8, startTime)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.65)

    noiseSource.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(this.masterGain)
    noiseSource.start(startTime)
    noiseSource.stop(startTime + 0.7)

    // Boss victory triad
    ;[392.0, 523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      this.playBellTone(freq, startTime + 0.15 + i * 0.08, 0.6, 'triangle', 0.4)
    })
  }

  // Ambient Range Tone (Subtle tactical ventilation / neon hum)
  public startAmbient(): void {
    if (!this.init() || !this.ctx || !this.masterGain || this.isAmbientPlaying) return

    try {
      this.ambientGain = this.ctx.createGain()
      this.ambientGain.gain.setValueAtTime(0.04, this.ctx.currentTime)

      // Low drone oscillator
      this.ambientOsc = this.ctx.createOscillator()
      this.ambientOsc.type = 'sine'
      this.ambientOsc.frequency.setValueAtTime(65, this.ctx.currentTime) // 65Hz low room hum

      // Filtered subtle air/wind noise
      const noiseBuffer = this.createNoiseBuffer(3.0)
      this.ambientNoiseSource = this.ctx.createBufferSource()
      this.ambientNoiseSource.buffer = noiseBuffer
      this.ambientNoiseSource.loop = true

      const noiseFilter = this.ctx.createBiquadFilter()
      noiseFilter.type = 'lowpass'
      noiseFilter.frequency.setValueAtTime(240, this.ctx.currentTime)

      this.ambientOsc.connect(this.ambientGain)
      this.ambientNoiseSource.connect(noiseFilter)
      noiseFilter.connect(this.ambientGain)
      this.ambientGain.connect(this.masterGain)

      this.ambientOsc.start()
      this.ambientNoiseSource.start()
      this.isAmbientPlaying = true
    } catch {
      // Audio autoplay policy or not supported
    }
  }

  public stopAmbient(): void {
    if (!this.isAmbientPlaying) return
    try {
      this.ambientOsc?.stop()
      this.ambientNoiseSource?.stop()
      this.ambientOsc?.disconnect()
      this.ambientNoiseSource?.disconnect()
      this.ambientGain?.disconnect()
    } catch {
      // ignore
    }
    this.ambientOsc = null
    this.ambientNoiseSource = null
    this.ambientGain = null
    this.isAmbientPlaying = false
  }

  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient()
      return false
    } else {
      this.startAmbient()
      return true
    }
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying
  }

  private createNoiseBuffer(durationSeconds: number): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext missing')
    const bufferSize = Math.floor(this.ctx.sampleRate * durationSeconds)
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    return buffer
  }
}

// Global singleton instance
export const audioSystem = new ShootingRangeAudio()
