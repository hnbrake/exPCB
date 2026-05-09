/** Linear vs switched conceptual */
export function LdoVsBuckDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 480 130" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="120" y="20" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          LDO (linear)
        </text>
        <text x="360" y="20" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          Buck (switching)
        </text>
        <rect x="32" y="36" width="176" height="78" rx="10" fill="var(--chart-bg)" stroke="var(--border)" />
        <text x="120" y="58" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          V_in
        </text>
        <rect x="72" y="68" width="96" height="28" rx="4" fill="var(--surface)" stroke="var(--text)" strokeWidth="1.2" />
        <text x="120" y="86" textAnchor="middle" fill="var(--text)" fontSize="9" fontWeight="600">
          pass device
        </text>
        <text x="120" y="108" textAnchor="middle" fill="var(--text-faint)" fontSize="8">
          heat = (V_in − V_out) × I
        </text>
        <rect x="272" y="36" width="176" height="78" rx="10" fill="var(--chart-bg)" stroke="var(--border)" />
        <text x="360" y="58" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          switch + diode/sync
        </text>
        <path d="M 300 86 L 330 86 L 345 70 L 360 102 L 375 70 L 390 86 L 420 86" fill="none" stroke="var(--text)" strokeWidth="2" />
        <text x="360" y="118" textAnchor="middle" fill="var(--text-faint)" fontSize="8">
          energy via inductor each cycle
        </text>
      </svg>
      <figcaption className="diagram-caption">
        Linear regulators burn excess voltage as heat; buck converters move packets of energy through an inductor for
        higher efficiency at the cost of ripple and magnetics design.
      </figcaption>
    </figure>
  )
}
