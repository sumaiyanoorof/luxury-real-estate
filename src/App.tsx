import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ListingsPage from './pages/ListingsPage'
import PropertyDetailPage from './pages/PropertyDetailPage'

export type Page = 'home' | 'listings' | 'detail' | 'about' | 'contact'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [dark, setDark] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('1')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id)
    setPage('detail')
  }

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
      />

      {page === 'home' && (
        <HomePage onNavigate={setPage} onSelectProperty={handleSelectProperty} />
      )}
      {page === 'listings' && (
        <ListingsPage onSelectProperty={handleSelectProperty} />
      )}
      {page === 'detail' && (
        <PropertyDetailPage
          propertyId={selectedPropertyId}
          onNavigate={setPage}
          onSelectProperty={handleSelectProperty}
        />
      )}
      {(page === 'about' || page === 'contact') && (
        <AboutContactPlaceholder page={page} onNavigate={setPage} />
      )}

      <Footer onNavigate={setPage} />
    </div>
  )
}

function AboutContactPlaceholder({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          {page === 'about' ? 'Our Story' : 'Get In Touch'}
        </div>
        <h1
          className="font-display text-6xl font-medium mb-6 leading-tight"
          style={{ color: 'var(--fg)' }}
        >
          {page === 'about' ? 'Redefining Luxury\nReal Estate' : "We'd love to\nhear from you"}
        </h1>
        <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: 'var(--fg-muted)', lineHeight: 1.7 }}>
          {page === 'about'
            ? 'LuxEstate was founded in 2008 with a singular mission: to deliver an extraordinary real estate experience to those who expect nothing less. Fifteen years and $4.2 billion in transactions later, that mission remains unchanged.'
            : 'Our concierge team is available around the clock to assist with your property journey. Whether you are buying, selling, or simply exploring possibilities, we are here.'}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('listings')}
            className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all"
            style={{ background: 'var(--fg)', color: 'var(--bg)' }}
          >
            Browse Properties
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide border transition-all"
            style={{ border: '1px solid var(--border-strong)', color: 'var(--fg)', background: 'transparent' }}
          >
            Back to Home
          </button>
        </div>

        {page === 'about' && (
          <div className="grid grid-cols-2 gap-6 mt-24" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {[
              { value: '15+', label: 'Years of Excellence' },
              { value: '$4.2B+', label: 'In Transactions' },
              { value: '12,847', label: 'Properties Sold' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map(stat => (
              <div
                key={stat.label}
                className="p-8 rounded-2xl"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
              >
                <div className="font-display text-4xl font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--fg-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {page === 'contact' && (
          <div
            className="mt-16 p-10 rounded-3xl text-left"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          >
            <div className="grid gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { label: 'Full Name', placeholder: 'Catherine Ashford', type: 'text' },
                { label: 'Email Address', placeholder: 'catherine@example.com', type: 'email' },
                { label: 'Phone Number', placeholder: '+1 (310) 555-0000', type: 'tel' },
                { label: 'Budget Range', placeholder: 'Select budget', type: 'text' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--fg-secondary)' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={{
                      background: 'var(--bg)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--fg)',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--fg-secondary)' }}>
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your property goals..."
                className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--fg)',
                }}
              />
            </div>
            <button
              className="mt-6 w-full py-4 rounded-xl text-sm font-semibold tracking-wide transition-all"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
