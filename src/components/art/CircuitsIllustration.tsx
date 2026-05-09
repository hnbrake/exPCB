import { PCB } from './pcbColors'

export function CircuitsIllustration() {
  return (
    <svg
      className="hero-illustration hero-illustration--compact"
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="circ-pcb-mask" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={PCB.maskLight} />
          <stop offset="1" stopColor={PCB.mask} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" rx="20" fill="var(--art-panel)" stroke="var(--border)" />
      <rect x="12" y="12" width="376" height="236" rx="8" fill="url(#circ-pcb-mask)" stroke={PCB.fr4Edge} strokeWidth="1.5" />

      <g stroke={PCB.copper} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M 48 132 L 112 132 L 128 100 L 148 164 L 168 108 L 188 132 L 248 132"
          strokeWidth="2.2"
        />
        <path d="M 248 132 L 248 176 L 352 176" strokeWidth="1.8" />
        <path d="M 188 132 L 188 72 L 288 72 L 288 132" strokeWidth="1.6" opacity="0.85" />
      </g>

      {/* R — 0402 */}
      <g transform="translate(96, 156)">
        <rect x="-8" y="-2" width="6" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="10" y="-2" width="6" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="-2" y="-1.5" width="12" height="4" rx="0.5" fill={PCB.passiveBlack} />
      </g>
      <text x="96" y="182" textAnchor="middle" fill={PCB.silk} fontSize="8" fontFamily="var(--font-mono)">
        R
      </text>

      {/* C — MLCC */}
      <g transform="translate(168, 156)">
        <rect x="-10" y="-2" width="7" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="11" y="-2" width="7" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="-3" y="-2" width="14" height="5" rx="1" fill={PCB.capMlcc} />
      </g>
      <text x="168" y="182" textAnchor="middle" fill={PCB.silk} fontSize="8" fontFamily="var(--font-mono)">
        C
      </text>

      {/* L — molded inductor */}
      <rect x="228" y="148" width="36" height="22" rx="3" fill="#3d3a36" stroke={PCB.copper} strokeWidth="1" />
      <path d="M 234 159 H 258" stroke={PCB.silkFaint} strokeWidth="1" />
      <text x="246" y="182" textAnchor="middle" fill={PCB.silk} fontSize="8" fontFamily="var(--font-mono)">
        L
      </text>

      {/* SO-8 CMOS gate */}
      <rect x="288" y="96" width="72" height="28" rx="2" fill={PCB.bodyIc} stroke="#111" strokeWidth="0.75" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={`u-${i}`} x={294 + i * 16} y="92" width="2.5" height="5" fill={PCB.copper} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`d-${i}`} x={294 + i * 16} y="123" width="2.5" height="5" fill={PCB.copper} />
      ))}
      <text x="324" y="114" textAnchor="middle" fill={PCB.silkFaint} fontSize="7" fontFamily="var(--font-mono)">
        SO-8
      </text>

      <text x="200" y="228" textAnchor="middle" fill={PCB.silk} fontSize="10" fontFamily="var(--font-mono)">
        passives + small-outline IC on real copper
      </text>
      <text x="200" y="244" textAnchor="middle" fill={PCB.silkFaint} fontSize="8" fontFamily="var(--font-mono)">
        R · L · C · SO-8 (stylized PCB)
      </text>
    </svg>
  )
}
