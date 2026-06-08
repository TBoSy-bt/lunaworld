import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number
  dx: number; dy: number
  alpha: number; dAlpha: number
  color: string
}

const COLORS = ['#f0e6ff', '#c084fc', '#a855f7', '#818cf8', '#ffffff']

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let width  = window.innerWidth
    let height = window.innerHeight
    canvas.width  = width
    canvas.height = height

    const count  = Math.floor((width * height) / 4000)
    const stars: Star[] = Array.from({ length: count }, () => ({
      x:      randomBetween(0, width),
      y:      randomBetween(0, height),
      r:      randomBetween(0.3, 1.8),
      dx:     randomBetween(-0.04, 0.04),
      dy:     randomBetween(-0.04, 0.04),
      alpha:  randomBetween(0.2, 1),
      dAlpha: randomBetween(-0.005, 0.005),
      color:  COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    let rafId: number

    function draw() {
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        /* drift */
        s.x     += s.dx
        s.y     += s.dy
        s.alpha += s.dAlpha

        if (s.x < 0)     s.x = width
        if (s.x > width) s.x = 0
        if (s.y < 0)     s.y = height
        if (s.y > height)s.y = 0
        if (s.alpha < 0.1 || s.alpha > 1) s.dAlpha *= -1

        /* glow halo */
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3)
        grd.addColorStop(0, s.color.replace(')', `,${s.alpha})`).replace('rgb', 'rgba').replace('#', '#'))
        grd.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.globalAlpha = s.alpha
        ctx.fillStyle   = s.color
        ctx.fill()
        ctx.globalAlpha = s.alpha * 0.3
        ctx.fillStyle   = grd
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      width  = window.innerWidth
      height = window.innerHeight
      canvas.width  = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="stars-canvas"
      aria-hidden="true"
    />
  )
}
