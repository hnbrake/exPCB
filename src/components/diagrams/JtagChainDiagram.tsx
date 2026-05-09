/** TDI → TDO shift idea */
export function JtagChainDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 480 96" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="240" y="20" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          JTAG scan chain (conceptual)
        </text>
        <text x="36" y="62" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
          TDI
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={72 + i * 92}
            y="40"
            width="72"
            height="36"
            rx="6"
            fill="var(--surface)"
            stroke="var(--border-strong)"
          />
        ))}
        <text x="444" y="62" textAnchor="end" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
          TDO
        </text>
        <text x="240" y="88" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          TCK shifts bits — boundary cells touch real pins
        </text>
      </svg>
      <figcaption className="diagram-caption">
        <strong>JTAG</strong> (Joint Test Action Group) is this pattern in hardware: bits in at TDI, out at TDO,
        stepped by TCK. Vendor tools reuse the same physical pins to program configuration memory and to talk debug
        cores — different software stacks, same shift-register plumbing.
      </figcaption>
    </figure>
  )
}
