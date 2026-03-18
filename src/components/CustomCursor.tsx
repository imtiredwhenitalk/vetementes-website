import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }

    const leave = () => setVisible(false)

    // Smooth ring follow
    let animId: number
    const followRing = () => {
      setRingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }))
      animId = requestAnimationFrame(followRing)
    }

    // Detect hoverable elements
    const overHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover], .img-zoom')) {
        setHovering(true)
      }
    }
    const outHandler = () => setHovering(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    window.addEventListener('mouseover', overHandler)
    window.addEventListener('mouseout', outHandler)
    animId = requestAnimationFrame(followRing)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      window.removeEventListener('mouseover', overHandler)
      window.removeEventListener('mouseout', outHandler)
      cancelAnimationFrame(animId)
    }
  }, [pos.x, pos.y])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          opacity: visible ? 1 : 0,
          transform: hovering ? 'scale(3)' : 'scale(1)',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
      />
      <div
        className="cursor-ring hidden md:block"
        style={{
          left: ringPos.x - 20,
          top: ringPos.y - 20,
          opacity: visible ? 1 : 0,
          transform: hovering ? 'scale(1.8)' : 'scale(1)',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
      />
    </>
  )
}
