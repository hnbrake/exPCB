/** BJT vs MOSFET control variable cartoon */
export function DeviceFamiliesDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 480 110" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="24" y="24" width="200" height="72" rx="12" fill="var(--chart-bg)" stroke="var(--border)" />
        <text x="124" y="48" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="700">
          BJT
        </text>
        <text x="124" y="68" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
          base current controls collector
        </text>
        <text x="124" y="86" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          I_b → I_c curve
        </text>
        <rect x="256" y="24" width="200" height="72" rx="12" fill="var(--chart-bg)" stroke="var(--border)" />
        <text x="356" y="48" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="700">
          MOSFET
        </text>
        <text x="356" y="68" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
          gate voltage controls channel
        </text>
        <text x="356" y="86" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          V_gs → I_d surface
        </text>
      </svg>
      <figcaption className="diagram-caption">
        Digital CMOS is overwhelmingly MOSFET-based; BJTs still appear in analog bias networks and some linear regulators —
        the next pages focus on MOS because that is what digital switching is built from.
      </figcaption>
    </figure>
  )
}
