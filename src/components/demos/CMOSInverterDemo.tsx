import { useState } from 'react'

export function CMOSInverterDemo() {
  const [vinHigh, setVinHigh] = useState(false)
  const voutHigh = !vinHigh

  return (
    <div className="demo-panel">
      <p className="demo-panel__hint">
        Toggle the input. When the <strong>n-channel MOSFET</strong> is on, the <strong>p-channel MOSFET</strong> is
        off (and vice versa) — no <strong>shoot-through</strong> (supply-to-ground crowbar) current in steady state,
        which is why <strong>complementary MOS (CMOS)</strong> dominates digital integrated circuits.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--step--1)' }}>V<sub>in</sub></span>
        <div className="pill-toggle" role="group" aria-label="Input voltage">
          <button type="button" aria-pressed={!vinHigh} onClick={() => setVinHigh(false)}>
            Low (0)
          </button>
          <button type="button" aria-pressed={vinHigh} onClick={() => setVinHigh(true)}>
            High (1)
          </button>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--step--1)' }}>
          V<sub>out</sub> ≈{' '}
          <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
            {voutHigh ? 'VDD' : 'GND'}
          </strong>
        </span>
      </div>

      <svg viewBox="0 0 320 200" width="100%" style={{ maxWidth: 420, borderRadius: 14, background: 'var(--chart-bg)' }}>
        <rect x="10" y="10" width="300" height="180" rx="12" fill="var(--bg-elevated)" stroke="var(--border)" />

        <text x="160" y="32" textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontWeight="600">
          CMOS inverter (symbolic)
        </text>

        <line x1="160" y1="40" x2="160" y2="170" stroke="var(--text-faint)" strokeWidth="1" />

        <text x="24" y="58" fill="#e5e5e5" fontSize="11" fontFamily="var(--font-mono)">
          VDD
        </text>
        <line x1="60" y1="54" x2="120" y2="54" stroke="#e5e5e5" strokeWidth="2" />
        <line x1="120" y1="54" x2="120" y2="78" stroke="#e5e5e5" strokeWidth="2" />

        <text x="24" y="178" fill="#737373" fontSize="11" fontFamily="var(--font-mono)">
          GND
        </text>
        <line x1="60" y1="174" x2="120" y2="174" stroke="#737373" strokeWidth="2" />
        <line x1="120" y1="150" x2="120" y2="174" stroke="#737373" strokeWidth="2" />

        <PMOS x={120} y={78} on={vinHigh === false} />
        <NMOS x={120} y={120} on={vinHigh === true} />

        <line x1="40" y1="120" x2="88" y2="120" stroke="var(--accent)" strokeWidth="2" />
        <text x="24" y="124" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
          in
        </text>

        <line
          x1="200"
          y1="100"
          x2="260"
          y2="100"
          stroke={voutHigh ? 'var(--chart-series)' : 'var(--text-muted)'}
          strokeWidth="3"
        />
        <text x="268" y="104" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
          out
        </text>

        <circle cx="160" cy="100" r="5" fill="var(--text)" />

        <text x="160" y="192" textAnchor="middle" fill="var(--text-faint)" fontSize="9">
          p off when in high · n off when in low (steady state)
        </text>
      </svg>
    </div>
  )
}

function PMOS({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={on ? 1 : 0.35}>
      <rect
        x="0"
        y="0"
        width="80"
        height="36"
        rx="6"
        fill="rgba(255, 255, 255, 0.08)"
        stroke="#d4d4d4"
      />
      <text x="40" y="22" textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="600">
        pMOS {on ? 'ON' : 'OFF'}
      </text>
    </g>
  )
}

function NMOS({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={on ? 1 : 0.35}>
      <rect
        x="0"
        y="0"
        width="80"
        height="36"
        rx="6"
        fill="rgba(255, 255, 255, 0.04)"
        stroke="#737373"
      />
      <text x="40" y="22" textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="600">
        nMOS {on ? 'ON' : 'OFF'}
      </text>
    </g>
  )
}
