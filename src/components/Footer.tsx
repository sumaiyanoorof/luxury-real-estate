import type { Page } from '../App'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
      {/* Top CTA strip */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '64px 40px',
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 32,
      }}>
        <div>
          <h2 className="font-display" style={{ fontSize: 42, fontWeight: 500, color: '#F8F5F0', margin: '0 0 8px', lineHeight: 1.1 }}>
            Ready to find your<br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>perfect estate?</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(248,245,240,0.5)', margin: 0, lineHeight: 1.6 }}>
            Join 12,000+ clients who found their dream home with LuxEstate.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('listings')}
            style={{
              padding: '14px 32px', borderRadius: 12,
              background: 'var(--accent)', border: 'none',
              color: '#fff', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.02em',
              transition: 'all 0.2s',
            }}
          >
            Browse Properties
          </button>
          <button
            onClick={() => onNavigate('contact')}
            style={{
              padding: '14px 32px', borderRadius: 12,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(248,245,240,0.85)', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', letterSpacing: '0.02em',
            }}
          >
            Talk to an Agent
          </button>
        </div>
      </div>

      {/* Main footer grid */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '56px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: 48, flexWrap: 'wrap' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 26, height: 26, background: 'var(--accent)', borderRadius: 6,
                transform: 'rotate(45deg)', flexShrink: 0,
              }} />
              <span className="font-display" style={{ fontSize: 18, fontWeight: 600, color: '#F8F5F0' }}>
                LuxEstate
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(248,245,240,0.45)', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 240 }}>
              The world's premier platform for extraordinary properties. Connecting discerning buyers with the finest real estate since 2008.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['X', 'In', 'f', 'ig'].map(platform => (
                <button key={platform} style={{
                  width: 36, height: 36, borderRadius: 9,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(248,245,240,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,245,240,0.4)', margin: '0 0 20px' }}>
              Properties
            </h4>
            {['Luxury Villas', 'Penthouses', 'Beachfront Estates', 'Mountain Retreats', 'City Residences', 'Commercial'].map(item => (
              <button
                key={item}
                onClick={() => onNavigate('listings')}
                style={{
                  display: 'block', background: 'none', border: 'none',
                  padding: '5px 0', fontSize: 13, color: 'rgba(248,245,240,0.55)',
                  cursor: 'pointer', transition: 'color 0.2s', textAlign: 'left',
                  lineHeight: 1.6,
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,245,240,0.4)', margin: '0 0 20px' }}>
              Company
            </h4>
            {[
              { label: 'About Us', page: 'about' as Page },
              { label: 'Our Agents', page: 'home' as Page },
              { label: 'Careers', page: 'about' as Page },
              { label: 'Press', page: 'about' as Page },
              { label: 'Blog', page: 'home' as Page },
              { label: 'Contact', page: 'contact' as Page },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                style={{
                  display: 'block', background: 'none', border: 'none',
                  padding: '5px 0', fontSize: 13, color: 'rgba(248,245,240,0.55)',
                  cursor: 'pointer', transition: 'color 0.2s', textAlign: 'left',
                  lineHeight: 1.6,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,245,240,0.4)', margin: '0 0 20px' }}>
              Services
            </h4>
            {['Property Valuation', 'Mortgage Advisory', 'Legal Services', 'Interior Design', 'Property Management', 'Relocation'].map(item => (
              <button
                key={item}
                style={{
                  display: 'block', background: 'none', border: 'none',
                  padding: '5px 0', fontSize: 13, color: 'rgba(248,245,240,0.55)',
                  cursor: 'pointer', transition: 'color 0.2s', textAlign: 'left',
                  lineHeight: 1.6,
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,245,240,0.4)', margin: '0 0 20px' }}>
              Stay Informed
            </h4>
            <p style={{ fontSize: 13, color: 'rgba(248,245,240,0.45)', lineHeight: 1.6, margin: '0 0 16px' }}>
              Market insights and new listings delivered weekly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  padding: '11px 16px', borderRadius: 10, fontSize: 13,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#F8F5F0',
                }}
              />
              <button style={{
                padding: '11px', borderRadius: 10, border: 'none',
                background: 'var(--accent)', color: '#fff',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
                Subscribe
              </button>
            </div>

            {/* Contact info */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: '✆', text: '+1 (800) 589-2847' },
                { icon: '✉', text: 'concierge@luxestate.com' },
                { icon: '⊙', text: '9560 Wilshire Blvd, Beverly Hills, CA' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                  <span style={{ fontSize: 12, color: 'rgba(248,245,240,0.45)', lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(248,245,240,0.3)', margin: 0 }}>
            © 2026 LuxEstate, Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map(item => (
              <button key={item} style={{
                background: 'none', border: 'none',
                fontSize: 12, color: 'rgba(248,245,240,0.3)',
                cursor: 'pointer', padding: 0,
              }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
