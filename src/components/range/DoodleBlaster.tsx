'use client'

import { useEffect, useState } from 'react'

// Hand-drawn doodle ray-blaster anchored at the bottom of the screen.
// Rotates toward the cursor and kicks on every shot. Purely cosmetic:
// hit detection still runs through the 3D raycast in ShootingRangeScene.
export function DoodleBlaster({ isFiring }: { isFiring: boolean }) {
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const ax = window.innerWidth / 2
      const ay = window.innerHeight - 80
      const dx = e.clientX - ax
      const dy = ay - e.clientY
      const deg = (Math.atan2(dx, dy) * 180) / Math.PI
      setAngle(Math.max(-55, Math.min(55, deg)))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed bottom-1 left-1/2 z-30 hidden md:block"
      style={{ transform: 'translateX(-50%)' }}
      aria-hidden
    >
      <div
        style={{
          transform: `rotate(${angle}deg) translateY(${isFiring ? 12 : 0})`,
          transformOrigin: '50% 85%',
          transition: 'transform 90ms ease-out',
        }}
      >
        <svg width="130" height="130" viewBox="0 0 130 130">
          {/* Muzzle POW burst */}
          {isFiring && (
            <g>
              <polygon
                points="65,2 71,16 86,10 78,23 93,27 79,33 84,47 70,40 65,54 60,40 46,47 51,33 37,27 52,23 44,10 59,16"
                fill="#FF9F0A"
                stroke="#1D1D1F"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </g>
          )}
          {/* Barrel */}
          <rect
            x="56"
            y="30"
            width="18"
            height="34"
            rx="4"
            fill="#F5F5F7"
            stroke="#1D1D1F"
            strokeWidth="4"
          />
          {/* Body */}
          <ellipse
            cx="65"
            cy="88"
            rx="30"
            ry="26"
            fill="#0A84FF"
            stroke="#1D1D1F"
            strokeWidth="4"
          />
          {/* Side fins */}
          <polygon
            points="37,80 22,96 38,98"
            fill="#FF9F0A"
            stroke="#1D1D1F"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <polygon
            points="93,80 108,96 92,98"
            fill="#FF9F0A"
            stroke="#1D1D1F"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Core dial */}
          <circle
            cx="65"
            cy="88"
            r="10"
            fill="#FFFFFF"
            stroke="#1D1D1F"
            strokeWidth="3.5"
          />
          <circle cx="65" cy="88" r="3.5" fill="#FF3B30" />
          {/* Grip */}
          <rect
            x="57"
            y="108"
            width="16"
            height="16"
            rx="3"
            fill="#1D1D1F"
          />
        </svg>
      </div>
    </div>
  )
}
