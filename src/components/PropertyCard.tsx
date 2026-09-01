import { useState } from 'react'
import type { Property } from '../data/Properties'

interface PropertyCardProps {
  property: Property
  onClick: () => void
  variant?: 'default' | 'horizontal'
}

const badgeColors: Record<string, string> = {
  Featured: '#B8965A',
  Exclusive: '#1C1917',
  New: '#16A34A',
  'Price Reduced': '#DC2626',
}

export default function PropertyCard({ property, onClick, variant = 'default' }: PropertyCardProps) {
  const [saved, setSaved] = useState(false)
  const [imgError, setImgError] = useState(false)

  if (variant === 'horizontal') {
    return (
      <div
        onClick={onClick}
        className="hover-lift"
        style={{
          display: 'flex',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <div style={{ width: 240, flexShrink: 0, position: 'relative', background: 'var(--bg-secondary)' }}>
          {!imgError ? (
            <img
              src={property.image}
              alt={property.name}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HomeIcon />
            </div>
          )}
          {property.badge && (
            <div style={{ position: 'absolute', top: 12, left: 12 }}>
              <span style={{
                padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                background: badgeColors[property.badge] || 'var(--accent)', color: '#fff',
              }}>
                {property.badge}
              </span>
            </div>
          )}
        </div>
        <div style={{ flex: 1, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                {property.type} · {property.status}
              </span>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 500, color: 'var(--fg)', margin: '4px 0' }}>
                {property.name}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--fg-muted)', margin: 0 }}>
                {property.address}, {property.city}, {property.state}
              </p>
            </div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)', flexShrink: 0, marginLeft: 16 }}>
              {property.priceLabel}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
            {[
              { icon: <BedIcon />, value: property.beds, label: 'Beds' },
              { icon: <BathIcon />, value: property.baths, label: 'Baths' },
              { icon: <SquareIcon />, value: property.sqft.toLocaleString(), label: 'sq ft' },
              { icon: <GarageIcon />, value: property.garage, label: 'Garage' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-muted)', fontSize: 13 }}>
                <span style={{ color: 'var(--fg-secondary)' }}>{item.icon}</span>
                <span style={{ fontWeight: 600, color: 'var(--fg-secondary)' }}>{item.value}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
            <img
              src={property.agent.image}
              alt={property.agent.name}
              style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', background: 'var(--bg-secondary)' }}
            />
            <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Listed by <span style={{ color: 'var(--fg-secondary)', fontWeight: 600 }}>{property.agent.name}</span></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="hover-lift"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingBottom: '66%', background: 'var(--bg-secondary)' }}>
        {!imgError ? (
          <img
            src={property.image}
            alt={property.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s ease',
            }}
            className="card-image"
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HomeIcon />
          </div>
        )}
        {/* Badge */}
        {property.badge && (
          <div style={{ position: 'absolute', top: 14, left: 14 }}>
            <span style={{
              padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              background: badgeColors[property.badge] || 'var(--accent)', color: '#fff',
            }}>
              {property.badge}
            </span>
          </div>
        )}
        {/* Status pill */}
        <div style={{ position: 'absolute', top: 14, right: 48 }}>
          <span style={{
            padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
            background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          }}>
            {property.status}
          </span>
        </div>
        {/* Save button */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(s => !s) }}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 34, height: 34, borderRadius: 10,
            border: 'none', background: saved ? 'rgba(220,38,38,0.9)' : 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            color: saved ? '#fff' : 'rgba(255,255,255,0.9)',
          }}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div style={{ flex: 1, minWidth: 0, marginRight: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 4px' }}>
              {property.type}
            </p>
            <h3 className="font-display" style={{ fontSize: 18, fontWeight: 500, color: 'var(--fg)', margin: 0, lineHeight: 1.2 }}>
              {property.name}
            </h3>
          </div>
          <div className="font-display" style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg)', flexShrink: 0 }}>
            {property.priceLabel}
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--fg-muted)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 4 }}>
          <LocationPinIcon />
          {property.city}, {property.state}
        </p>

        <div style={{
          display: 'flex', gap: 0,
          borderTop: '1px solid var(--border)', paddingTop: 14,
        }}>
          {[
            { value: property.beds, label: 'Beds' },
            { value: property.baths, label: 'Baths' },
            { value: `${property.sqft.toLocaleString()}`, label: 'Sq Ft' },
          ].map((item, i) => (
            <div key={item.label} style={{
              flex: 1, textAlign: 'center',
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg-secondary)' }}>{item.value}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2, letterSpacing: '0.04em' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16M2 8h20v12M2 8a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4" />
    </svg>
  )
}

function BathIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6L9 3.5a2.5 2.5 0 0 1 5 0V6" />
      <rect x="2" y="6" width="20" height="10" rx="2" />
      <path d="M3 16v2M21 16v2M7 16v4M17 16v4" />
    </svg>
  )
}

function SquareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  )
}

function GarageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="9" rx="1" />
      <path d="M3 11L6 4h12l3 7" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border-strong)', opacity: 0.5 }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
