'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import {
  portfolioData,
  ProjectData,
  CertificationData,
} from '@/data/portfolioData'
import { audioSystem, SoundCategory } from '@/utils/audioSystem'
import {
  createProfileTargetTexture,
  createProjectTargetTexture,
  createCertTargetTexture,
  createContactTargetTexture,
  createDoodleWallTexture,
} from '@/utils/targetTextures'
import { ContentModal, ActiveModalData } from './ContentModal'
import { DoodleBlaster } from './DoodleBlaster'
import { Crosshair } from './Crosshair'
import { RangeHUD, TargetTrackerItem } from './RangeHUD'

interface TargetUserData {
  id: string
  title: string
  category: SoundCategory
  isBoss?: boolean
  bossHealth?: number
  maxBossHealth?: number
  cleared: boolean
  baseY: number
  baseZ: number
  phaseOffset: number
  projectRef?: ProjectData
  certRef?: CertificationData
  texture: THREE.CanvasTexture
  mesh: THREE.Mesh
  shieldMesh?: THREE.Mesh
  wireMesh?: THREE.Mesh
  // Pop-in scale animation progress (0 = just spawned, 1 = settled)
  spawnPop?: number
  isHitAnimating?: boolean
  hitAnimProgress?: number
}

interface Particle {
  mesh: THREE.Mesh
  velocity: THREE.Vector3
  life: number
  maxLife: number
}

const MAX_AMMO = 12

