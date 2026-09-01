import { useState, useMemo, type ReactNode } from 'react'
import { properties } from '../data/Properties'
import type { PropertyType, PropertyStatus } from '../data/Properties'
import PropertyCard from '../components/PropertyCard'

interface ListingsPageProps {
  onSelectProperty: (id: string) => void
}

type ViewMode = 'grid' | 'list'
type SortMode = 'newest' | 'price-asc' | 'price-desc' | 'featured'

export default function ListingsPage({ onSelectProperty }: ListingsPageProps) {
  const [view, setView] = useState<ViewMode>('grid')
  const [sort, setSort] = useState<SortMode>('featured')
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<PropertyType | 'All'>('All')
  const [filterStatus, setFilterStatus] = useState<PropertyStatus | 'All'>('All')
  const [filterBeds, setFilterBeds] = useState<number | 0>(0)
  const [filterMinPrice, setFilterMinPrice] = useState(0)
  const [filterMaxPrice, setFilterMaxPrice] = useState(30000000)

  const filtered = useMemo(() => {
    let result = [...properties]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      )
    }

    if (filterType !== 'All') result = result.filter(p => p.type === filterType)
    if (filterStatus !== 'All') result = result.filter(p => p.status === filterStatus)
    if (filterBeds > 0) result = result.filter(p => p.beds >= filterBeds)
    result = result.filter(p => p.price >= filterMinPrice && p.price <= filterMaxPrice)

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'featured') result.sort((a, _b) => a.badge === 'Featured' ? -1 : 1)

    return result
  }, [search, filterType, filterStatus, filterBeds, filterMinPrice, filterMaxPrice, sort])

  const propertyTypes: Array<PropertyType | 'All'> = ['All', 'Villa', 'Penthouse', 'Luxury Home', 'Apartment', 'Commercial', 'Land']
  const statusOptions: Array<PropertyStatus | 'All'> = ['All', 'For Sale', 'For Rent']

  const formatPrice = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    return `$${(val / 1000).toFixed(0)}K`
  }

  return (
    <div style={{ paddingTop: 72, background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)', padding: '32px 0' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <nav style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 8 }}>
                <span>Home</span>
                <span style={{ margin: '0 8px', opacity: 0.4 }}>›</span>
                <span style={{ color: 'var(--accent)' }}>Properties</span>
              </nav>
              <h1 className="font-display" style={{ fontSize: 36, fontWeight: 500, color: 'var(--fg)', margin: 0, lineHeight: 1 }}>
                All Properties
              </h1>
            </div>
            {/* Search bar */}
            <div style={{ position: 'relative', minWidth: 280 }}>
              <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-muted)', pointerEvents: 'none' }}>
                <SearchIcon />
              </div>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search city, neighborhood, or address…"
                style={{
                  width: '100%', padding: '12px 16px 12px 40px', borderRadius: 12,
                  border: '1px solid var(--border-strong)',
                  background: 'var(--bg)', color: 'var(--fg)', fontSize: 14,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 40px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {/* Sidebar filters */}
        <aside style={{
          width: 260, flexShrink: 0, position: 'sticky', top: 90,
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
          borderRadius: 20, padding: '28px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', margin: 0 }}>Filters</h3>
            <button
              onClick={() => {
                setFilterType('All'); setFilterStatus('All')
                setFilterBeds(0); setFilterMinPrice(0); setFilterMaxPrice(30000000)
                setSearch('')
              }}
              style={{
                background: 'none', border: 'none', fontSize: 12,
                color: 'var(--accent)', cursor: 'pointer', fontWeight: 600,
              }}
            >
              Clear all
            </button>
          </div>

          {/* Property Type */}
          <FilterSection label="Property Type">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {propertyTypes.map(type => (
                <label
                  key={type}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                    background: filterType === type ? 'var(--accent-light)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    checked={filterType === type}
                    onChange={() => setFilterType(type)}
                    style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                  />
                  <span style={{
                    fontSize: 13, fontWeight: filterType === type ? 600 : 400,
                    color: filterType === type ? 'var(--accent)' : 'var(--fg-secondary)',
                  }}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Status */}
          <FilterSection label="Status">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {statusOptions.map(status => (
                <label
                  key={status}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                    background: filterStatus === status ? 'var(--accent-light)' : 'transparent',
                    transition: 'background 0.2s',
                  }}
                >
                  <input
                    type="radio"
                    checked={filterStatus === status}
                    onChange={() => setFilterStatus(status)}
                    style={{ accentColor: 'var(--accent)', cursor: 'pointer' }}
                  />
                  <span style={{
                    fontSize: 13, fontWeight: filterStatus === status ? 600 : 400,
                    color: filterStatus === status ? 'var(--accent)' : 'var(--fg-secondary)',
                  }}>
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection label="Price Range">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--fg-muted)' }}>
                <span>{formatPrice(filterMinPrice)}</span>
                <span>{formatPrice(filterMaxPrice)}</span>
              </div>
              <input
                type="range" min={0} max={30000000} step={500000}
                value={filterMaxPrice}
                onChange={e => setFilterMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                {[5000000, 10000000, 20000000, 30000000].map(price => (
                  <button
                    key={price}
                    onClick={() => setFilterMaxPrice(price)}
                    style={{
                      flex: 1, padding: '6px 0', borderRadius: 8, border: '1px solid var(--border)',
                      background: filterMaxPrice === price ? 'var(--accent)' : 'transparent',
                      color: filterMaxPrice === price ? '#fff' : 'var(--fg-muted)',
                      fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {price >= 1000000 ? `$${price / 1000000}M` : ''}
                  </button>
                ))}
              </div>
            </div>
          </FilterSection>

          {/* Bedrooms */}
          <FilterSection label="Bedrooms (min)">
            <div style={{ display: 'flex', gap: 8 }}>
              {[0, 2, 3, 4, 5, 6].map(n => (
                <button
                  key={n}
                  onClick={() => setFilterBeds(n)}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 10, border: '1px solid var(--border)',
                    background: filterBeds === n ? 'var(--fg)' : 'transparent',
                    color: filterBeds === n ? 'var(--bg)' : 'var(--fg-muted)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {n === 0 ? 'Any' : n + '+'}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Results count */}
          <div style={{
            marginTop: 8, padding: '14px', borderRadius: 12,
            background: 'var(--accent-light)', textAlign: 'center',
          }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>{filtered.length}</span>
            <span style={{ fontSize: 12, color: 'var(--fg-muted)', marginLeft: 6 }}>properties found</span>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 24, flexWrap: 'wrap', gap: 12,
          }}>
            <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0 }}>
              Showing <span style={{ fontWeight: 700, color: 'var(--fg)' }}>{filtered.length}</span> properties
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortMode)}
                style={{
                  padding: '9px 14px', borderRadius: 10, border: '1px solid var(--border)',
                  background: 'var(--bg-elevated)', color: 'var(--fg)', fontSize: 13, cursor: 'pointer',
                }}
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>

              {/* View toggle */}
              <div style={{
                display: 'flex', background: 'var(--bg-elevated)',
                border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden',
              }}>
                {(['grid', 'list'] as ViewMode[]).map(v => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      padding: '9px 14px', border: 'none', cursor: 'pointer', fontSize: 13,
                      background: view === v ? 'var(--fg)' : 'transparent',
                      color: view === v ? 'var(--bg)' : 'var(--fg-muted)',
                      transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    {v === 'grid' ? <GridIcon /> : <ListIcon />}
                    <span style={{ textTransform: 'capitalize' }}>{v}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Property grid / list */}
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '96px 40px',
              background: 'var(--bg-elevated)', borderRadius: 20, border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h3 className="font-display" style={{ fontSize: 28, color: 'var(--fg)', marginBottom: 8 }}>No properties found</h3>
              <p style={{ color: 'var(--fg-muted)', fontSize: 14, maxWidth: 360, margin: '0 auto' }}>
                Try adjusting your filters or search terms to discover more properties.
              </p>
            </div>
          ) : view === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {filtered.map(p => (
                <PropertyCard key={p.id} property={p} onClick={() => onSelectProperty(p.id)} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.map(p => (
                <PropertyCard key={p.id} property={p} onClick={() => onSelectProperty(p.id)} variant="horizontal" />
              ))}
            </div>
          )}

          {/* Load more */}
          {filtered.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <button style={{
                padding: '14px 40px', borderRadius: 12, border: '1px solid var(--border-strong)',
                background: 'transparent', color: 'var(--fg)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterSection({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 24 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '0 0 12px', marginBottom: open ? 12 : 0,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
          {label}
        </span>
        <span style={{ color: 'var(--fg-muted)', fontSize: 16, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          ›
        </span>
      </button>
      {open && children}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}
