import * as THREE from 'three'
import { ProjectData, CertificationData } from '@/data/portfolioData'

// Doodle-paper art direction: hand-drawn marker targets on paper discs.
// Ink #1D1D1F linework + single accent #0A84FF + PRD semantic hues.

const INK = '#1D1D1F'
const PAPER = '#FFFDF8'
const ACCENT = '#0A84FF'
const SUCCESS = '#30D158'
const WARNING = '#FF9F0A'
const DANGER = '#FF3B30'
const MUTED = '#6E6E73'

const MARKER_FONT = (weight: string, size: number) =>
  `${weight} ${size}px "Comic Sans MS", "Chalkboard SE", "Segoe Print", cursive`

function wobbleCircle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  color: string,
  width: number,
  wobble = 5,
  seed = 1
): void {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.beginPath()
  const segs = 64
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2
    const w =
      Math.sin(a * 3 + seed) * wobble + Math.sin(a * 7 + seed * 2) * wobble * 0.4
    const x = cx + Math.cos(a) * (r + w)
    const y = cy + Math.sin(a) * (r + w)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

function markerText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  color: string
): void {
  ctx.save()
  ctx.font = font
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.fillText(text, x, y)
  ctx.restore()
}

function sparkle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  color: string
): void {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x - r, y)
  ctx.lineTo(x + r, y)
  ctx.moveTo(x, y - r)
  ctx.lineTo(x, y + r)
  ctx.stroke()
  ctx.restore()
}