export function ShootingRangeScene({
  onSwitchToNormalView,
  reducedMotion = false,
  isMobile = false,
}: {
  onSwitchToNormalView: () => void
  reducedMotion?: boolean
  isMobile?: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Game & Audio State
  const [ammo, setAmmo] = useState(MAX_AMMO)
  const [isReloading, setIsReloading] = useState(false)
  const [isMuted, setIsMuted] = useState(audioSystem.getMuted())
  const [volume, setVolume] = useState(audioSystem.getVolume())
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false)
  const [activeModal, setActiveModal] = useState<ActiveModalData>(null)
  const [isHoverLocked, setIsHoverLocked] = useState(false)
  const [isFiring, setIsFiring] = useState(false)
  const [lastHit, setLastHit] = useState(false)

  // Target Tracker List for HUD
  const [trackerList, setTrackerList] = useState<TargetTrackerItem[]>([])
  const [activeBoss, setActiveBoss] = useState<TargetTrackerItem | null>(null)
  // Currently live (visible) target — targets spawn randomly one by one.
  const [activeTargetId, setActiveTargetId] = useState<string | null>(null)

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const targetsRef = useRef<TargetUserData[]>([])
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const mousePosRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0))
  const particlesRef = useRef<Particle[]>([])
  const muzzleLightRef = useRef<THREE.PointLight | null>(null)
  const cameraBasePos = useRef(new THREE.Vector3(0, 0, 0))
  const cameraRecoilOffset = useRef(new THREE.Vector3(0, 0, 0))
  const cameraRecoilRot = useRef(new THREE.Euler(0, 0, 0))
  // PRD §8: static scene when the user prefers reduced motion; lighter scene on mobile.
  // Mirrored in refs so the mount-once 3D effect always reads fresh values.
  const reducedMotionRef = useRef(reducedMotion)
  reducedMotionRef.current = reducedMotion
  const isMobileRef = useRef(isMobile)
  isMobileRef.current = isMobile
  // Stable indirection so canvas listeners never force a scene rebuild.
  const handleShootRef = useRef<() => void>(() => {})
  // One-by-one spawn system: only one target is live at a time.
  const activeIdRef = useRef<string | null>(null)
  const showTargetRef = useRef<((id: string | null) => void) | null>(null)

  // Setup tracker items on mount
  useEffect(() => {
    const list: TargetTrackerItem[] = [
      { id: 'profile', title: 'Operative Profile', category: 'profile', cleared: false },
      ...portfolioData.projects.map((p) => ({
        id: p.id,
        title: p.name,
        category: (p.boss ? 'boss' : 'project') as SoundCategory,
        cleared: false,
        bossHealth: p.boss ? (p.bossHealth ?? 3) : undefined,
      })),
      ...portfolioData.certifications.map((c) => ({
        id: c.id,
        title: c.name,
        category: 'cert' as SoundCategory,
        cleared: false,
      })),
      { id: 'contact', title: 'Communications Beacon', category: 'contact', cleared: false },
    ]
    setTrackerList(list)
    const boss = list.find((t) => t.category === 'boss') || null
    setActiveBoss(boss)
  }, [])

  // Audio Controls Handlers
  const handleToggleMute = useCallback(() => {
    const next = audioSystem.toggleMute()
    setIsMuted(next)
  }, [])

  const handleChangeVolume = useCallback((val: number) => {
    audioSystem.setVolume(val)
    setVolume(val)
    if (audioSystem.getMuted() && val > 0) {
      audioSystem.setMuted(false)
      setIsMuted(false)
    }
  }, [])

  const handleToggleAmbient = useCallback(() => {
    const active = audioSystem.toggleAmbient()
    setIsAmbientPlaying(active)
  }, [])

  // Reload action
  const handleReload = useCallback(() => {
    if (isReloading || ammo === MAX_AMMO) return
    setIsReloading(true)
    audioSystem.playReload()
    setTimeout(() => {
      setAmmo(MAX_AMMO)
      setIsReloading(false)
    }, 900)
  }, [isReloading, ammo])

  // One-by-one random spawner: show a single target, hide the rest.
  const showTargetById = useCallback((id: string | null) => {
    showTargetRef.current?.(id)
  }, [])

  const spawnRandom = useCallback(() => {
    const pool = targetsRef.current.filter((t) => !t.cleared)
    if (pool.length === 0) {
      showTargetById(null)
      return
    }
    const next = pool[Math.floor(Math.random() * pool.length)]
    showTargetById(next.id)
  }, [showTargetById])

  // Spawn 3D Particle Sparks
  const spawnHitSparks = useCallback((pos: THREE.Vector3, colorHex: number = 0x0A84FF, count: number = 24) => {
    if (!sceneRef.current) return
    const geom = new THREE.BoxGeometry(0.06, 0.06, 0.06)
    const mat = new THREE.MeshBasicMaterial({ color: colorHex })

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.copy(pos)

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 4.5,
        (Math.random() - 0.2) * 5.0,
        (Math.random() - 0.5) * 4.5
      )

      particlesRef.current.push({
        mesh,
        velocity,
        life: 0,
        maxLife: 0.35 + Math.random() * 0.35,
      })

      sceneRef.current.add(mesh)
    }
  }, [])

  // Shoot / Raycast handler
  const handleShoot = useCallback(() => {
    if (activeModal) return
    if (isReloading) return

    if (ammo <= 0) {
      handleReload()
      return
    }

    // Fire weapon
    setAmmo((prev) => prev - 1)
    setIsFiring(true)
    setTimeout(() => setIsFiring(false), 120)

    audioSystem.playGunshot(ammo)

    // Apply camera recoil (skipped when user prefers reduced motion)
    if (!reducedMotionRef.current) {
      cameraRecoilRot.current.x = 0.035
      cameraRecoilOffset.current.z = 0.08
    }

    // Trigger muzzle flash light
    if (muzzleLightRef.current) {
      muzzleLightRef.current.intensity = 8.0
    }

    // Perform Raycast
    if (!cameraRef.current || !sceneRef.current) return
    raycasterRef.current.setFromCamera(mousePosRef.current, cameraRef.current)

    const targetMeshes = targetsRef.current
      .filter((t) => t.mesh.visible)
      .map((t) => t.mesh)
    const intersects = raycasterRef.current.intersectObjects(targetMeshes, false)

    if (intersects.length > 0) {
      const hitObj = intersects[0].object as THREE.Mesh
      const targetData = targetsRef.current.find((t) => t.mesh === hitObj)

      if (targetData) {
        setLastHit(true)
        setTimeout(() => setLastHit(false), 260)

        // Spark particles at impact position
        spawnHitSparks(
          intersects[0].point,
          targetData.isBoss ? 0xFF3B30 : 0x0A84FF,
          targetData.isBoss ? 40 : 25
        )

        // Target hit animation trigger
        targetData.isHitAnimating = true
        targetData.hitAnimProgress = 0

        // Handle Boss Multi-Hit
        if (targetData.isBoss && targetData.bossHealth !== undefined && targetData.bossHealth > 1) {
          targetData.bossHealth -= 1
          audioSystem.playBossShieldDeflect(targetData.bossHealth)

          // Update HUD boss state
          setActiveBoss({
            id: targetData.id,
            title: targetData.title,
            category: 'boss',
            cleared: false,
            bossHealth: targetData.bossHealth,
          })

          // Re-generate texture with updated health bar
          if (targetData.projectRef) {
            targetData.texture = createProjectTargetTexture(
              targetData.projectRef,
              true,
              targetData.bossHealth
            )
            ;(targetData.mesh.material as THREE.MeshBasicMaterial).map = targetData.texture
            ;(targetData.mesh.material as THREE.MeshBasicMaterial).needsUpdate = true
          }
          return
        }

        // Target breached / cleared — pop a fresh random target behind the modal
        targetData.cleared = true
        audioSystem.playRevealJingle(targetData.category)
        setTimeout(() => spawnRandom(), 650)

        // Update Tracker List
        setTrackerList((prev) =>
          prev.map((t) =>
            t.id === targetData.id
              ? { ...t, cleared: true, bossHealth: targetData.isBoss ? 0 : undefined }
              : t
          )
        )

        if (targetData.isBoss) {
          setActiveBoss((prev) => (prev ? { ...prev, cleared: true, bossHealth: 0 } : null))
        }

        // Open relevant content dossier modal
        if (targetData.category === 'profile') {
          setActiveModal({ type: 'profile' })
        } else if (targetData.category === 'boss' || targetData.category === 'project') {
          if (targetData.projectRef) {
            setActiveModal({ type: 'project', project: targetData.projectRef })
          }
        } else if (targetData.category === 'cert') {
          if (targetData.certRef) {
            setActiveModal({ type: 'cert', cert: targetData.certRef })
          }
        } else if (targetData.category === 'contact') {
          setActiveModal({ type: 'contact' })
        }
      }
    } else {
      // Miss: play ricochet SFX & spawn small spark at back wall
      audioSystem.playMissRicochet()

      // Calculate where ray hits back wall (Z = -22)
      const ray = raycasterRef.current.ray
      const targetZ = -20
      const distance = (targetZ - ray.origin.z) / ray.direction.z
      if (distance > 0) {
        const missPoint = ray.origin.clone().add(ray.direction.clone().multiplyScalar(distance))
        spawnHitSparks(missPoint, 0xFF9F0A, 8)
      }
    }
  }, [activeModal, isReloading, ammo, handleReload, spawnHitSparks, spawnRandom])

  // Keep the stable listener indirection pointing at the latest shoot logic.
  useEffect(() => {
    handleShootRef.current = handleShoot
  }, [handleShoot])

  // Roster tap: jump an uncleared target to the front, or re-read a cleared dossier.
  const handleSelectTargetById = useCallback(
    (id: string) => {
      const target = targetsRef.current.find((t) => t.id === id)
      if (!target) return

      if (!target.cleared) {
        showTargetById(id)
        return
      }

      if (target.category === 'profile') {
        setActiveModal({ type: 'profile' })
      } else if (target.projectRef) {
        setActiveModal({ type: 'project', project: target.projectRef })
      } else if (target.certRef) {
        setActiveModal({ type: 'cert', cert: target.certRef })
      } else if (target.category === 'contact') {
        setActiveModal({ type: 'contact' })
      }
    },
    [showTargetById]
  )

  // Replay: reset every target and spawn a fresh random one.
  const handleResetRange = useCallback(() => {
    const bossHP = portfolioData.projects.find((p) => p.boss)?.bossHealth ?? 3
    targetsRef.current.forEach((t) => {
      t.cleared = false
      t.isHitAnimating = false
      if (t.isBoss && t.projectRef) {
        t.bossHealth = t.maxBossHealth ?? bossHP
        t.texture = createProjectTargetTexture(t.projectRef, true, t.bossHealth)
        ;(t.mesh.material as THREE.MeshBasicMaterial).map = t.texture
        ;(t.mesh.material as THREE.MeshBasicMaterial).needsUpdate = true
      }
    })

    setTrackerList((prev) =>
      prev.map((t) =>
        t.category === 'boss'
          ? { ...t, cleared: false, bossHealth: bossHP }
          : { ...t, cleared: false }
      )
    )
    setActiveBoss((prev) =>
      prev ? { ...prev, cleared: false, bossHealth: bossHP } : prev
    )
    setAmmo(MAX_AMMO)
    spawnRandom()
  }, [spawnRandom])

  // Keyboard navigation & controls (PRD §8)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeModal) {
        if (e.key === 'Escape') setActiveModal(null)
        return
      }

      if (e.key === 'r' || e.key === 'R') {
        handleReload()
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute()
      } else if (e.key === 'Tab') {
        e.preventDefault()
        // Single live target at a time — Tab snaps the aim onto it.
        const t =
          targetsRef.current.find((x) => x.id === activeIdRef.current) ??
          targetsRef.current.find((x) => x.mesh.visible)
        if (t && cameraRef.current) {
          // Point raycaster and mouse coordinate directly to target NDC
          const screenPos = t.mesh.position.clone().project(cameraRef.current)
          mousePosRef.current.x = screenPos.x
          mousePosRef.current.y = screenPos.y
          setIsHoverLocked(true)
        }
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleShoot()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeModal, handleReload, handleToggleMute, handleShoot])

  // Three.js Scene Initialization & Loop
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color('#F5F1E6')
    scene.fog = new THREE.FogExp2('#F5F1E6', 0.03)

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(58, aspect, 0.1, 80)
    camera.position.set(0, 0, 0)
    cameraRef.current = camera

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' })
    rendererRef.current = renderer
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileRef.current ? 1.5 : 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.innerHTML = ''
    container.appendChild(renderer.domElement)

    // 4. Lights — bright flat doodle-paper look
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const mainSpot = new THREE.SpotLight(0xffffff, 2.0, 45, Math.PI / 3, 0.5)
    mainSpot.position.set(0, 10, -5)
    mainSpot.target.position.set(0, 0, -12)
    scene.add(mainSpot)
    scene.add(mainSpot.target)

    const accentPointL = new THREE.PointLight(0x0A84FF, 1.2, 30)
    accentPointL.position.set(-6, 4, -8)
    scene.add(accentPointL)

    const accentPointR = new THREE.PointLight(0xFF9F0A, 1.2, 30)
    accentPointR.position.set(6, 4, -8)
    scene.add(accentPointR)

    // Muzzle flash dynamic light
    const muzzleLight = new THREE.PointLight(0xffffff, 0, 15)
    muzzleLight.position.set(0, -0.5, -0.5)
    scene.add(muzzleLight)
    muzzleLightRef.current = muzzleLight

    // 5. Doodle Paper Range (notebook floor, doodle back-wall, ink rails)
    // Floor
    const floorGeo = new THREE.PlaneGeometry(36, 45, 12, 12)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xe9e0c9,
      roughness: 0.95,
      metalness: 0,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, -2.4, -18)
    scene.add(floor)

    // Distance Lane Grid Lines on Floor
    for (let dist = -4; dist >= -30; dist -= 4) {
      const lineGeo = new THREE.PlaneGeometry(28, 0.08)
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x0A84FF, opacity: 0.25, transparent: true })
      const line = new THREE.Mesh(lineGeo, lineMat)
      line.rotation.x = -Math.PI / 2
      line.position.set(0, -2.38, dist)
      scene.add(line)
    }

    // Back Wall (hand-drawn doodle sheet)
    const wallGeo = new THREE.PlaneGeometry(38, 20)
    const wallTex = createDoodleWallTexture()
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.95,
      metalness: 0,
    })
    const wall = new THREE.Mesh(wallGeo, wallMat)
    wall.position.set(0, 4, -22)
    scene.add(wall)

    // Ceiling Guide Rails (ink clotheslines for hanging doodle targets)
    const railMat = new THREE.MeshBasicMaterial({ color: 0x1d1d1f, opacity: 0.28, transparent: true })
    ;[-5, -2.5, 0, 2.5, 5].forEach((rx) => {
      const railGeo = new THREE.CylinderGeometry(0.025, 0.025, 35)
      const rail = new THREE.Mesh(railGeo, railMat)
      rail.rotation.x = Math.PI / 2
      rail.position.set(rx, 4.2, -15)
      scene.add(rail)
    })

    // Atmospheric Floating Dust Particles (reduced count on mobile GPUs)
    const dustCount = isMobileRef.current ? 40 : 80
    const dustGeo = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    for (let d = 0; d < dustCount * 3; d += 3) {
      dustPositions[d] = (Math.random() - 0.5) * 20
      dustPositions[d + 1] = (Math.random() - 0.5) * 8 + 1
      dustPositions[d + 2] = -Math.random() * 22
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0x1d1d1f,
      size: 0.07,
      transparent: true,
      opacity: 0.22,
    })
    const dustParticles = new THREE.Points(dustGeo, dustMat)
    scene.add(dustParticles)

    // 6. Build Target Sprites & Meshes
    const targets: TargetUserData[] = []

    // Helper to add billboard target
    const addTarget = (
      id: string,
      title: string,
      category: SoundCategory,
      pos: [number, number, number],
      size: [number, number],
      texture: THREE.CanvasTexture,
      projectRef?: ProjectData,
      certRef?: CertificationData,
      isBoss: boolean = false,
      bossHP: number = 3
    ) => {
      const geo = new THREE.PlaneGeometry(size[0], size[1])
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(pos[0], pos[1], pos[2])
      scene.add(mesh)

      // Overhead suspension wire (ink string)
      const wireHeight = 4.2 - pos[1]
      const wireGeo = new THREE.CylinderGeometry(0.015, 0.015, wireHeight)
      const wireMat = new THREE.MeshBasicMaterial({ color: 0x1d1d1f, opacity: 0.45, transparent: true })
      const wire = new THREE.Mesh(wireGeo, wireMat)
      wire.position.set(pos[0], pos[1] + wireHeight / 2 + size[1] / 2, pos[2])
      scene.add(wire)

      // Boss Holographic Shield Ring
      let shieldMesh: THREE.Mesh | undefined
      if (isBoss) {
        const shieldGeo = new THREE.RingGeometry(size[0] * 0.58, size[0] * 0.68, 32)
        const shieldMat = new THREE.MeshBasicMaterial({
          color: 0xFF3B30,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        })
        shieldMesh = new THREE.Mesh(shieldGeo, shieldMat)
        shieldMesh.position.set(pos[0], pos[1], pos[2] - 0.05)
        scene.add(shieldMesh)
      }

      const item: TargetUserData = {
        id,
        title,
        category,
        isBoss,
        bossHealth: isBoss ? bossHP : undefined,
        maxBossHealth: isBoss ? bossHP : undefined,
        cleared: false,
        baseY: pos[1],
        baseZ: pos[2],
        phaseOffset: Math.random() * Math.PI * 2,
        projectRef,
        certRef,
        texture,
        mesh,
        shieldMesh,
        wireMesh: wire,
        spawnPop: 1,
      }

      targets.push(item)
    }

    // Target 1: Profile Target (Front left)
    const profileTex = createProfileTargetTexture()
    addTarget('profile', 'Operative Profile', 'profile', [-2.4, 0.2, -7.0], [2.2, 2.2], profileTex)

    // Target 2: Flagship Boss Target (Intelecto LMS) (Elevated center)
    const bossProj = portfolioData.projects.find((p) => p.boss) || portfolioData.projects[0]
    const bossHP = bossProj.bossHealth ?? 3
    const bossTex = createProjectTargetTexture(bossProj, true, bossHP)
    addTarget(bossProj.id, bossProj.name, 'boss', [0, 1.2, -13.5], [3.2, 3.2], bossTex, bossProj, undefined, true, bossHP)

    // Targets 3-7: Other Projects
    const normalProjects = portfolioData.projects.filter((p) => !p.boss)
    const projPositions: [number, number, number][] = [
      [-3.8, -0.2, -10.0], // CBT
      [3.4, 0.3, -9.0],    // Parking Space
      [-2.4, 0.9, -15.5],  // Rusunawa
      [2.8, -0.3, -12.0],  // Chat Waifu
      [3.8, 1.0, -16.5],   // Capstone
    ]

    normalProjects.forEach((proj, i) => {
      const pos = projPositions[i % projPositions.length]
      const tex = createProjectTargetTexture(proj, false)
      addTarget(proj.id, proj.name, 'project', pos, [2.2, 2.2], tex, proj)
    })

    // Targets 8-11: Certifications
    const certPositions: [number, number, number][] = [
      [-4.6, 1.6, -12.0], // Bangkit Cloud
      [4.6, 1.6, -13.0],  // Alibaba Cloud
      [-5.0, 0.2, -14.0], // CCIT
      [5.0, 0.2, -15.0],  // TOEIC
    ]

    portfolioData.certifications.forEach((cert, i) => {
      const pos = certPositions[i % certPositions.length]
      const tex = createCertTargetTexture(cert)
      addTarget(cert.id, cert.name, 'cert', pos, [2.0, 2.0], tex, undefined, cert)
    })

    // Target 12: Communications / Contact Beacon (Front right)
    const contactTex = createContactTargetTexture()
    addTarget('contact', 'Communications Beacon', 'contact', [2.4, -0.1, -6.5], [2.1, 2.1], contactTex)

    targetsRef.current = targets

    // One-by-one spawner: only the live target (mesh + wire + shield) is visible.
    showTargetRef.current = (id: string | null) => {
      targets.forEach((t) => {
        const live = t.id === id
        t.mesh.visible = live
        if (t.shieldMesh) t.shieldMesh.visible = live
        if (t.wireMesh) t.wireMesh.visible = live
        if (live) t.spawnPop = 0
      })
      activeIdRef.current = id
      setActiveTargetId(id)
    }
    // Opening spawn: a random target pops in first.
    showTargetRef.current(
      targets[Math.floor(Math.random() * targets.length)].id
    )

    // 7. Mouse Move & Raycast Hover Update
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mousePosRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mousePosRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      // Subtle parallax camera angle sway (disabled for reduced motion)
      if (!reducedMotionRef.current) {
        camera.rotation.y = -mousePosRef.current.x * 0.08
        camera.rotation.x = mousePosRef.current.y * 0.05
      }
    }

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        handleShootRef.current()
      }
    }

    // Touch support: tap-to-aim-and-shoot (mobile simplified path, PRD §3)
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      e.preventDefault()
      const rect = container.getBoundingClientRect()
      mousePosRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1
      mousePosRef.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1
      handleShootRef.current()
    }

    window.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('touchstart', onTouchStart, { passive: false })

    // 8. Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // 9. Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth camera recoil recovery
      cameraRecoilRot.current.x = THREE.MathUtils.lerp(cameraRecoilRot.current.x, 0, delta * 12)
      cameraRecoilOffset.current.z = THREE.MathUtils.lerp(cameraRecoilOffset.current.z, 0, delta * 10)
      camera.position.z = cameraBasePos.current.z + cameraRecoilOffset.current.z

      // Muzzle flash decay
      if (muzzleLight.intensity > 0) {
        muzzleLight.intensity = THREE.MathUtils.lerp(muzzleLight.intensity, 0, delta * 25)
      }

      // Hover Raycasting Test (live target only)
      raycasterRef.current.setFromCamera(mousePosRef.current, camera)
      const targetMeshes = targets
        .filter((t) => t.mesh.visible)
        .map((t) => t.mesh)
      const intersects = raycasterRef.current.intersectObjects(targetMeshes, false)
      setIsHoverLocked(intersects.length > 0)

      // Update Targets (pop-in spawn, idle bobbing, hover scaling, hit animation)
      targets.forEach((target) => {
        if (!target.mesh.visible) return

        // Spawn pop-in (easeOutBack)
        const popT = target.spawnPop ?? 1
        if (popT < 1) {
          target.spawnPop = Math.min(1, popT + delta * 2.2)
        }
        const eased =
          (target.spawnPop ?? 1) >= 1
            ? 1
            : 1 +
              2.70158 * Math.pow((target.spawnPop ?? 0) - 1, 3) +
              1.70158 * Math.pow((target.spawnPop ?? 0) - 1, 2)

        // Idle bobbing (static scene for reduced motion, PRD §8)
        const hoverBoost = intersects.some((i) => i.object === target.mesh) ? 1.08 : 1.0
        const bob = reducedMotionRef.current ? 0 : Math.sin(time * 2.2 + target.phaseOffset) * 0.08
        target.mesh.position.y = target.baseY + bob

        // Billboard orientation: ensure sprite plane always faces camera
        target.mesh.quaternion.copy(camera.quaternion)

        // Scale lerp toward hover boost x spawn pop
        const want = Math.max(0.001, hoverBoost * eased)
        target.mesh.scale.set(
          THREE.MathUtils.lerp(target.mesh.scale.x, want, delta * 10),
          THREE.MathUtils.lerp(target.mesh.scale.y, want, delta * 10),
          1
        )

        // Boss Shield rotation & pulse
        if (target.shieldMesh) {
          target.shieldMesh.position.copy(target.mesh.position)
          target.shieldMesh.position.z -= 0.02
          target.shieldMesh.rotation.z += delta * 1.5
        }

        // Hit flip animation (skipped for reduced motion — instant settle)
        if (target.isHitAnimating) {
          if (reducedMotionRef.current) {
            target.isHitAnimating = false
          } else {
            target.hitAnimProgress = (target.hitAnimProgress || 0) + delta * 4
            const rot = Math.sin((target.hitAnimProgress || 0) * Math.PI) * 0.4
            target.mesh.rotation.x += rot
            if ((target.hitAnimProgress || 0) >= 1) {
              target.isHitAnimating = false
            }
          }
        }
      })

      // Update particle sparks
      for (let pIdx = particlesRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = particlesRef.current[pIdx]
        p.life += delta
        p.mesh.position.addScaledVector(p.velocity, delta)
        p.velocity.y -= 9.8 * delta * 0.4 // subtle gravity
        p.mesh.scale.multiplyScalar(0.94)

        if (p.life >= p.maxLife) {
          scene.remove(p.mesh)
          p.mesh.geometry.dispose()
          particlesRef.current.splice(pIdx, 1)
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      scene.clear()
    }
    // Mount-once: listeners go through handleShootRef so state changes
    // (ammo, modal) never tear down and rebuild the WebGL scene.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clearedCount = trackerList.filter((t) => t.cleared).length
  const allCleared =
    trackerList.length > 0 && clearedCount === trackerList.length

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F5F1E6] select-none">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-crosshair" />

      {/* Doodle blaster weapon (desktop, cosmetic) */}
      {!isMobile && <DoodleBlaster isFiring={isFiring} />}

      {/* Interactive Custom Crosshair */}
      <Crosshair
        isLocked={isHoverLocked}
        isFiring={isFiring}
        lastHit={lastHit}
        ammo={ammo}
        maxAmmo={MAX_AMMO}
        isReloading={isReloading}
      />

      {/* Persistent Tactical Range HUD */}
      <RangeHUD
        targets={trackerList}
        activeTargetId={activeTargetId}
        activeBossTarget={activeBoss}
        ammo={ammo}
        maxAmmo={MAX_AMMO}
        isReloading={isReloading}
        isMuted={isMuted}
        volume={volume}
        isAmbientPlaying={isAmbientPlaying}
        onToggleMute={handleToggleMute}
        onChangeVolume={handleChangeVolume}
        onToggleAmbient={handleToggleAmbient}
        onReload={handleReload}
        onSelectTarget={handleSelectTargetById}
        onSwitchToNormalView={onSwitchToNormalView}
      />

      {/* Target Content Modal (Dossier Drawer) */}
      <ContentModal
        data={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* ALL CLEAR — every target down, offer a replay */}
      {allCleared && !activeModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#F5F1E6]/80 backdrop-blur-sm">
          <div className="max-w-sm w-full bg-[#FFFDF5] border-[3px] border-[#1D1D1F] rounded-3xl shadow-[8px_8px_0_#1D1D1F] p-6 text-center space-y-4">
            <div className="text-5xl">🏆</div>
            <h2 className="font-mono text-2xl font-black text-[#1D1D1F]">
              RANGE CLEARED!
            </h2>
            <p className="font-mono text-xs text-[#6E6E73] leading-relaxed">
              You popped all {trackerList.length} doodle targets and unlocked
              every intel dossier. Run it back?
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleResetRange}
                className="w-full py-3 rounded-2xl bg-[#0A84FF] hover:bg-[#0071E3] text-white font-mono text-sm font-bold tracking-wider transition-all active:scale-[0.98]"
              >
                ↻ SHUFFLE &amp; PLAY AGAIN
              </button>
              <button
                onClick={onSwitchToNormalView}
                className="w-full py-2.5 rounded-2xl bg-white hover:bg-[#F5F5F7] border-2 border-[#1D1D1F] text-[#1D1D1F] font-mono text-xs font-bold tracking-wider transition-all"
              >
                NORMAL PORTFOLIO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
