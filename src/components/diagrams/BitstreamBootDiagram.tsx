import { useId } from 'react'
import { PCB } from '../art/pcbColors'

/** Power-on → config flash → FPGA fabric (with stylized PCB strip). */
export function BitstreamBootDiagram() {
  const id = useId().replace(/:/g, '')
  const mid = `m-${id}`
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 480 128" xmlns="http://www.w3.org/2000/svg" aria-labelledby={`t-${id}`}>
        <title id={`t-${id}`}>Configuration bitstream flows from SPI flash into the FPGA at boot</title>
        <defs>
          <marker id={mid} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="var(--text-muted)" />
          </marker>
        </defs>
        {/* PCB substrate under the signal chain */}
        <rect x="6" y="102" width="468" height="18" rx="4" fill={PCB.mask} stroke={PCB.fr4Edge} strokeWidth="0.75" />
        <line x1="24" y1="111" x2="456" y2="111" stroke={PCB.copper} strokeWidth="1" opacity="0.45" />
        <text x="240" y="115" textAnchor="middle" fill={PCB.silkFaint} fontSize="7" fontFamily="var(--font-mono)">
          FR4 + copper (cartoon)
        </text>

        <rect x="8" y="28" width="100" height="56" rx="10" fill="var(--surface)" stroke="var(--border-strong)" />
        <text x="58" y="52" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          Power-on
        </text>
        <text x="58" y="68" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          reset / POR
        </text>
        <path d="M 118 56 L 152 56" stroke="var(--text-muted)" strokeWidth="2" markerEnd={`url(#${mid})`} />
        <rect x="160" y="28" width="120" height="56" rx="10" fill="var(--chart-bg)" stroke="var(--border-strong)" />
        <text x="220" y="52" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          SPI / QSPI flash
        </text>
        <text x="220" y="68" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          golden bitstream
        </text>
        <path d="M 288 56 L 322 56" stroke="var(--text-muted)" strokeWidth="2" markerEnd={`url(#${mid})`} />
        <rect x="330" y="20" width="142" height="72" rx="12" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.5" />
        <text x="401" y="48" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="700">
          FPGA
        </text>
        <text x="401" y="66" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">
          LUTs · RAM · IO
        </text>
        <text x="401" y="82" textAnchor="middle" fill="var(--text-faint)" fontSize="8" fontFamily="var(--font-mono)">
          now your HDL owns pins
        </text>
      </svg>
      <figcaption className="diagram-caption">
        Once power is sane, the FPGA pulls its configuration from external flash over Serial Peripheral Interface (SPI)
        or Quad SPI (QSPI); only then does the <strong>fabric</strong> — the programmable logic-and-routing mesh inside
        the die — match your design. (You can also load the same bitstream through a <strong>JTAG</strong> debug header;
        flash is what usually runs at every cold boot.)
      </figcaption>
    </figure>
  )
}
