import { useEffect, useMemo } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { PcbFooterIllustration } from './art/PcbFooterIllustration'
import { LearningTrail } from './LearningTrail'
import { ScrollProgressBar } from './ScrollProgressBar'

function routeTheme(pathname: string): string {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/fpga')) return 'fpga'
  if (pathname.startsWith('/memory')) return 'memory'
  if (pathname.startsWith('/circuits')) return 'circuits'
  if (pathname.startsWith('/light/power')) return 'power'
  if (pathname.startsWith('/light/protocols')) return 'protocols'
  return 'home'
}

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/fpga', label: 'FPGA' },
  { to: '/memory', label: 'Memory' },
  { to: '/circuits', label: 'Circuits' },
  { to: '/light/power', label: 'Power' },
  { to: '/light/protocols', label: 'Protocols' },
]

export function Layout() {
  const { pathname } = useLocation()
  const theme = useMemo(() => routeTheme(pathname), [pathname])

  useEffect(() => {
    document.documentElement.dataset.expcbTheme = theme
  }, [theme])

  return (
    <div className="layout">
      <ScrollProgressBar />
      <header className="layout__header">
        <NavLink to="/" className="layout__brand">
          <span className="layout__brand-mark" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 10h4v12H8V10zm6 0h4v8h-4v-8zm6 0h4v12h-4V10z"
                fill="currentColor"
                style={{ color: 'var(--text)' }}
              />
            </svg>
          </span>
          exPCB
        </NavLink>
        <nav className="layout__nav" aria-label="Main">
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-pill${isActive ? ' nav-pill--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
        <LearningTrail />
      </main>
      <footer className="layout__footer">
        <div className="layout__footer-inner">
          <div className="layout__footer-art" aria-hidden>
            <PcbFooterIllustration />
          </div>
          <p className="layout__footer-copy">
            Conceptual demos — not SPICE-accurate. Good for the bus.
            <span className="emoji-after" aria-hidden>
              🚌
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
