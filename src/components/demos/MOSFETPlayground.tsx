import { useId, useMemo, useState } from 'react'

/** Normalized 0–1 toy model — not SPICE */
function toyId(vgs: number, vds: number): number {
  const vth = 0.22
  const beta = 2.2
  if (vgs <= vth) return 0
  const vov = vgs - vth
  const sat = vov
  const vdsEff = Math.min(vds, sat)
  const linear = beta * (vov * vdsEff - 0.5 * vdsEff * vdsEff)
  const idsSat = 0.5 * beta * vov * vov
  return vds < sat ? Math.max(0, linear) : idsSat
}

type Props = { className?: string }

export function MOSFETPlayground({ className }: Props) {
  const gid = useId()
  const [vgs, setVgs] = useState(0.45)
  const [vds, setVds] = useState(0.55)
  const vth = 0.22

  const idPoint = toyId(vgs, vds)
  const curve = useMemo(() => {
    const pts: string[] = []
    const steps = 48
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 1
      const y = toyId(vgs, x)
      const px = 40 + x * 220
      const py = 200 - Math.min(y, 0.35) * 520
      pts.push(`${px},${py}`)
    }
    return pts.join(' ')
  }, [vgs])

  const px = 40 + vds * 220
  const py = 200 - Math.min(idPoint, 0.35) * 520
  const channelW = 8 + vgs * 52

  return (
    <div className={`demo-panel ${className ?? ''}`}>
      <p className="demo-panel__hint">
        Drag sliders: <strong style={{ color: 'var(--text)' }}>gate-to-source voltage (V<sub>GS</sub>)</strong> controls
        inversion; <strong style={{ color: 'var(--text)' }}>drain-to-source voltage (V<sub>DS</sub>)</strong> sweeps the
        operating point along a toy <strong>drain current (I<sub>d</sub>)</strong> curve — not a{' '}
        <strong>Simulation Program with Integrated Circuit Emphasis (SPICE)</strong> deck.
      </p>
      <div className="slider-row">
        <label htmlFor={`${gid}-vgs`}>V<sub>GS</sub></label>
        <input
          id={`${gid}-vgs`}
          type="range"
          min={0}
          max={100}
          value={Math.round(vgs * 100)}
          onChange={(e) => setVgs(Number(e.target.value) / 100)}
          aria-valuetext={`${vgs.toFixed(2)} normalized`}
        />
        <span className="kbd" style={{ minWidth: '3.2rem', textAlign: 'right' }}>
          {vgs.toFixed(2)}
        </span>
      </div>
      <div className="slider-row">
        <label htmlFor={`${gid}-vds`}>V<sub>DS</sub></label>
        <input
          id={`${gid}-vds`}
          type="range"
          min={0}
          max={100}
          value={Math.round(vds * 100)}
          onChange={(e) => setVds(Number(e.target.value) / 100)}
        />
        <span className="kbd" style={{ minWidth: '3.2rem', textAlign: 'right' }}>
          {vds.toFixed(2)}
        </span>
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr' }}>
        <svg
          viewBox="0 0 300 220"
          width="100%"
          style={{ maxHeight: 220, borderRadius: 12, background: 'var(--chart-bg)' }}
          role="img"
          aria-label="Drain current versus drain voltage"
        >
          <defs>
            <linearGradient id={`${gid}-g`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--chart-series)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <line x1="40" y1="200" x2="260" y2="200" stroke="var(--text-faint)" strokeWidth="1" />
          <line x1="40" y1="200" x2="40" y2="40" stroke="var(--text-faint)" strokeWidth="1" />
          <text x="250" y="215" fill="var(--text-muted)" fontSize="11" fontFamily="var(--font-mono)">
            V_DS
          </text>
          <text x="12" y="52" fill="var(--text-muted)" fontSize="11" fontFamily="var(--font-mono)">
            I_d
          </text>
          <polyline
            fill="none"
            stroke={`url(#${gid}-g)`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={curve}
          />
          <circle cx={px} cy={py} r="6" fill="var(--chart-dot)" />
        </svg>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg viewBox="0 0 140 100" width={160} height={114} aria-hidden>
            <rect
              x="20"
              y="25"
              width="100"
              height="50"
              rx="6"
              fill="var(--bg-elevated)"
              stroke="var(--border-strong)"
            />
            <rect
              x={74 - channelW / 2}
              y="38"
              width={channelW}
              height="24"
              rx="3"
              fill={vgs > vth ? 'rgba(29, 29, 31, 0.12)' : 'var(--surface)'}
              stroke="var(--accent)"
              style={{ transition: 'all 0.12s ease-out' }}
            />
            <text x="70" y="18" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
              n-channel (symbolic)
            </text>
            <text x="70" y="92" textAnchor="middle" fill="var(--text-faint)" fontSize="9">
              wider gap ≈ stronger inversion (toy)
            </text>
          </svg>
          <p
            style={{
              margin: 0,
              flex: '1 1 12rem',
              color: 'var(--text-muted)',
              fontSize: 'var(--step--1)',
            }}
          >
            Above threshold (~{vth.toFixed(2)} in this toy scale), increasing V<sub>GS</sub>{' '}
            deepens the channel: more current for the same V<sub>DS</sub>. Pinch-off and
            saturation behavior are heavily simplified here.
          </p>
        </div>
      </div>
    </div>
  )
}
