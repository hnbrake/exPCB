/** SPI (4 + CS) vs I²C (2) wiring cartoon */
export function BusWiringDiagram() {
  const spiX0 = 36
  const spiX1 = 228
  const i2cX0 = 268
  const i2cX1 = 484
  const row = (i: number) => 52 + i * 26

  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 520 198" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="132" y="24" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          SPI — four core wires + /CS each slave
        </text>
        <text x="376" y="24" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
          I²C — SDA + SCL shared, addresses software
        </text>
        {['SCLK', 'MOSI', 'MISO', '/CS'].map((w, i) => (
          <g key={w}>
            <line
              x1={spiX0}
              y1={row(i)}
              x2={spiX1}
              y2={row(i)}
              stroke="var(--text-muted)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x={spiX0 + 4}
              y={row(i) - 6}
              fill="var(--text-faint)"
              fontSize="9"
              fontFamily="var(--font-mono)"
            >
              {w}
            </text>
          </g>
        ))}
        <line
          x1={i2cX0}
          y1={row(0)}
          x2={i2cX1}
          y2={row(0)}
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x={i2cX0 + 4} y={row(0) - 6} fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          SDA (open-drain)
        </text>
        <line
          x1={i2cX0}
          y1={row(2)}
          x2={i2cX1}
          y2={row(2)}
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x={i2cX0 + 4} y={row(2) - 6} fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          SCL
        </text>
        <text x="376" y="168" textAnchor="middle" fill="var(--text-faint)" fontSize="9">
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