function paperDisc(ctx: CanvasRenderingContext2D): void {
  ctx.clearRect(0, 0, 512, 512)
  ctx.save()
  ctx.fillStyle = PAPER
  ctx.shadowColor = 'rgba(29,29,31,0.25)'
  ctx.shadowBlur = 18
  ctx.shadowOffsetY = 6
  ctx.beginPath()
  ctx.arc(256, 256, 224, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export function createProfileTargetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  paperDisc(ctx)
  wobbleCircle(ctx, 256, 256, 232, INK, 10, 5, 1)
  wobbleCircle(ctx, 256, 256, 204, ACCENT, 5, 4, 2)
  wobbleCircle(ctx, 256, 256, 150, INK, 3, 3, 3)
  wobbleCircle(ctx, 256, 256, 104, INK, 2.5, 3, 4)

  ctx.font = '76px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('👤', 256, 208)

  markerText(ctx, 'AGENT DOSSIER', 256, 318, MARKER_FONT('bold', 30), INK)
  markerText(ctx, 'AYUB / SANGBEJOO', 256, 356, MARKER_FONT('bold', 22), ACCENT)
  markerText(ctx, '★ SHOOT TO UNLOCK ★', 256, 404, MARKER_FONT('bold', 17), WARNING)

  sparkle(ctx, 96, 120, 12, ACCENT)
  sparkle(ctx, 420, 140, 10, WARNING)
  sparkle(ctx, 410, 400, 12, SUCCESS)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function createProjectTargetTexture(
  project: ProjectData,
  isBoss: boolean = false,
  bossHealth: number = 3
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  const mainColor = isBoss ? DANGER : ACCENT

  paperDisc(ctx)
  wobbleCircle(ctx, 256, 256, 232, INK, isBoss ? 12 : 9, 5, 5)
  wobbleCircle(ctx, 256, 256, 202, mainColor, 5, 4, 6)

  // Boss hazard scribble ticks
  if (isBoss) {
    ctx.save()
    ctx.strokeStyle = WARNING
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 10) {
      const x1 = 256 + Math.cos(angle) * 212
      const y1 = 256 + Math.sin(angle) * 212
      const x2 = 256 + Math.cos(angle) * 226
      const y2 = 256 + Math.sin(angle) * 226
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
    ctx.restore()
  }

  wobbleCircle(ctx, 256, 256, 148, INK, 3, 3, 7)
  wobbleCircle(ctx, 256, 256, 100, INK, 2.5, 3, 8)

  ctx.font = isBoss ? '82px system-ui, sans-serif' : '66px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const icon = isBoss
    ? '👑'
    : project.id === 'cbt'
    ? '📝'
    : project.id === 'booklens'
    ? '📖'
    : project.id === 'parking'
    ? '🚗'
    : project.id === 'rusunawa'
    ? '🏢'
    : project.id === 'atinout'
    ? '📍'
    : project.id === 'chat-waifu'
    ? '🌸'
    : '☁️'
  ctx.fillText(icon, 256, 192)

  markerText(
    ctx,
    isBoss ? '!! FLAGSHIP BOSS !!' : `PROJECT // ${project.organization.badge}`,
    256,
    284,
    MARKER_FONT('bold', 22),
    mainColor
  )

  const titleText =
    project.name.length > 22 ? project.name.slice(0, 20) + '…' : project.name
  markerText(ctx, titleText, 256, 324, MARKER_FONT('bold', 21), INK)
  markerText(
    ctx,
    project.stack.slice(0, 3).join(' • '),
    256,
    360,
    MARKER_FONT('normal', 15),
    MUTED
  )

  if (isBoss) {
    markerText(
      ctx,
      `SHIELD HP: ${bossHealth} / 3`,
      256,
      394,
      MARKER_FONT('bold', 16),
      DANGER
    )
    // Hand-drawn HP boxes
    for (let b = 0; b < 3; b++) {
      const bx = 200 + b * 40
      ctx.save()
      ctx.fillStyle = b < bossHealth ? DANGER : PAPER
      ctx.strokeStyle = INK
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.rect(bx, 414, 32, 12)
      ctx.fill()
      ctx.stroke()
      ctx.restore()
    }
  } else {
    markerText(ctx, '★ SHOOT TARGET ★', 256, 404, MARKER_FONT('bold', 16), WARNING)
  }

  sparkle(ctx, 100, 130, 11, mainColor)
  sparkle(ctx, 415, 380, 11, WARNING)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function createCertTargetTexture(cert: CertificationData): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  paperDisc(ctx)
  wobbleCircle(ctx, 256, 256, 232, INK, 9, 5, 9)
  wobbleCircle(ctx, 256, 256, 202, WARNING, 5, 4, 10)

  // Doodle ribbon tails under the medal
  ctx.save()
  ctx.strokeStyle = WARNING
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(216, 268)
  ctx.lineTo(196, 320)
  ctx.moveTo(296, 268)
  ctx.lineTo(316, 320)
  ctx.stroke()
  ctx.restore()

  wobbleCircle(ctx, 256, 256, 148, INK, 3, 3, 11)
  wobbleCircle(ctx, 256, 256, 100, INK, 2.5, 3, 12)

  ctx.font = '70px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('🎖️', 256, 200)

  markerText(ctx, 'CERTIFICATION', 256, 290, MARKER_FONT('bold', 24), INK)
  const certName =
    cert.name.length > 24 ? cert.name.slice(0, 22) + '…' : cert.name
  markerText(ctx, certName, 256, 330, MARKER_FONT('bold', 19), INK)
  markerText(ctx, cert.issuer.slice(0, 26), 256, 364, MARKER_FONT('normal', 14), MUTED)
  markerText(ctx, '★ SHOOT TO INSPECT ★', 256, 408, MARKER_FONT('bold', 16), WARNING)

  sparkle(ctx, 104, 150, 11, WARNING)
  sparkle(ctx, 412, 150, 11, WARNING)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function createContactTargetTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  paperDisc(ctx)
  wobbleCircle(ctx, 256, 256, 232, INK, 9, 5, 13)
  wobbleCircle(ctx, 256, 256, 202, SUCCESS, 5, 4, 14)
  wobbleCircle(ctx, 256, 256, 148, INK, 3, 3, 15)

  // Doodle radio waves
  ctx.save()
  ctx.strokeStyle = SUCCESS
  ctx.lineWidth = 5
  ctx.lineCap = 'round'
  ;[58, 82, 106].forEach((r) => {
    ctx.beginPath()
    ctx.arc(256, 210, r, -0.9, 0.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(256, 210, r, Math.PI - 0.9, Math.PI + 0.9)
    ctx.stroke()
  })
  ctx.restore()

  ctx.font = '64px system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('📡', 256, 210)

  markerText(ctx, 'SIGNAL BEACON', 256, 300, MARKER_FONT('bold', 24), INK)
  markerText(ctx, 'TRANSMIT MESSAGE / CTA', 256, 336, MARKER_FONT('bold', 17), INK)
  markerText(ctx, 'Email • LinkedIn • GitHub', 256, 368, MARKER_FONT('normal', 14), MUTED)
  markerText(ctx, '★ SHOOT TO CONNECT ★', 256, 408, MARKER_FONT('bold', 16), WARNING)

  sparkle(ctx, 104, 140, 11, SUCCESS)
  sparkle(ctx, 410, 140, 11, SUCCESS)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Big paper back-wall: faint notebook grid + ink margin + marker doodles.
export function createDoodleWallTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#F7F2E4'
  ctx.fillRect(0, 0, 1024, 512)

  // Faint notebook grid
  ctx.save()
  ctx.strokeStyle = 'rgba(10,132,255,0.14)'
  ctx.lineWidth = 1.5
  for (let x = 0; x <= 1024; x += 32) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 512)
    ctx.stroke()
  }
  for (let y = 0; y <= 512; y += 32) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(1024, y)
    ctx.stroke()
  }
  // Ink margin line
  ctx.strokeStyle = 'rgba(255,59,48,0.4)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(90, 0)
  ctx.lineTo(90, 512)
  ctx.stroke()
  ctx.restore()

  const ink = (width: number) => {
    ctx.save()
    ctx.strokeStyle = INK
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }
  const done = () => {
    ctx.stroke()
    ctx.restore()
  }

  // Doodle sun (top-left)
  ink(5)
  ctx.beginPath()
  ctx.arc(170, 110, 42, 0, Math.PI * 2)
  done()
  ink(4)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + 0.2
    ctx.beginPath()
    ctx.moveTo(170 + Math.cos(a) * 54, 110 + Math.sin(a) * 54)
    ctx.lineTo(170 + Math.cos(a) * 74, 110 + Math.sin(a) * 74)
    done()
  }

  // Doodle clouds
  const cloud = (cx: number, cy: number, s: number) => {
    ink(4)
    ctx.beginPath()
    ctx.arc(cx - 30 * s, cy, 20 * s, Math.PI * 0.5, Math.PI * 1.5)
    ctx.arc(cx, cy - 14 * s, 24 * s, Math.PI, Math.PI * 2)
    ctx.arc(cx + 30 * s, cy, 20 * s, Math.PI * 1.5, Math.PI * 0.5)
    ctx.closePath()
    done()
  }
  cloud(430, 90, 1)
  cloud(800, 130, 0.8)

  // Doodle mountains along the bottom
  ink(5)
  ctx.beginPath()
  ctx.moveTo(280, 470)
  ctx.lineTo(400, 340)
  ctx.lineTo(500, 470)
  ctx.moveTo(460, 470)
  ctx.lineTo(600, 320)
  ctx.lineTo(730, 470)
  done()

  // Spiral + arrow
  ink(4)
  ctx.beginPath()
  for (let a = 0; a < Math.PI * 4; a += 0.15) {
    const r = 4 + a * 3
    const x = 880 + Math.cos(a) * r
    const y = 330 + Math.sin(a) * r
    if (a === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  done()

  // "POW!" starburst (top-right)
  ink(4)
  ctx.beginPath()
  const px = 880
  const py = 110
  const spikes = 10
  for (let i = 0; i <= spikes * 2; i++) {
    const r = i % 2 === 0 ? 58 : 34
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
    const x = px + Math.cos(a) * r
    const y = py + Math.sin(a) * r
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  done()
  markerText(ctx, 'POW!', px, py, MARKER_FONT('bold', 34), INK)

  // Scattered sparkles
  sparkle(ctx, 300, 150, 10, INK)
  sparkle(ctx, 620, 180, 12, INK)
  sparkle(ctx, 120, 350, 11, INK)
  sparkle(ctx, 950, 420, 12, INK)
  sparkle(ctx, 540, 90, 9, ACCENT)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
