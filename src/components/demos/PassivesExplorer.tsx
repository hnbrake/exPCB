import { useId, useMemo, useState } from 'react'

export function PassivesExplorer() {
  const gid = useId()
  const [freqNorm, setFreqNorm] = useState(0.35)

  const { magDb, phaseDeg } = useMemo(() => {
    const f = 0.02 + freqNorm * 3
    const rc = 1
    const w = 2 * Math.PI * f * rc
    const mag = 1 / Math.sqrt(1 + w * w)
    const phase = (-Math.atan(w) * 180) / Math.PI
    const magDb = 20 * Math.log10(mag)
    return { magDb, phaseDeg: phase }
  }, [freqNorm])

  return (
    <div className="demo-panel">
      <p className="demo-panel__hint">
        Toy first-order <strong>resistor–capacitor (RC)</strong> low-pass: sweep normalized frequency to see magnitude
        roll-off (here in <strong>decibels (dB)</strong>) and phase lag. Real filters add extra poles/zeros,{' '}
        <strong>equivalent series inductance (ESL)</strong> in capacitors, and layout parasitics — this is shape
        intuition only.
      </p>

      <div className="slider-row">
        <label htmlFor={`${gid}-f`}>Freq ×</label>
        <input
          id={`${gid}-f`}
          type="range"
          min={0}
          max={100}
          value={Math.round(freqNorm * 100)}
          onChange={(e) => setFreqNorm(Number(e.target.value) / 100)}
        />
        <span className="kbd" style={{ minWidth: '4.5rem', textAlign: 'right' }}>
          {magDb.toFixed(1)} dB
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'stretch' }}>
        <svg viewBox="0 0 200 120" width={200} height={120} aria-hidden>
          <text x="100" y="16" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
            R — C lowpass
          </text>
          <path
            d="M 30 60 L 70 60 L 85 45 L 100 75 L 115 45 L 130 75 L 145 60 L 170 60"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="170" y1="60" x2="170" y2="90" stroke="var(--accent)" strokeWidth="2" />
          <line x1="155" y1="90" x2="185" y2="90" stroke="var(--accent)" strokeWidth="2" />
          <text x="30" y="52" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
            in
          </text>
          <text x="175" y="52" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
            out
          </text>
        </svg>

        <svg viewBox="0 0 120 120" width={120} height={120} aria-hidden>
          <text x="60" y="16" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
            L (energy storage)
          </text>
          <path
            d="M 30 70 C 45 50, 55 90, 70 70 C 85 50, 95 90, 110 70"
            fill="none"
            stroke="var(--text-faint)"
            strokeWidth="2.5"
          />
          <line x1="30" y1="70" x2="20" y2="70" stroke="var(--text-muted)" />
          <line x1="110" y1="70" x2="120" y2="70" stroke="var(--text-muted)" />
        </svg>

        <div style={{ flex: '1 1 12rem', alignSelf: 'center' }}>
          <div style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)', marginBottom: 6 }}>
            Phase lag (conceptual):{' '}
            <strong style={{ color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
              {phaseDeg.toFixed(0)}°
            </strong>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 999,
              background: 'var(--chart-bg)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${Math.min(100, Math.max(0, 50 - magDb * 4))}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--chart-series), var(--text-muted))',
                transition: 'width 0.08s linear',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
