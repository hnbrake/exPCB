import { PCB } from './pcbColors'

/** Populated PCB hero — green solder mask, ENIG-style copper, common SMT parts, silkscreen. */
export function HomeHeroIllustration() {
  return (
    <svg
      className="hero-illustration"
      viewBox="0 0 440 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="pcb-home-mask" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={PCB.maskLight} />
          <stop offset="1" stopColor={PCB.mask} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="440" height="320" rx="24" fill="var(--art-panel)" stroke="var(--border)" />
      <ellipse cx="220" cy="300" rx="190" ry="18" fill="#000" opacity="0.07" />

      <rect
        x="14"
        y="14"
        width="412"
        height="292"
        rx="10"
        fill="url(#pcb-home-mask)"
        stroke={PCB.fr4Edge}
        strokeWidth="2"
      />

      {[
        [38, 38],
        [402, 38],
        [402, 282],
        [38, 282],
      ].map(([cx, cy], i) => (
        <g key={`mh-${i}`}>
          <circle cx={cx} cy={cy} r="10" fill={PCB.maskDark} opacity="0.45" />
          <circle cx={cx} cy={cy} r="6" fill={PCB.mask} stroke={PCB.copperDim} strokeWidth="1" />
        </g>
      ))}

      <g stroke={PCB.copper} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 52 168 L 120 168 L 138 130 L 162 206 L 184 118 L 210 168" strokeWidth="2.2" />
        <path d="M 210 168 L 252 168 L 262 210 L 284 124 L 306 210 L 322 168 L 388 168" strokeWidth="2.2" />
        <path d="M 210 168 L 210 88 L 302 88 L 302 168" strokeWidth="1.6" opacity="0.85" />
        <path d="M 120 168 L 120 236 L 328 236 L 328 198" strokeWidth="1.6" opacity="0.8" />
        <path d="M 52 168 L 52 252 L 168 252" strokeWidth="1.4" opacity="0.75" />
      </g>

      {[
        [168, 212],
        [248, 138],
        [318, 224],
        [96, 188],
      ].map(([cx, cy], i) => (
        <g key={`v-${i}`}>
          <circle cx={cx} cy={cy} r="4.5" fill={PCB.copperDim} opacity="0.35" />
          <circle cx={cx} cy={cy} r="2.8" fill={PCB.copper} stroke={PCB.maskDark} strokeWidth="0.5" />
        </g>
      ))}

      {/* Large IC / BGA island */}
      <rect x="218" y="56" width="104" height="104" rx="5" fill={PCB.bodyIc} stroke="#0d0d0f" strokeWidth="1" />
      <rect x="222" y="60" width="96" height="96" rx="3" fill={PCB.bodyIcTop} />
      {[0, 1, 2, 3, 4, 5, 6].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <circle
            key={`b-${row}-${col}`}
            cx={230 + col * 12}
            cy={68 + row * 12}
            r="2.8"
            fill={PCB.copper}
            opacity="0.92"
          />
        )),
      )}

      {/* SO-8 NOR flash */}
      <rect x="52" y="100" width="76" height="26" rx="2" fill={PCB.bodyIc} stroke="#111" strokeWidth="0.75" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={`sf-${i}`} x={58 + i * 18} y="96" width="3" height="5" fill={PCB.copper} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`sr-${i}`} x={58 + i * 18} y="125" width="3" height="5" fill={PCB.copper} />
      ))}

      {/* 0402 resistor */}
      <g transform="translate(158, 188)">
        <rect x="-9" y="-2" width="7" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="10" y="-2" width="7" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="-2" y="-1.5" width="12" height="4" rx="0.5" fill={PCB.passiveBlack} />
      </g>

      {/* MLCC */}
      <g transform="translate(324, 188)">
        <rect x="-11" y="-2" width="8" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="11" y="-2" width="8" height="5" rx="0.5" fill={PCB.pad} />
        <rect x="-3" y="-2" width="14" height="5" rx="1" fill={PCB.capCeramic} />
      </g>

      {/* SOT-23 */}
      <rect x="78" y="226" width="22" height="14" rx="1.5" fill={PCB.bodyIc} stroke="#111" strokeWidth="0.5" />
      <rect x="82" y="242" width="2.5" height="6" fill={PCB.copper} />
      <rect x="90" y="242" width="2.5" height="6" fill={PCB.copper} />
      <rect x="98" y="242" width="2.5" height="6" fill={PCB.copper} />

      {/* 1×6 pin header (black plastic + gold posts) */}
      <g transform="translate(352, 92)">
        <rect x="-1" y="-3" width="12" height="94" rx="2" fill="#1e1e22" stroke={PCB.silkFaint} strokeWidth="0.75" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx="5" cy={8 + i * 14} r="3.2" fill={PCB.copper} stroke={PCB.copperDim} strokeWidth="0.5" />
        ))}
      </g>

      <text x="220" y="278" textAnchor="middle" fill={PCB.silk} fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
        real board stuff — mask · copper · parts · silk
      </text>
      <text x="220" y="296" textAnchor="middle" fill={PCB.silkFaint} fontSize="9" fontFamily="var(--font-mono)">
        BGA / QFN-style island · SO-8 · 0402 · MLCC · vias · 1×6 header
      </text>
    </svg>
  )
}
