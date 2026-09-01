import { useState } from 'react'
import type { Page } from '../App'
import { properties, featuredAgents } from '../data/Properties'
import PropertyCard from '../components/PropertyCard'

interface HomePageProps {
  onNavigate: (page: Page) => void
  onSelectProperty: (id: string) => void
}

export default function HomePage({ onNavigate, onSelectProperty }: HomePageProps) {
  return (
    <main>
      <HeroSection onNavigate={onNavigate} />
      <CategoriesSection onNavigate={onNavigate} />
      <FeaturedPropertiesSection onSelectProperty={onSelectProperty} onNavigate={onNavigate} />
      <StatsSection />
      <WhyChooseUsSection />
      <FeaturedCitiesSection onNavigate={onNavigate} />
      <AgentsSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
    </main>
  )
}

function HeroSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState('Buy')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 0 }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop&auto=format&q=85"
          alt="Luxury estate"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(12,10,8,0.3) 0%, rgba(12,10,8,0.5) 40%, rgba(12,10,8,0.85) 100%)',
        }} />
        {/* Subtle grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1400, margin: '0 auto', width: '100%', padding: '0 40px 0' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 40, height: 2, background: 'var(--accent)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            Premier Real Estate
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-display" style={{
          fontSize: 'clamp(56px, 8vw, 108px)',
          fontWeight: 400,
          color: '#F8F5F0',
          lineHeight: 0.92,
          letterSpacing: '-0.02em',
          margin: '0 0 28px',
        }}>
          Find Your<br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 300 }}>Perfect</span><br />
          Estate
        </h1>

        <p style={{ fontSize: 17, color: 'rgba(248,245,240,0.65)', maxWidth: 420, lineHeight: 1.65, margin: '0 0 40px' }}>
          Discover extraordinary properties across the world's most prestigious addresses — curated for the discerning few.
        </p>

        {/* Search form */}
        <div style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 20,
          padding: '12px 12px 14px',
          maxWidth: 860,
        }}>
          {/* Tab row */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 12, paddingLeft: 4 }}>
            {['Buy', 'Rent', 'Commercial'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 22px', borderRadius: 11, border: 'none',
                  fontSize: 13, fontWeight: 600, letterSpacing: '0.02em',
                  cursor: 'pointer', transition: 'all 0.2s',
                  background: activeTab === tab ? 'var(--accent)' : 'transparent',
                  color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.65)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', flexWrap: 'wrap' }}>
            <div style={{ flex: '2 1 180px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.5)' }}>
                <SearchPinIcon />
              </div>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="City, neighborhood, or address"
                className="hero-input"
                style={{
                  width: '100%', padding: '13px 14px 13px 38px', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.14)',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff', fontSize: 14,
                }}
              />
            </div>
            <select
              value={propertyType}
              onChange={e => setPropertyType(e.target.value)}
              style={{
                flex: '1 1 140px', padding: '13px 14px', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.12)',
                color: propertyType ? '#fff' : 'rgba(255,255,255,0.55)',
                fontSize: 14, cursor: 'pointer',
              }}
            >
              <option value="">Property Type</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="luxury-home">Luxury Home</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
            </select>
            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              style={{
                flex: '1 1 140px', padding: '13px 14px', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.12)',
                color: priceRange ? '#fff' : 'rgba(255,255,255,0.55)',
                fontSize: 14, cursor: 'pointer',
              }}
            >
              <option value="">Price Range</option>
              <option value="0-1m">Under $1M</option>
              <option value="1m-5m">$1M – $5M</option>
              <option value="5m-10m">$5M – $10M</option>
              <option value="10m+">$10M+</option>
            </select>
            <button
              onClick={() => onNavigate('listings')}
              style={{
                padding: '13px 28px', borderRadius: 12, border: 'none',
                background: 'var(--accent)', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
                flexShrink: 0, letterSpacing: '0.03em',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Floating stats bar */}
      <div style={{
        position: 'relative', zIndex: 10, marginTop: 48,
        background: 'rgba(12,10,8,0.55)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '28px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
        }}>
          {[
            { value: '12,847+', label: 'Verified Listings' },
            { value: '2,400+', label: 'Expert Agents' },
            { value: '$4.2B+', label: 'In Transactions' },
            { value: '98%', label: 'Client Satisfaction' },
            { value: '50+', label: 'Global Markets' },
          ].map((stat, i) => (
            <div key={stat.label} style={{ textAlign: 'center', flex: '1 1 120px' }}>
              {i > 0 && <div style={{ display: 'none' }} />}
              <div className="font-display" style={{ fontSize: 28, fontWeight: 500, color: '#F8F5F0', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoriesSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const categories = [
    { label: 'All Properties', count: 12847, emoji: '🏛' },
    { label: 'Luxury Villas', count: 2340, emoji: '🏡' },
    { label: 'Penthouses', count: 847, emoji: '🔭' },
    { label: 'Beachfront', count: 1203, emoji: '🌊' },
    { label: 'Mountain Retreats', count: 418, emoji: '⛰' },
    { label: 'City Residences', count: 3201, emoji: '🏙' },
    { label: 'Commercial', count: 920, emoji: '🏢' },
    { label: 'Land & Lots', count: 684, emoji: '🌿' },
  ]

  return (
    <section style={{ padding: '80px 0 64px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px' }}>
              Explore by Type
            </p>
            <h2 className="font-display" style={{ fontSize: 40, fontWeight: 500, color: 'var(--fg)', margin: 0, lineHeight: 1.1 }}>
              Find what suits your lifestyle
            </h2>
          </div>
          <button
            onClick={() => onNavigate('listings')}
            style={{
              padding: '10px 24px', borderRadius: 10, border: '1px solid var(--border-strong)',
              background: 'transparent', color: 'var(--fg-secondary)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.02em',
            }}
          >
            View All →
          </button>
        </div>

        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {categories.map(cat => (
            <button
              key={cat.label}
              onClick={() => onNavigate('listings')}
              style={{
                flexShrink: 0, padding: '16px 22px', borderRadius: 16,
                border: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.25s',
                minWidth: 160,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                ;(e.currentTarget as HTMLElement).style.background = 'var(--accent-light)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 10 }}>{cat.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', marginBottom: 4 }}>{cat.label}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{cat.count.toLocaleString()} listings</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedPropertiesSection({ onSelectProperty, onNavigate }: { onSelectProperty: (id: string) => void; onNavigate: (p: Page) => void }) {
  const featured = properties.slice(0, 6)

  return (
    <section style={{ padding: '0 0 96px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px' }}>
              Handpicked for You
            </p>
            <h2 className="font-display" style={{ fontSize: 44, fontWeight: 500, color: 'var(--fg)', margin: 0, lineHeight: 1.1, maxWidth: 480 }}>
              Featured properties of the month
            </h2>
          </div>
          <button
            onClick={() => onNavigate('listings')}
            style={{
              padding: '12px 28px', borderRadius: 12, border: 'none',
              background: 'var(--fg)', color: 'var(--bg)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.02em',
            }}
          >
            Browse All Listings →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {featured.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onSelectProperty(property.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)' }}>
          {[
            { value: '12,847', suffix: '+', label: 'Verified Listings', desc: 'Every property authenticated by our expert team' },
            { value: '2,400', suffix: '+', label: 'Licensed Agents', desc: 'With proven track records in luxury markets' },
            { value: '$4.2', suffix: 'B+', label: 'In Transactions', desc: 'Across our platform since 2008' },
            { value: '98', suffix: '%', label: 'Satisfaction Rate', desc: 'Among verified client reviews' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '48px 36px',
                background: 'var(--bg-elevated)',
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div className="font-display" style={{ fontSize: 52, fontWeight: 500, color: 'var(--fg)', lineHeight: 1, margin: '0 0 8px' }}>
                {stat.value}
                <span style={{ color: 'var(--accent)' }}>{stat.suffix}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg-secondary)', margin: '0 0 8px' }}>{stat.label}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUsSection() {
  const features = [
    {
      icon: <VerifiedIcon />,
      title: 'Verified Listings',
      desc: 'Every property on our platform undergoes rigorous authentication by our specialist team before it appears.',
    },
    {
      icon: <AgentIcon />,
      title: 'Elite Agent Network',
      desc: 'Our 2,400+ agents are handpicked for expertise, integrity, and deep knowledge of their local luxury markets.',
    },
    {
      icon: <ShieldIcon />,
      title: 'Secure Transactions',
      desc: 'End-to-end encryption, escrow protection, and legal support across every transaction.',
    },
    {
      icon: <SupportIcon />,
      title: 'Concierge Service',
      desc: 'A dedicated concierge team available around the clock, from first enquiry to final closing.',
    },
    {
      icon: <SearchIcon />,
      title: 'Intelligent Matching',
      desc: 'Our proprietary algorithm learns your preferences and surfaces properties you\'ll actually love.',
    },
    {
      icon: <GlobeIcon />,
      title: 'Global Reach',
      desc: 'Access extraordinary properties across 50+ markets worldwide, from Aspen to the Amalfi Coast.',
    },
  ]

  return (
    <section style={{ background: 'var(--bg)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 16px' }}>
              Why LuxEstate
            </p>
            <h2 className="font-display" style={{ fontSize: 48, fontWeight: 500, color: 'var(--fg)', margin: '0 0 20px', lineHeight: 1.1 }}>
              The standard<br />others aspire to
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.7, margin: '0 0 32px' }}>
              In a market full of options, we are the choice of those for whom only the very best will do.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', borderRadius: 12,
              background: 'var(--accent-light)',
              border: '1px solid rgba(184,150,90,0.2)',
            }}>
              <span style={{ fontSize: 20 }}>★</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>4.92</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>from 8,400 reviews</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {features.map(f => (
              <div
                key={f.title}
                style={{
                  padding: '28px', borderRadius: 20,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--accent-light)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent)', marginBottom: 20,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--fg-muted)', margin: 0, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCitiesSection({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const cities = [
    { name: 'Beverly Hills', state: 'California', count: 2847, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=600&fit=crop&auto=format', span: 'large' },
    { name: 'New York City', state: 'New York', count: 4210, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop&auto=format', span: 'small' },
    { name: 'Miami', state: 'Florida', count: 1923, image: 'https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=600&h=400&fit=crop&auto=format', span: 'small' },
    { name: 'Malibu', state: 'California', count: 671, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop&auto=format', span: 'small' },
    { name: 'Aspen', state: 'Colorado', count: 482, image: 'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?w=600&h=400&fit=crop&auto=format', span: 'small' },
  ]

  return (
    <section style={{ background: 'var(--bg-secondary)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px' }}>
              Top Destinations
            </p>
            <h2 className="font-display" style={{ fontSize: 44, fontWeight: 500, color: 'var(--fg)', margin: 0, lineHeight: 1.1 }}>
              Markets we excel in
            </h2>
          </div>
          <button
            onClick={() => onNavigate('listings')}
            style={{
              padding: '10px 24px', borderRadius: 10, border: '1px solid var(--border-strong)',
              background: 'transparent', color: 'var(--fg-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            View all markets →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr 3fr', gridTemplateRows: 'auto auto', gap: 16 }}>
          {/* Large card */}
          <div
            onClick={() => onNavigate('listings')}
            style={{ gridRow: '1 / 3', borderRadius: 20, overflow: 'hidden', position: 'relative', cursor: 'pointer', minHeight: 480, background: 'var(--bg-elevated)' }}
          >
            <img src={cities[0].image} alt={cities[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform 0.6s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,10,8,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
              <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>{cities[0].state}</p>
              <h3 className="font-display" style={{ fontSize: 36, fontWeight: 500, color: '#F8F5F0', margin: '0 0 8px' }}>{cities[0].name}</h3>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{cities[0].count.toLocaleString()} properties</span>
            </div>
          </div>

          {/* Smaller cards */}
          {cities.slice(1).map(city => (
            <div
              key={city.name}
              onClick={() => onNavigate('listings')}
              style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', cursor: 'pointer', minHeight: 210, background: 'var(--bg-elevated)' }}
            >
              <img src={city.image} alt={city.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform 0.6s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,10,8,0.85) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 2px' }}>{city.state}</p>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: '#F8F5F0', margin: '0 0 4px' }}>{city.name}</h3>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{city.count.toLocaleString()} properties</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AgentsSection() {
  return (
    <section style={{ background: 'var(--bg)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 12px' }}>
            Our Specialists
          </p>
          <h2 className="font-display" style={{ fontSize: 44, fontWeight: 500, color: 'var(--fg)', margin: 0, lineHeight: 1.1 }}>
            Meet your estate advisors
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {featuredAgents.map(agent => (
            <div
              key={agent.name}
              className="hover-lift"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 24, overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              <div style={{ height: 280, position: 'relative', background: 'var(--bg-secondary)' }}>
                <img
                  src={agent.image}
                  alt={agent.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: 16, right: 16 }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                    background: 'rgba(184,150,90,0.9)', color: '#fff',
                    backdropFilter: 'blur(8px)',
                  }}>
                    ★ {agent.rating}
                  </span>
                </div>
              </div>
              <div style={{ padding: '22px 20px 24px' }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg)', margin: '0 0 4px' }}>{agent.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 14px' }}>
                  {agent.role}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 18, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg)' }}>{agent.experience}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>Yrs Exp</div>
                  </div>
                  <div style={{ width: 1, background: 'var(--border)' }} />
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg)' }}>{agent.listings}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>Listings</div>
                  </div>
                </div>
                <button style={{
                  width: '100%', padding: '10px', borderRadius: 12,
                  border: '1px solid var(--border-strong)', background: 'transparent',
                  color: 'var(--fg)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  Contact Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const testimonials = [
    {
      quote: "LuxEstate found us our dream penthouse in Manhattan. The process was seamless, utterly professional, and exceeded every expectation we had.",
      name: 'Catherine & William Ashford',
      detail: 'Purchased: The Meridian Penthouse, New York — $18M',
      image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&auto=format',
      rating: 5,
    },
    {
      quote: "Working with the LuxEstate team was an absolute pleasure. Their knowledge of the Beverly Hills market is unparalleled — we sold for 15% above asking.",
      name: 'Robert Kingsley',
      detail: 'Sold: The Ridgeline Estate, Beverly Hills — $9.8M',
      image: 'https://images.unsplash.com/photo-1647580427155-0483906cb9de?w=200&h=200&fit=crop&auto=format',
      rating: 5,
    },
    {
      quote: "The concierge service throughout our search for a Malibu property was exceptional. I wouldn't trust anyone else with a purchase of this magnitude.",
      name: 'Isabelle Fontaine',
      detail: 'Purchased: Oceanfront Estate, Malibu — $12.75M',
      image: 'https://images.unsplash.com/photo-1770199105692-9e52ff137cad?w=200&h=200&fit=crop&auto=format',
      rating: 5,
    },
  ]

  const t = testimonials[active]

  return (
    <section style={{ background: 'var(--fg)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 16px' }}>
              Testimonials
            </p>
            <h2 className="font-display" style={{ fontSize: 44, fontWeight: 500, color: 'var(--bg)', margin: '0 0 24px', lineHeight: 1.1 }}>
              What our clients say
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(248,245,240,0.4)', lineHeight: 1.7, margin: '0 0 32px' }}>
              Over 8,400 verified reviews from clients who trusted us with their most important purchase.
            </p>

            {/* Navigation dots */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: active === i ? 32 : 8, height: 8, borderRadius: 4,
                    border: 'none', background: active === i ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                    cursor: 'pointer', transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28, padding: '48px',
          }}>
            {/* Stars */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} style={{ color: 'var(--accent)', fontSize: 18 }}>★</span>
              ))}
            </div>

            <blockquote className="font-display" style={{
              fontSize: 26, fontWeight: 300, fontStyle: 'italic',
              color: 'rgba(248,245,240,0.92)', lineHeight: 1.5,
              margin: '0 0 36px', letterSpacing: '-0.01em',
            }}>
              "{t.quote}"
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img
                src={t.image}
                alt={t.name}
                style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
              />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'rgba(248,245,240,0.9)' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 2 }}>{t.detail}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BlogSection() {
  const posts = [
    {
      category: 'Market Analysis',
      title: 'The Ultra-Luxury Market: Why $10M+ Properties Are Selling Faster Than Ever',
      excerpt: 'New data reveals record-breaking velocity in the top tier of real estate, with days on market dropping 34% year-over-year.',
      author: 'Alexandra Whitmore',
      date: 'January 24, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&h=440&fit=crop&auto=format',
    },
    {
      category: 'Investment Guide',
      title: 'Five Emerging Luxury Markets to Watch in 2026',
      excerpt: 'From Austin to Palm Beach, these markets are attracting ultra-high-net-worth buyers with compelling value propositions.',
      author: 'Marcus Chen',
      date: 'January 19, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&h=440&fit=crop&auto=format',
    },
    {
      category: 'Design Trends',
      title: 'Biophilic Architecture: The New Standard in Luxury Residential Design',
      excerpt: 'Architects are increasingly incorporating living walls, natural materials, and seamless indoor-outdoor flows.',
      author: 'Sophia Delacroix',
      date: 'January 12, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1622015663319-e97e697503ee?w=700&h=440&fit=crop&auto=format',
    },
  ]

  return (
    <section style={{ background: 'var(--bg)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px' }}>
              Insights & Analysis
            </p>
            <h2 className="font-display" style={{ fontSize: 44, fontWeight: 500, color: 'var(--fg)', margin: 0, lineHeight: 1.1 }}>
              Latest from the journal
            </h2>
          </div>
          <button style={{
            padding: '10px 24px', borderRadius: 10, border: '1px solid var(--border-strong)',
            background: 'transparent', color: 'var(--fg-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>
            View all articles →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {posts.map(post => (
            <article
              key={post.title}
              className="hover-lift"
              style={{
                background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
              }}
            >
              <div style={{ height: 220, background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    background: 'var(--accent-light)', color: 'var(--accent)',
                  }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg)', margin: '0 0 10px', lineHeight: 1.3 }}>{post.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--fg-muted)', margin: '0 0 20px', lineHeight: 1.6 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                  <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>By <span style={{ color: 'var(--fg-secondary)', fontWeight: 600 }}>{post.author}</span></span>
                  <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section style={{ background: 'var(--bg-secondary)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{
          borderRadius: 28, overflow: 'hidden', position: 'relative',
          background: 'var(--fg)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: 280,
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=400&fit=crop&auto=format"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '64px 56px', position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 16px' }}>
              Market Intelligence
            </p>
            <h2 className="font-display" style={{ fontSize: 40, fontWeight: 500, color: '#F8F5F0', margin: '0 0 12px', lineHeight: 1.15 }}>
              Stay ahead of the market
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(248,245,240,0.5)', lineHeight: 1.65, margin: 0 }}>
              Weekly insights on luxury market trends, new listings, and exclusive investment opportunities — delivered directly to your inbox.
            </p>
          </div>
          <div style={{ padding: '64px 56px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {submitted ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <div className="font-display" style={{ fontSize: 22, color: '#F8F5F0', marginBottom: 8 }}>You're on the list.</div>
                <div style={{ fontSize: 13, color: 'rgba(248,245,240,0.5)' }}>Expect your first issue next Tuesday.</div>
              </div>
            ) : (
              <>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(248,245,240,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    padding: '14px 18px', borderRadius: 12, fontSize: 14,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.07)',
                    color: '#F8F5F0', marginBottom: 12,
                  }}
                />
                <button
                  onClick={() => email && setSubmitted(true)}
                  style={{
                    padding: '14px', borderRadius: 12, border: 'none',
                    background: 'var(--accent)', color: '#fff',
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    letterSpacing: '0.03em',
                  }}
                >
                  Subscribe to the Journal
                </button>
                <p style={{ fontSize: 11, color: 'rgba(248,245,240,0.3)', marginTop: 12, textAlign: 'center' }}>
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Inline SVG icons */
function VerifiedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function AgentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function SearchPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
