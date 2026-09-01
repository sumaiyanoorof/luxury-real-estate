import { useState } from 'react'
import { properties } from '../data/Properties'
import type { Page } from '../App'
import PropertyCard from '../components/PropertyCard'
import { HeartIcon } from '../components/PropertyCard'

interface PropertyDetailPageProps {
  propertyId: string
  onNavigate: (page: Page) => void
  onSelectProperty: (id: string) => void
}

export default function PropertyDetailPage({ propertyId, onNavigate, onSelectProperty }: PropertyDetailPageProps) {
  const property = properties.find(p => p.id === propertyId) || properties[0]
  const [activeImage, setActiveImage] = useState(0)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'floorplan' | 'location'>('overview')
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('')
  const [visitName, setVisitName] = useState('')
  const [visitEmail, setVisitEmail] = useState('')
  const [scheduleSent, setScheduleSent] = useState(false)
  const [loanAmount, setLoanAmount] = useState(Math.round(property.price * 0.8))
  const [interestRate, setInterestRate] = useState(7.25)
  const [loanTerm, setLoanTerm] = useState(30)

  const similar = properties.filter(p => p.id !== property.id && (p.type === property.type || p.city === property.city)).slice(0, 3)

  const monthlyPayment = (() => {
    const r = interestRate / 100 / 12
    const n = loanTerm * 12
    if (r === 0) return loanAmount / n
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  })()

  return (
    <div style={{ paddingTop: 72, background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 40px 0' }}>
        <nav style={{ fontSize: 12, color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontSize: 12, padding: 0 }}>Home</button>
          <span style={{ opacity: 0.4 }}>›</span>
          <button onClick={() => onNavigate('listings')} style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontSize: 12, padding: 0 }}>Properties</button>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: 'var(--accent)' }}>{property.name}</span>
        </nav>
      </div>

      {/* Image Gallery */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gridTemplateRows: '360px 180px', gap: 12 }}>
          {/* Main image */}
          <div style={{ gridRow: '1 / 3', borderRadius: 20, overflow: 'hidden', background: 'var(--bg-secondary)', position: 'relative' }}>
            <img
              src={property.images[activeImage]}
              alt={property.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
            />
            <div style={{
              position: 'absolute', bottom: 20, left: 20, right: 20,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            }}>
              {/* Image counter */}
              <span style={{
                padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: 'rgba(12,10,8,0.7)', color: '#fff',
                backdropFilter: 'blur(8px)',
              }}>
                {activeImage + 1} / {property.images.length}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  padding: '8px 18px', borderRadius: 10, border: 'none', fontSize: 13, fontWeight: 600,
                  background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                  color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>▶</span> Virtual Tour
                </button>
                <button style={{
                  padding: '8px 18px', borderRadius: 10, border: 'none', fontSize: 13, fontWeight: 600,
                  background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                  color: '#fff', cursor: 'pointer',
                }}>
                  All Photos
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail grid */}
          {property.images.slice(1, 5).map((img, i) => (
            <div
              key={img}
              onClick={() => setActiveImage(i + 1)}
              style={{
                borderRadius: 16, overflow: 'hidden', cursor: 'pointer', background: 'var(--bg-secondary)',
                border: activeImage === i + 1 ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'border-color 0.2s',
              }}
            >
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'flex-start' }}>
          {/* Left: Property details */}
          <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                {property.badge && (
                  <span style={{
                    display: 'inline-block', padding: '4px 12px', borderRadius: 8, marginBottom: 10,
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: 'var(--accent-light)', color: 'var(--accent)',
                  }}>
                    {property.badge}
                  </span>
                )}
                <h1 className="font-display" style={{ fontSize: 48, fontWeight: 500, color: 'var(--fg)', margin: '0 0 6px', lineHeight: 1.05 }}>
                  {property.name}
                </h1>
                <p style={{ fontSize: 15, color: 'var(--fg-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                  📍 {property.address}, {property.city}, {property.state}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="font-display" style={{ fontSize: 40, fontWeight: 600, color: 'var(--fg)', lineHeight: 1 }}>
                  {property.priceLabel}
                </div>
                <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 4 }}>{property.status}</div>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{
              display: 'flex', gap: 0, marginBottom: 32,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
            }}>
              {[
                { label: 'Bedrooms', value: property.beds },
                { label: 'Bathrooms', value: property.baths },
                { label: 'Sq Ft', value: property.sqft.toLocaleString() },
                { label: 'Garage', value: `${property.garage} cars` },
                { label: 'Built', value: property.yearBuilt },
                { label: 'Floors', value: property.floors },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  flex: 1, padding: '18px 12px', textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--fg)' }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, letterSpacing: '0.04em' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
              <button
                onClick={() => setSaved(s => !s)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12,
                  border: '1px solid var(--border-strong)', background: saved ? 'rgba(220,38,38,0.1)' : 'transparent',
                  color: saved ? '#DC2626' : 'var(--fg)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                <HeartIcon filled={saved} />
                {saved ? 'Saved' : 'Save Property'}
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12,
                border: '1px solid var(--border-strong)', background: 'transparent',
                color: 'var(--fg)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
                <ShareIcon /> Share
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12,
                border: '1px solid var(--border-strong)', background: 'transparent',
                color: 'var(--fg)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>
                <PrintIcon /> Print
              </button>
            </div>

            {/* Tab navigation */}
            <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderBottom: '1px solid var(--border)' }}>
              {[
                { key: 'overview', label: 'Overview' },
                { key: 'amenities', label: 'Amenities' },
                { key: 'floorplan', label: 'Floor Plan' },
                { key: 'location', label: 'Location' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  style={{
                    padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 14, fontWeight: 600,
                    color: activeTab === tab.key ? 'var(--accent)' : 'var(--fg-muted)',
                    borderBottom: `2px solid ${activeTab === tab.key ? 'var(--accent)' : 'transparent'}`,
                    marginBottom: -1, transition: 'all 0.2s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'overview' && (
              <div>
                <p style={{ fontSize: 15, color: 'var(--fg-secondary)', lineHeight: 1.75, margin: '0 0 28px' }}>
                  {property.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  {[
                    { label: 'Property Type', value: property.type },
                    { label: 'Status', value: property.status },
                    { label: 'Price per Sq Ft', value: `$${Math.round(property.price / property.sqft).toLocaleString()}` },
                    { label: 'Lot Size', value: `${property.lotSize.toLocaleString()} sq ft` },
                    { label: 'Year Built', value: property.yearBuilt },
                    { label: 'Garage', value: `${property.garage} cars` },
                  ].map(item => (
                    <div key={item.label} style={{
                      padding: '16px', borderRadius: 12,
                      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                    }}>
                      <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: '0 0 24px', lineHeight: 1.6 }}>
                  This property features {property.amenities.length} premium amenities — everything you need for an extraordinary lifestyle.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {property.amenities.map(amenity => (
                    <div key={amenity} style={{
                      padding: '14px 16px', borderRadius: 12,
                      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <span style={{ color: 'var(--accent)', fontSize: 16 }}>✓</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-secondary)' }}>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'floorplan' && (
              <div>
                <div style={{
                  borderRadius: 20, border: '2px dashed var(--border-strong)',
                  padding: '80px 40px', textAlign: 'center',
                  background: 'var(--bg-elevated)',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📐</div>
                  <h3 className="font-display" style={{ fontSize: 24, color: 'var(--fg)', marginBottom: 8 }}>Floor Plans Available</h3>
                  <p style={{ fontSize: 14, color: 'var(--fg-muted)', maxWidth: 320, margin: '0 auto 20px' }}>
                    Detailed floor plans for all {property.floors} floor{property.floors > 1 ? 's' : ''} are available upon request from your agent.
                  </p>
                  <button style={{
                    padding: '12px 24px', borderRadius: 12, border: 'none',
                    background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  }}>
                    Request Floor Plans
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div>
                <div style={{
                  borderRadius: 20, border: '1px solid var(--border)',
                  height: 360, background: 'var(--bg-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative',
                }}>
                  <img
                    src={property.images[0]}
                    alt="Location"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                  />
                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div style={{ fontSize: 40, marginBottom: 8 }}>📍</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)' }}>{property.address}</div>
                    <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 4 }}>{property.city}, {property.state}</div>
                    <button style={{
                      marginTop: 16, padding: '10px 24px', borderRadius: 10, border: 'none',
                      background: 'var(--fg)', color: 'var(--bg)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>
                      Open in Maps
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mortgage Calculator */}
            <div style={{
              marginTop: 48, padding: '32px', borderRadius: 24,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            }}>
              <h3 className="font-display" style={{ fontSize: 26, fontWeight: 500, color: 'var(--fg)', margin: '0 0 24px' }}>
                Mortgage Calculator
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Loan Amount
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-muted)', fontSize: 14 }}>$</span>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={e => setLoanAmount(Number(e.target.value))}
                      style={{
                        width: '100%', padding: '12px 12px 12px 26px', borderRadius: 10,
                        border: '1px solid var(--border-strong)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 14,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Interest Rate (%)
                  </label>
                  <input
                    type="number" step={0.05}
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 10,
                      border: '1px solid var(--border-strong)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 14,
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Loan Term (years)
                  </label>
                  <select
                    value={loanTerm}
                    onChange={e => setLoanTerm(Number(e.target.value))}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 10,
                      border: '1px solid var(--border-strong)', background: 'var(--bg)', color: 'var(--fg)', fontSize: 14,
                    }}
                  >
                    <option value={10}>10 years</option>
                    <option value={15}>15 years</option>
                    <option value={20}>20 years</option>
                    <option value={30}>30 years</option>
                  </select>
                </div>
              </div>
              <div style={{
                padding: '24px', borderRadius: 16,
                background: 'var(--fg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 12, color: 'rgba(248,245,240,0.5)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Estimated Monthly Payment
                  </div>
                  <div className="font-display" style={{ fontSize: 40, fontWeight: 500, color: '#F8F5F0', lineHeight: 1 }}>
                    ${Math.round(monthlyPayment).toLocaleString()}
                    <span style={{ fontSize: 16, color: 'rgba(248,245,240,0.4)', fontFamily: 'inherit', fontWeight: 400 }}>/mo</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'rgba(248,245,240,0.4)', marginBottom: 4 }}>20% Down Payment</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(248,245,240,0.7)' }}>
                    ${Math.round(property.price * 0.2).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky contact sidebar */}
          <div style={{ position: 'sticky', top: 90, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Agent card */}
            <div style={{
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              borderRadius: 24, overflow: 'hidden',
            }}>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <img
                    src={property.agent.image}
                    alt={property.agent.name}
                    style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }}
                  />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)' }}>{property.agent.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 2 }}>
                      {property.agent.role}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 4 }}>
                      ★ {property.agent.rating} · {property.agent.listings} listings · {property.agent.experience} yrs
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={`tel:${property.agent.phone}`} style={{ flex: 1 }}>
                    <button style={{
                      width: '100%', padding: '11px', borderRadius: 12,
                      border: 'none', background: 'var(--fg)', color: 'var(--bg)',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>
                      📞 Call
                    </button>
                  </a>
                  <a href={`mailto:${property.agent.email}`} style={{ flex: 1 }}>
                    <button style={{
                      width: '100%', padding: '11px', borderRadius: 12,
                      border: '1px solid var(--border-strong)', background: 'transparent', color: 'var(--fg)',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>
                      ✉ Email
                    </button>
                  </a>
                </div>
              </div>

              {/* Schedule visit form */}
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', margin: '0 0 16px' }}>
                  {scheduleSent ? '✓ Visit Requested!' : 'Schedule a Visit'}
                </h4>
                {scheduleSent ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
                      {property.agent.name} will confirm your viewing within 2 hours.
                    </p>
                    <button
                      onClick={() => setScheduleSent(false)}
                      style={{
                        marginTop: 12, padding: '8px 20px', borderRadius: 10,
                        border: '1px solid var(--border)', background: 'transparent',
                        color: 'var(--fg-muted)', fontSize: 13, cursor: 'pointer',
                      }}
                    >
                      Request another time
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { label: 'Full Name', value: visitName, set: setVisitName, type: 'text', placeholder: 'Your name' },
                      { label: 'Email', value: visitEmail, set: setVisitEmail, type: 'email', placeholder: 'your@email.com' },
                    ].map(field => (
                      <div key={field.label}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={e => field.set(e.target.value)}
                          style={{
                            width: '100%', padding: '10px 12px', borderRadius: 10, fontSize: 13,
                            border: '1px solid var(--border-strong)', background: 'var(--bg)', color: 'var(--fg)',
                          }}
                        />
                      </div>
                    ))}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                          Date
                        </label>
                        <input
                          type="date" value={visitDate}
                          onChange={e => setVisitDate(e.target.value)}
                          style={{
                            width: '100%', padding: '10px 12px', borderRadius: 10, fontSize: 13,
                            border: '1px solid var(--border-strong)', background: 'var(--bg)', color: 'var(--fg)',
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                          Time
                        </label>
                        <select
                          value={visitTime}
                          onChange={e => setVisitTime(e.target.value)}
                          style={{
                            width: '100%', padding: '10px 12px', borderRadius: 10, fontSize: 13,
                            border: '1px solid var(--border-strong)', background: 'var(--bg)', color: 'var(--fg)',
                          }}
                        >
                          <option value="">Select</option>
                          {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => visitName && visitEmail && setScheduleSent(true)}
                      style={{
                        padding: '13px', borderRadius: 12, border: 'none',
                        background: 'var(--accent)', color: '#fff',
                        fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 4,
                      }}
                    >
                      Schedule Viewing
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Price insight card */}
            <div style={{
              background: 'var(--accent-light)', border: '1px solid rgba(184,150,90,0.2)',
              borderRadius: 20, padding: '20px',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                Market Insight
              </div>
              <div style={{ fontSize: 14, color: 'var(--fg-secondary)', lineHeight: 1.6 }}>
                Properties in <strong>{property.city}</strong> have appreciated <strong style={{ color: 'var(--accent)' }}>12.4%</strong> over the past 12 months. This listing is priced competitively within its tier.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section style={{ background: 'var(--bg-secondary)', padding: '64px 0 80px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
            <h2 className="font-display" style={{ fontSize: 36, fontWeight: 500, color: 'var(--fg)', margin: '0 0 32px' }}>
              Similar Properties
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {similar.map(p => (
                <PropertyCard key={p.id} property={p} onClick={() => onSelectProperty(p.id)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function PrintIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  )
}
