/** SPI (4 + CS) vs I²C (2) wiring cartoon */
export function BusWiringDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 480 150" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="120" y="20" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          SPI — four core wires + /CS each slave
        </text>
        <text x="360" y="20" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          I²C — SDA + SCL shared, addresses software
        </text>
        {['SCLK', 'MOSI', 'MISO', '/CS'].map((w, i) => (
          <g key={w}>
            <line x1="40" y1={40 + i * 16} x2="200" y2={40 + i * 16} stroke="var(--text-muted)" strokeWidth="2" />
            <text x="44" y={44 + i * 16} fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
              {w}
            </text>
          </g>
        ))}
        <line x1="280" y1="48" x2="440" y2="48" stroke="var(--text-muted)" strokeWidth="2" />
        <text x="284" y="52" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          SDA (open-drain)
        </text>
        <line x1="280" y1="80" x2="440" y2="80" stroke="var(--text-muted)" strokeWidth="2" />
        <text x="284" y="84" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          SCL
        </text>
        <text x="360" y="118" textAnchor="middle" fill="var(--text-faint)" fontSize="9">
          pull-ups required on both lines
        </text>
      </svg>
      <figcaption className="diagram-caption">
        SPI trades pin count for simplicity and speed; I²C trades bus capacitance limits for two-wire elegance — pick
        based on bandwidth, cable length, and how many devices must share the same copper.
      </figcaption>
    </figure>
  )
}
