/** Conceptual: faster ↔ smaller capacity (not to scale) */
export function MemoryLatencyDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 480 140" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="240" y="20" textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontWeight="600">
          Random-access latency vs typical capacity (conceptual)
        </text>
        {[
          { y: 36, w: 420, label: 'Registers / flip-flops (on-chip)', sub: 'fastest — bits only' },
          { y: 62, w: 340, label: 'SRAM (on-chip BRAM or macro)', sub: 'ns class — kilobits to few Mb' },
          { y: 88, w: 260, label: 'DRAM (off-chip SDRAM/DDR)', sub: 'tens of ns — gigabytes' },
          { y: 114, w: 180, label: 'NAND flash (pages/blocks)', sub: 'µs-ms — huge, cheap' },
        ].map((row) => (
          <g key={row.label}>
            <rect x="40" y={row.y} width={row.w} height="18" rx="4" fill="var(--chart-bg)" stroke="var(--border)" />
            <text x="48" y={row.y + 12} fill="var(--text)" fontSize="10" fontWeight="600">
              {row.label}
            </text>
            <text x={48 + row.w - 8} y={row.y + 12} textAnchor="end" fill="var(--text-faint)" fontSize="8" fontFamily="var(--font-mono)">
              {row.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="diagram-caption">
        Designers stack tiers: tiny fast memory close to logic, bulk slower memory further out — the same pattern
        appears beside FPGAs and processors alike.
      </figcaption>
    </figure>
  )
}
