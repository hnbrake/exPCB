/** Simple R — C low-pass and L in a magnetic storage role */
export function RlcTopologyDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 480 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="120" y="18" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          RC low-pass
        </text>
        <text x="360" y="18" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          Inductor stores energy
        </text>
        <circle cx="40" cy="56" r="5" fill="var(--chart-series)" />
        <path
          d="M 48 56 L 72 56 L 86 42 L 100 70 L 114 42 L 128 70 L 142 56 L 168 56"
          fill="none"
          stroke="var(--text)"
          strokeWidth="2"
        />
        <line x1="168" y1="56" x2="168" y2="78" stroke="var(--text-muted)" strokeWidth="2" />
        <path d="M 156 78 L 180 78" stroke="var(--text-muted)" strokeWidth="2" />
        <circle cx="200" cy="56" r="5" fill="var(--chart-series)" />
        <path
          d="M 280 56 C 295 36, 305 76, 320 56 C 335 36, 345 76, 360 56 C 375 36, 385 76, 400 56"
          fill="none"
          stroke="var(--text)"
          strokeWidth="2"
        />
        <line x1="260" y1="56" x2="260" y2="56" stroke="var(--text-faint)" />
        <circle cx="420" cy="56" r="5" fill="var(--chart-series)" />
      </svg>
      <figcaption className="diagram-caption">
        Left: resistor plus capacitor set a pole frequency. Right: inductor current cannot jump — that property is what
        buck converters exploit when they shuttle energy each cycle.
      </figcaption>
    </figure>
  )
}
