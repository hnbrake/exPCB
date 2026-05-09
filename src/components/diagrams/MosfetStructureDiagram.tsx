/** Highly simplified n-channel MOSFET cross-section idea */
export function MosfetStructureDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 440 218" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="220" y="22" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          n-channel enhancement (conceptual cross-section)
        </text>

        {/* p-type body / bulk (drawn first) */}
        <rect x="48" y="96" width="344" height="88" rx="8" fill="var(--chart-bg)" stroke="var(--border)" />
        <text x="220" y="174" textAnchor="middle" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
          p-type body
        </text>

        {/* n+ source / drain */}
        <rect x="62" y="124" width="56" height="40" rx="3" fill="var(--text-muted)" opacity="0.35" />
        <text x="90" y="148" textAnchor="middle" fill="var(--text)" fontSize="10" fontWeight="600">
          n+
        </text>
        <text x="90" y="118" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">
          source
        </text>

        <rect x="322" y="124" width="56" height="40" rx="3" fill="var(--text-muted)" opacity="0.35" />
        <text x="350" y="148" textAnchor="middle" fill="var(--text)" fontSize="10" fontWeight="600">
          n+
        </text>
        <text x="350" y="118" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">
          drain
        </text>

        {/* Inversion channel under gate */}
        <rect x="168" y="88" width="104" height="14" rx="3" fill="var(--surface)" stroke="var(--text)" strokeWidth="1" />
        <text x="220" y="98" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">
          channel (inversion)
        </text>

        {/* Gate stack on top */}
        <rect x="186" y="48" width="68" height="36" rx="4" fill="var(--surface)" stroke="var(--border-strong)" />
        <text x="220" y="70" textAnchor="middle" fill="var(--text)" fontSize="10" fontWeight="700">
          gate
        </text>

        <text x="220" y="208" textAnchor="middle" fill="var(--text-faint)" fontSize="8" fontFamily="var(--font-mono)">
          V_GS pulls carriers under the oxide — toy picture, not a foundry drawing
        </text>
      </svg>
      <figcaption className="diagram-caption">
        A voltage on the gate creates an inversion layer that links source and drain; the sliders on this page toy with
        that idea without drawing every implant and field plate.
      </figcaption>
    </figure>
  )
}
