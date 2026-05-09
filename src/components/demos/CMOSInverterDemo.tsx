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

      <svg
        viewBox="0 0 400 248"
        width="100%"
        style={{ maxWidth: 480, borderRadius: 14, background: 'var(--chart-bg)' }}
      >
        <rect x="8" y="8" width="384" height="208" rx="12" fill="var(--bg-elevated)" stroke="var(--border)" />

        <text x="200" y="30" textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontWeight="600">
          CMOS inverter (symbolic)
        </text>

        {/* VDD rail */}
        <text x="22" y="52" fill="#e5e5e5" fontSize="11" fontFamily="var(--font-mono)">
          VDD
        </text>
        <path d="M 72 48 H 200 V 58" fill="none" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />

        {/* Output node (between drains) — cy sits in the gap between p and n */}
        <path
          d="M 200 94 V 109 V 124"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="200" cy="109" r="5" fill="var(--text)" />

        {/* GND rail */}
        <path d="M 200 160 V 186 H 72" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" />
        <text x="22" y="190" fill="#737373" fontSize="11" fontFamily="var(--font-mono)">
          GND
        </text>

        <PMOS x={168} y={58} on={vinHigh === false} />
        <NMOS x={168} y={124} on={vinHigh === true} />

        {/* Input: horizontal stub + vertical gate bus (clears transistor bodies) */}
        <path
          d="M 28 109 H 118 V 76 H 168 M 118 109 V 142 H 168"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="22" y="106" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
          in
        </text>

        {/* Output */}
        <line
          x1="232"
          y1="109"
          x2="348"
          y2="109"
          stroke={voutHigh ? 'var(--chart-series)' : 'var(--text-muted)'}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="356" y="113" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
          out
        </text>

        <text x="200" y="236" textAnchor="middle" fill="var(--text-faint)" fontSize="9">
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
        width="64"
        height="36"
        rx="6"
        fill="rgba(255, 255, 255, 0.08)"
        stroke="#d4d4d4"
      />
      <text x="32" y="15" textAnchor="middle" fill="var(--text)" fontSize="9" fontWeight="700">
        pMOS
      </text>
      <text x="32" y="28" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontWeight="600">
        {on ? 'ON' : 'OFF'}
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
        width="64"
        height="36"
        rx="6"
        fill="rgba(255, 255, 255, 0.04)"
        stroke="#737373"
      />
      <text x="32" y="15" textAnchor="middle" fill="var(--text)" fontSize="9" fontWeight="700">
        nMOS
      </text>
      <text x="32" y="28" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontWeight="600">
        {on ? 'ON' : 'OFF'}
      </text>
    </g>
  )
}
