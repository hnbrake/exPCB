/** Highly simplified n-channel MOSFET cross-section idea */
export function MosfetStructureDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="200" y="18" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          n-channel enhancement (conceptual cross-section)
        </text>
        <rect x="40" y="40" width="320" height="90" rx="6" fill="var(--chart-bg)" stroke="var(--border)" />
        <text x="56" y="95" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
          p-type body
        </text>
        <rect x="70" y="88" width="44" height="34" rx="2" fill="var(--text-muted)" opacity="0.35" />
        <text x="92" y="108" textAnchor="middle" fill="var(--text)" fontSize="9" fontWeight="600">
          n+
        </text>
        <text x="92" y="78" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">
          source
        </text>
        <rect x="286" y="88" width="44" height="34" rx="2" fill="var(--text-muted)" opacity="0.35" />
        <text x="308" y="108" textAnchor="middle" fill="var(--text)" fontSize="9" fontWeight="600">
          n+
        </text>
        <text x="308" y="78" textAnchor="middle" fill="var(--text-muted)" fontSize="8" fontFamily="var(--font-mono)">
          drain
        </text>
        <rect x="168" y="72" width="64" height="10" rx="2" fill="var(--surface)" stroke="var(--text)" strokeWidth="1" />
        <text x="200" y="80" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="var(--font-mono)">
          channel (inversion)
        </text>
        <rect x="176" y="40" width="48" height="28" rx="2" fill="var(--surface)" stroke="var(--border-strong)" />
        <text x="200" y="58" textAnchor="middle" fill="var(--text)" fontSize="9" fontWeight="700">
          gate
        </text>
        <text x="200" y="148" textAnchor="middle" fill="var(--text-faint)" fontSize="8" fontFamily="var(--font-mono)">
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
