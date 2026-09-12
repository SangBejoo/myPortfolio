'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Volume2,
  VolumeX,
  Radio,
  HelpCircle,
  Eye,
  ListFilter,
  CheckCircle,
  Crosshair as CrosshairIcon,
} from 'lucide-react'
import { portfolioData } from '@/data/portfolioData'

export interface TargetTrackerItem {
  id: string
  title: string
  category: 'profile' | 'boss' | 'project' | 'cert' | 'contact'
  cleared: boolean
  bossHealth?: number
}

interface RangeHUDProps {
  targets: TargetTrackerItem[]
  activeTargetId?: string | null
  activeBossTarget?: TargetTrackerItem | null
  ammo: number
  maxAmmo: number
  isReloading: boolean
  isMuted: boolean
  volume: number
  isAmbientPlaying: boolean
  onToggleMute: () => void
  onChangeVolume: (val: number) => void
  onToggleAmbient: () => void
  onReload: () => void
  onSelectTarget: (id: string) => void
  onSwitchToNormalView: () => void
}

export function RangeHUD({
  targets,
  activeTargetId,
  activeBossTarget,
  ammo,
  maxAmmo,
  isReloading,
  isMuted,
  volume,
  isAmbientPlaying,
  onToggleMute,
  onChangeVolume,
  onToggleAmbient,
  onReload,
  onSelectTarget,
  onSwitchToNormalView,
}: RangeHUDProps) {
  const [showRoster, setShowRoster] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showAudioControls, setShowAudioControls] = useState(false)

  const clearedCount = targets.filter((t) => t.cleared).length
  const totalCount = targets.length
  const progressPercent = Math.round((clearedCount / (totalCount || 1)) * 100)

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-5 select-none">
      {/* Top Tactical Bar */}
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Left: Operative Callout & Progress */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#070B16]/90 border border-[#0A84FF]/30 rounded-xl px-3.5 py-2 backdrop-blur-md shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                RANGE HUD // {portfolioData.profile.handle}
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#0A84FF]/20 text-[#0A84FF] font-mono text-[10px]">
                ONLINE
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 sm:w-36 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0A84FF] to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-gray-300">
                {clearedCount}/{totalCount} INTEL ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Center: Boss Alert Bar (if boss target is engaged or still active) */}
        {activeBossTarget && (
          <div className="hidden md:flex pointer-events-auto items-center gap-3 bg-red-950/80 border border-red-500/50 rounded-xl px-4 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(255,59,48,0.3)]">
            <span className="font-mono text-xs text-red-400 font-bold tracking-widest animate-pulse">
              BOSS: INTELECTO LMS
            </span>
            <div className="flex gap-1.5 items-center">
              {[0, 1, 2].map((idx) => {
                const isAlive =
                  activeBossTarget.bossHealth !== undefined &&
                  idx < activeBossTarget.bossHealth
                return (
                  <div
                    key={idx}
                    className={`w-6 h-3 rounded-sm border ${
                      isAlive
                        ? 'bg-red-500 border-red-300 shadow-[0_0_8px_rgba(255,59,48,0.8)]'
                        : 'bg-red-950/40 border-red-900/40 opacity-40'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Right: Quick Switch & Audio & Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Controls Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowAudioControls(!showAudioControls)}
              className="p-2 rounded-xl bg-[#070B16]/90 border border-white/10 hover:border-[#0A84FF]/50 text-gray-300 hover:text-[#0A84FF] transition-all backdrop-blur-md"
              title="Audio settings"
              aria-label="Audio settings"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* Audio Flyout */}
            <AnimatePresence>
              {showAudioControls && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 top-12 w-56 bg-[#0B1120] border border-[#0A84FF]/30 rounded-xl p-3.5 shadow-2xl backdrop-blur-xl z-50 text-white space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0A84FF]">
                      AUDIO SETTINGS
                    </span>
                    <button
                      onClick={onToggleMute}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-gray-200"
                    >
                      {isMuted ? 'UNMUTE' : 'MUTE'}
                    </button>
                  </div>

                  {/* Volume Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400">
                      <span>MASTER SFX</span>
                      <span>{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
                      className="w-full accent-[#0A84FF] cursor-pointer"
                    />
                  </div>

                  {/* Ambient Hum Toggle */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-gray-300 flex items-center gap-1.5">
                      <Radio size={12} /> Ambient Drone
                    </span>
                    <button
                      onClick={onToggleAmbient}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        isAmbientPlaying
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {isAmbientPlaying ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Target Roster Drawer Toggle */}
          <button
            onClick={() => setShowRoster(!showRoster)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border font-mono text-xs font-semibold backdrop-blur-md transition-all ${
              showRoster
                ? 'bg-[#0A84FF] text-white border-[#0A84FF] shadow-[0_0_12px_rgba(10,132,255,0.5)]'
                : 'bg-[#070B16]/90 text-gray-300 border-white/10 hover:border-[#0A84FF]/50 hover:text-white'
            }`}
          >
            <ListFilter size={14} />
            <span className="hidden sm:inline">ROSTER</span>
            <span className="text-[11px] opacity-80">({clearedCount}/{totalCount})</span>
          </button>

          {/* Help Toggle */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 rounded-xl bg-[#070B16]/90 border border-white/10 hover:border-[#0A84FF]/50 text-gray-300 hover:text-[#0A84FF] transition-all backdrop-blur-md"
            title="Help / Controls"
            aria-label="Help"
          >
            <HelpCircle size={16} />
          </button>

          {/* CRITICAL PRD §8 REQUIREMENT: "Skip to Normal Portfolio" button always visible! */}
          <button
            onClick={onSwitchToNormalView}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0A84FF] to-[#0077B6] hover:from-[#0A84FF] hover:to-[#0A84FF] text-white font-mono text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(10,132,255,0.4)] transition-all active:scale-95"
            title="Skip game to view standard accessible portfolio"
          >
            <Eye size={14} />
            <span className="whitespace-nowrap">NORMAL VIEW</span>
          </button>
        </div>
      </div>

      {/* Target Roster Quick List (PRD §5: Persistent HUD mini list/map of remaining targets) */}
      <AnimatePresence>
        {showRoster && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="pointer-events-auto self-end w-80 max-h-[70vh] bg-[#070B16]/95 border border-[#0A84FF]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-white flex flex-col mt-2 z-40"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-[#0A84FF] flex items-center gap-1.5">
                <CrosshairIcon size={14} /> TARGET INTEL TRACKER
              </span>
              <button
                onClick={() => setShowRoster(false)}
                className="text-gray-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            </div>

            <p className="text-[10px] font-mono text-gray-400 py-1.5">
              Tap a target to jump to it — cleared ones reopen their dossier:
            </p>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 py-1">
              {targets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTarget(t.id)
                    setShowRoster(false)
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl font-mono text-xs flex items-center justify-between gap-2 border transition-all ${
                    t.id === activeTargetId && !t.cleared
                      ? 'bg-[#0A84FF]/10 border-[#0A84FF] ring-2 ring-[#0A84FF]/60 text-white hover:bg-[#0A84FF]/20'
                      : t.cleared
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/30'
                      : t.category === 'boss'
                      ? 'bg-red-950/30 border-red-500/40 text-red-300 hover:bg-red-900/40'
                      : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-[#0A84FF]/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px]">
                      {t.category === 'boss'
                        ? '👑'
                        : t.category === 'profile'
                        ? '👤'
                        : t.category === 'cert'
                        ? '🎖️'
                        : t.category === 'contact'
                        ? '📡'
                        : '🎯'}
                    </span>
                    <span className="truncate">{t.title}</span>
                  </div>

                  <span className="text-[10px] font-bold shrink-0">
                    {t.id === activeTargetId && !t.cleared ? (
                      <span className="text-[#0A84FF] flex items-center gap-0.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0A84FF] animate-pulse" /> LIVE
                      </span>
                    ) : t.cleared ? (
                      <span className="text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle size={10} /> REVEALED
                      </span>
                    ) : t.category === 'boss' ? (
                      <span className="text-red-400">
                        HP: {t.bossHealth ?? 3}/3
                      </span>
                    ) : (
                      <span className="text-amber-400">ARMED</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls / Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pointer-events-auto self-center max-w-md w-full bg-[#0B1120]/95 border-2 border-[#0A84FF]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-white space-y-4 z-50 my-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-xs font-bold text-[#0A84FF] flex items-center gap-2">
                <HelpCircle size={14} /> RANGE OPERATING MANUAL
              </span>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-white font-mono text-xs"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-2.5 text-xs font-mono text-gray-300">
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                <span className="text-gray-400">AIM WEAPON</span>
                <span className="text-[#0A84FF] font-bold">MOUSE MOVEMENT</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                <span className="text-gray-400">FIRE / RAYCAST</span>
                <span className="text-[#0A84FF] font-bold">LEFT MOUSE CLICK</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                <span className="text-gray-400">KEYBOARD SHOOT</span>
                <span className="text-[#0A84FF] font-bold">TAB (CYCLE) + ENTER / SPACE</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                <span className="text-gray-400">RELOAD WEAPON</span>
                <span className="text-[#0A84FF] font-bold">KEY [R] / AUTO-RELOAD</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                <span className="text-gray-400">MUTE SFX</span>
                <span className="text-[#0A84FF] font-bold">KEY [M]</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                <span className="text-gray-400">CLOSE DOSSIER</span>
                <span className="text-[#0A84FF] font-bold">KEY [ESC]</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                <span className="text-gray-400">BOSS TARGET</span>
                <span className="text-red-400 font-bold">REQUIRES 3 DIRECT HITS</span>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-2 rounded-xl bg-[#0A84FF] hover:bg-[#0A84FF] text-white font-mono text-xs font-bold tracking-wider transition-colors"
            >
              GOT IT, RETURN TO RANGE
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Bar: Ammo Station & Tactical Status */}
      <div className="flex items-end justify-between w-full">
        {/* Left: Quick Tips */}
        <div className="hidden sm:flex pointer-events-auto items-center gap-2 bg-[#070B16]/80 border border-white/10 rounded-xl px-3 py-1.5 backdrop-blur-md text-[11px] font-mono text-gray-400">
          <span className="text-[#0A84FF]">TIP:</span>
          <span>Targets pop up one by one • Tap ROSTER to jump to one • Boss needs 3 hits • [M] to Mute</span>
        </div>

        {/* Right: Tactical Ammo Counter */}
        <div className="pointer-events-auto flex items-center gap-3 bg-[#070B16]/90 border border-[#0A84FF]/30 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-lg">
          <div className="flex flex-col text-right">
            <span className="font-mono text-[10px] text-gray-400 tracking-wider">
              TACTICAL AMMO
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span
                className={`font-mono text-xl font-black ${
                  ammo <= 3 ? 'text-red-400 animate-pulse' : 'text-[#0A84FF]'
                }`}
              >
                {ammo}
              </span>
              <span className="font-mono text-xs text-gray-400">/{maxAmmo}</span>
            </div>
          </div>

          <button
            onClick={onReload}
            disabled={isReloading || ammo === maxAmmo}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
              isReloading
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 animate-pulse'
                : ammo < maxAmmo
                ? 'bg-[#0A84FF]/20 hover:bg-[#0A84FF] border-[#0A84FF]/50 text-white hover:shadow-md'
                : 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
            }`}
            title="Reload weapon [R]"
          >
            {isReloading ? 'RELOADING...' : 'RELOAD [R]'}
          </button>
        </div>
      </div>
    </div>
  )
}
