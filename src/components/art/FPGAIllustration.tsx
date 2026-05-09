import { PCB } from './pcbColors'

export function FPGAIllustration() {
  return (
    <svg
      className="hero-illustration hero-illustration--compact"
      viewBox="0 0 400 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="fpga-pcb-mask" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={PCB.maskLight} />
          <stop offset="1" stopColor={PCB.mask} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" rx="20" fill="var(--art-panel)" stroke="var(--border)" />
      <rect x="12" y="12" width="376" height="236" rx="8" fill="url(#fpga-pcb-mask)" stroke={PCB.fr4Edge} strokeWidth="1.5" />

      <g stroke={PCB.copper} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 56 128 L 108 128 L 108 88 L 200 88 L 200 128" strokeWidth="1.8" />
        <path d="M 292 128 L 344 128 L 344 168 L 200 168 L 200 128" strokeWidth="1.8" />
        <path d="M 200 128 L 200 200 L 280 200" strokeWidth="1.5" opacity="0.85" />
      </g>

      {/* FPGA */}
      <rect x="132" y="44" width="136" height="136" rx="6" fill={PCB.bodyIc} stroke="#0a0a0c" strokeWidth="1" />
      <rect x="138" y="50" width="124" height="124" rx="4" fill={PCB.bodyIcTop} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={146 + col * 14}
            cy={58 + row * 14}
            r="3"
            fill={PCB.copper}
            opacity="0.9"
          />
        )),
      )}

      {/* SPI / QSPI flash SO-8 */}
      <rect x="32" y="96" width="64" height="24" rx="2" fill={PCB.bodyIc} stroke="#111" strokeWidth="0.75" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={`f-${i}`} x={38 + i * 16} y="92" width="2.5" height="5" fill={PCB.copper} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`f2-${i}`} x={38 + i * 16} y="119" width="2.5" height="5" fill={PCB.copper} />
      ))}
      <text x="64" y="112" textAnchor="middle" fill={PCB.silkFaint} fontSize="7" fontFamily="var(--font-mono)">
        SPI
      </text>

      {/* JTAG 10-pin */}
      <g transform="translate(312, 88)">
        <rect x="0" y="0" width="56" height="40" rx="3" fill="#1e1e22" stroke={PCB.silkFaint} strokeWidth="0.75" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx="10" cy={10 + i * 6} r="2.2" fill={PCB.copper} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={`r-${i}`} cx="34" cy={10 + i * 6} r="2.2" fill={PCB.copper} />
        ))}
      </g>

      <text x="200" y="232" textAnchor="middle" fill={PCB.silk} fontSize="10" fontFamily="var(--font-mono)">
        PCB: config flash ↔ FPGA ↔ JTAG header
      </text>
      <text x="200" y="248" textAnchor="middle" fill={PCB.silkFaint} fontSize="8" fontFamily="var(--font-mono)">
        solder mask + ENIG traces (stylized)
      </text>
    </svg>
  )
}
