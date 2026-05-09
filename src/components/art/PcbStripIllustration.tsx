import { PCB } from './pcbColors'

type Variant = 'power' | 'protocols' | 'passives'

/** Narrow PCB banner for light-topic pages — components match the chapter. */
export function PcbStripIllustration({ variant }: { variant: Variant }) {
  return (
    <figure className="pcb-strip-figure">
      <svg
        className="pcb-strip-figure__svg"
        viewBox="0 0 480 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="0" y="0" width="480" height="88" rx="12" fill="var(--art-panel)" stroke="var(--border)" />
        <rect x="6" y="6" width="468" height="76" rx="8" fill={PCB.mask} stroke={PCB.fr4Edge} strokeWidth="1" />
        <g stroke={PCB.copper} strokeLinecap="round" fill="none">
          <path d="M 24 44 H 456" strokeWidth="1.4" opacity="0.55" />
          {variant === 'power' && (
            <>
              <path d="M 40 44 L 100 44 L 120 28 L 140 60 L 160 44 L 420 44" strokeWidth="1.8" />
              <path d="M 220 44 V 64" strokeWidth="1.4" />
            </>
          )}
          {variant === 'protocols' && (
            <>
              <path d="M 32 44 L 120 44 M 160 32 L 160 56 M 200 44 L 320 44 M 360 28 L 360 60 M 400 44 L 448 44" strokeWidth="1.6" />
            </>
          )}
          {variant === 'passives' && (
            <>
              <path d="M 40 44 C 80 24, 100 64, 140 44 S 200 24, 240 44 S 320 64, 400 44" strokeWidth="1.8" />
            </>
          )}
        </g>

        {variant === 'power' && (
          <>
            {/* LDO SOT-223 */}
            <rect x="52" y="28" width="36" height="32" rx="3" fill={PCB.bodyIc} stroke="#111" strokeWidth="0.75" />
            <rect x="60" y="62" width="5" height="8" fill={PCB.copper} />
            <rect x="68" y="62" width="5" height="8" fill={PCB.copper} />
            <rect x="76" y="62" width="5" height="8" fill={PCB.copper} />
            {/* Inductor */}
            <rect x="168" y="32" width="44" height="24" rx="4" fill="#3d3a36" stroke={PCB.copper} strokeWidth="0.75" />
            {/* Output caps */}
            <g transform="translate(268, 38)">
              <rect x="-8" y="0" width="5" height="4" fill={PCB.pad} />
              <rect x="9" y="0" width="5" height="4" fill={PCB.pad} />
              <rect x="-3" y="0" width="12" height="4" rx="0.8" fill={PCB.capCeramic} />
            </g>
            <g transform="translate(318, 38)">
              <rect x="-8" y="0" width="5" height="4" fill={PCB.pad} />
              <rect x="9" y="0" width="5" height="4" fill={PCB.pad} />
              <rect x="-3" y="0" width="12" height="4" rx="0.8" fill={PCB.capMlcc} />
            </g>
            <text x="240" y="78" textAnchor="middle" fill={PCB.silk} fontSize="9" fontFamily="var(--font-mono)">
              LDO · buck inductor · MLCC output bank (PCB)
            </text>
          </>
        )}

        {variant === 'protocols' && (
          <>
            <rect x="48" y="30" width="56" height="28" rx="3" fill="#1e1e22" stroke={PCB.silkFaint} strokeWidth="0.75" />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={58 + i * 10} cy="44" r="3" fill={PCB.copper} />
            ))}
            <text x="76" y="26" textAnchor="middle" fill={PCB.silkFaint} fontSize="6" fontFamily="var(--font-mono)">
              SPI
            </text>
            <rect x="200" y="30" width="40" height="28" rx="3" fill="#1e1e22" stroke={PCB.silkFaint} strokeWidth="0.75" />
            <circle cx="212" cy="40" r="2.5" fill={PCB.copper} />
            <circle cx="228" cy="40" r="2.5" fill={PCB.copper} />
            <circle cx="212" cy="50" r="2.5" fill={PCB.copper} />
            <circle cx="228" cy="50" r="2.5" fill={PCB.copper} />
            <text x="220" y="26" textAnchor="middle" fill={PCB.silkFaint} fontSize="6" fontFamily="var(--font-mono)">
              I²C
            </text>
            <rect x="320" y="26" width="48" height="36" rx="3" fill="#1e1e22" stroke={PCB.silkFaint} strokeWidth="0.75" />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={`j-${i}`} cx={332} cy={34 + i * 6.5} r="2.2" fill={PCB.copper} />
            ))}
            <text x="344" y="22" textAnchor="middle" fill={PCB.silkFaint} fontSize="6" fontFamily="var(--font-mono)">
              JTAG
            </text>
            <text x="240" y="78" textAnchor="middle" fill={PCB.silk} fontSize="9" fontFamily="var(--font-mono)">
              shrouded headers / castellations on real PCBs
            </text>
          </>
        )}

        {variant === 'passives' && (
          <>
            <g transform="translate(72, 40)">
              <rect x="-9" y="-2" width="7" height="5" fill={PCB.pad} />
              <rect x="10" y="-2" width="7" height="5" fill={PCB.pad} />
              <rect x="-2" y="-1.5" width="12" height="4" rx="0.5" fill={PCB.passiveBlack} />
            </g>
            <g transform="translate(168, 40)">
              <rect x="-10" y="-2" width="7" height="5" fill={PCB.pad} />
              <rect x="11" y="-2" width="7" height="5" fill={PCB.pad} />
              <rect x="-3" y="-2" width="14" height="5" rx="1" fill={PCB.capCeramic} />
            </g>
            <rect x="248" y="34" width="40" height="20" rx="3" fill="#3d3a36" stroke={PCB.copper} strokeWidth="0.75" />
            <text x="240" y="78" textAnchor="middle" fill={PCB.silk} fontSize="9" fontFamily="var(--font-mono)">
              0402 / 0603 land patterns + copper pours
            </text>
          </>
        )}
      </svg>
      <figcaption className="pcb-strip-figure__cap">
        {variant === 'power' && 'Power-stage parts as they appear next to copper.'}
        {variant === 'protocols' && 'Buses break out to connectors on the board edge.'}
        {variant === 'passives' && 'Discrete land patterns before the IC neighborhood.'}
      </figcaption>
    </figure>
  )
}
