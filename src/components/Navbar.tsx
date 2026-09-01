import { useState, useEffect } from 'react'
import type { Page } from '../App'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  dark: boolean
  onToggleDark: () => void
}

export default function Navbar({ currentPage, onNavigate, dark, onToggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const onHero = currentPage === 'home' && !scrolled

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Buy', page: 'listings' },
    { label: 'Rent', page: 'listings' },
    { label: 'Agents', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
          background: onHero ? 'transparent' : 'var(--nav-bg)',
          backdropFilter: onHero ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: onHero ? 'none' : 'blur(20px)',
          borderBottom: onHero ? 'none' : `1px solid var(--border)`,
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 40px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: 'var(--accent)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(45deg)',
                flexShrink: 0,
              }}
            />
            <span
              className="font-display"
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                color: onHero ? '#fff' : 'var(--fg)',
                lineHeight: 1,
              }}
            >
              LuxEstate
            </span>
          </button>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: onHero
                    ? currentPage === link.page ? '#fff' : 'rgba(255,255,255,0.75)'
                    : currentPage === link.page ? 'var(--accent)' : 'var(--fg-secondary)',
                  transition: 'color 0.2s',
                  letterSpacing: '0.01em',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Dark mode toggle */}
            <button
              onClick={onToggleDark}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: onHero ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border)',
                background: onHero ? 'rgba(255,255,255,0.08)' : 'var(--bg-elevated)',
                color: onHero ? '#fff' : 'var(--fg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Sign in */}
            <button
              style={{
                padding: '9px 20px',
                borderRadius: 10,
                border: onHero ? '1px solid rgba(255,255,255,0.25)' : '1px solid var(--border-strong)',
                background: 'transparent',
                color: onHero ? '#fff' : 'var(--fg)',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.01em',
              }}
              className="hidden-mobile"
            >
              Sign In
            </button>

            {/* Get Started */}
            <button
              onClick={() => onNavigate('listings')}
              style={{
                padding: '9px 20px',
                borderRadius: 10,
                border: 'none',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.01em',
              }}
              className="hidden-mobile"
            >
              Get Started
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: onHero ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border)',
                background: onHero ? 'rgba(255,255,255,0.08)' : 'var(--bg-elevated)',
                color: onHero ? '#fff' : 'var(--fg)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              className="show-mobile"
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderTop: `1px solid var(--border)`,
              padding: '16px 24px 24px',
            }}
          >
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => { onNavigate(link.page); setMobileOpen(false) }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 500,
                  color: currentPage === link.page ? 'var(--accent)' : 'var(--fg)',
                  cursor: 'pointer',
                  borderBottom: `1px solid var(--border)`,
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button
                style={{
                  flex: 1, padding: '11px', borderRadius: 10,
                  border: '1px solid var(--border-strong)', background: 'transparent',
                  color: 'var(--fg)', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                }}
              >Sign In</button>
              <button
                onClick={() => { onNavigate('listings'); setMobileOpen(false) }}
                style={{
                  flex: 1, padding: '11px', borderRadius: 10,
                  border: 'none', background: 'var(--accent)',
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >Get Started</button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
