import { PCB } from './pcbColors'

export function MemoryIllustration() {
  return (
    <svg
      className="hero-illustration hero-illustration--compact"
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="mem-pcb-mask" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={PCB.maskLight} />
          <stop offset="1" stopColor={PCB.mask} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" rx="20" fill="var(--art-panel)" stroke="var(--border)" />
      <rect x="12" y="12" width="376" height="236" rx="8" fill="url(#mem-pcb-mask)" stroke={PCB.fr4Edge} strokeWidth="1.5" />

      <g stroke={PCB.copper} fill="none" strokeLinecap="round">
        <path d="M 40 130 H 360" strokeWidth="2" opacity="0.5" />
        <path d="M 52 100 L 52 160 M 348 100 L 348 160" strokeWidth="1.4" opacity="0.65" />
      </g>

      {/* Five packages: SOIC / BGA-ish / TSOP style silhouettes on shared land pattern */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 40 + i * 72
        return (
          <g key={i} transform={`translate(${x}, 76)`}>
            <rect x="0" y="0" width="56" height="88" rx="4" fill={PCB.bodyIc} stroke="#111" strokeWidth="0.75" />
            <rect x="4" y="6" width="48" height="76" rx="2" fill={PCB.bodyIcTop} opacity="0.85" />
            {i === 1 ? (
              /* BGA grid */
              [0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3].map((col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={12 + col * 10}
                    cy={18 + row * 10}
                    r="2.5"
                    fill={PCB.copper}
                    opacity="0.9"
                  />
                )),
              )
            ) : (
              /* Leaded outline */
              <>
                {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                  <rect key={`t-${j}`} x={8 + j * 6.2} y="4" width="2" height="4" fill={PCB.copper} />
                ))}
                {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                  <rect key={`b-${j}`} x={8 + j * 6.2} y="80" width="2" height="4" fill={PCB.copper} />
                ))}
              </>
            )}
            <text x="28" y="118" textAnchor="middle" fill={PCB.silkFaint} fontSize="7" fontFamily="var(--font-mono)">
              U{i + 1}
            </text>
          </g>
        )
      })}

      <text x="200" y="212" textAnchor="middle" fill={PCB.silk} fontSize="10" fontFamily="var(--font-mono)">
        memory packages soldered to a board (symbolic row)
      </text>
      <text x="200" y="230" textAnchor="middle" fill={PCB.silkFaint} fontSize="8" fontFamily="var(--font-mono)">
        SO-style · BGA-ish · TSOP-ish outlines + ENIG
      </text>
    </svg>
  )
}
