import { useEffect, useRef } from 'react'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import About     from './components/About'
import Features  from './components/Features'
import Rules     from './components/Rules'
import JoinSection from './components/JoinSection'
import Footer    from './components/Footer'
import StarsCanvas from './components/StarsCanvas'

export default function App() {
  const progressRef = useRef<HTMLDivElement>(null)

  /* Scroll progress bar */
  useEffect(() => {
    const update = () => {
      const scrolled  = window.scrollY
      const total     = document.documentElement.scrollHeight - window.innerHeight
      const pct       = total > 0 ? (scrolled / total) * 100 : 0
      if (progressRef.current) progressRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="relative min-h-screen bg-luna-black overflow-x-hidden">
      {/* Animated stars canvas */}
      <StarsCanvas />

      {/* Scroll progress bar */}
      <div ref={progressRef} id="scroll-progress" style={{ width: '0%' }} />

      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="orb w-[800px] h-[800px] opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b0f9e 0%, transparent 70%)',
            top: '-200px',
            left: '-200px',
          }}
        />
        <div
          className="orb w-[600px] h-[600px] opacity-15 animate-float-slow"
          style={{
            background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)',
            top: '40%',
            right: '-150px',
          }}
        />
        <div
          className="orb w-[400px] h-[400px] opacity-10"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            bottom: '20%',
            left: '30%',
          }}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Features />
          <Rules />
          <JoinSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
