/** In → out for CMOS inverter */
export function InverterTruthDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 320 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="160" y="22" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          CMOS inverter truth idea
        </text>
        <rect x="60" y="36" width="200" height="52" rx="8" fill="var(--chart-bg)" stroke="var(--border)" />
        <text x="100" y="58" textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="600">
          IN = 0
        </text>
        <text x="100" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
          OUT ≈ VDD
        </text>
        <text x="220" y="58" textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="600">
          IN = 1
        </text>
        <text x="220" y="76" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
          OUT ≈ GND
        </text>
      </svg>
      <figcaption className="diagram-caption">
        The interactive diagram below animates the complementary pull-up / pull-down idea that makes this table true in
        steady state.
      </figcaption>
    </figure>
  )
}
