/** Conceptual: integrated product chip vs programmable fabric vs sequential CPU */
export function SocFpgaMpuDiagram() {
  return (
    <figure className="diagram-figure">
      <svg className="diagram-frame" viewBox="0 0 540 168" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <text x="90" y="22" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="700">
          SoC
        </text>
        <rect x="20" y="32" width="140" height="108" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="90" y="58" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          CPU cluster
        </text>
        <text x="90" y="78" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          GPU / NPU / ISP
        </text>
        <text x="90" y="98" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          memory ctrl · I/O
        </text>
        <text x="90" y="124" textAnchor="middle" fill="var(--text-faint)" fontSize="8" fontFamily="var(--font-mono)">
          optional FPGA fabric
        </text>

        <text x="270" y="22" textAnchor="middle" fill="#6d28d9" fontSize="11" fontWeight="700">
          FPGA
        </text>
        <rect x="200" y="32" width="140" height="108" rx="12" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2.5" />
        <text x="270" y="70" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          LUT · FF · RAM
        </text>
        <text x="270" y="92" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          routing mesh
        </text>
        <text x="270" y="118" textAnchor="middle" fill="var(--text-faint)" fontSize="8" fontFamily="var(--font-mono)">
          you define data paths
        </text>

        <text x="450" y="22" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="700">
          MPU / MCU
        </text>
        <rect x="380" y="32" width="140" height="108" rx="12" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
        <text x="450" y="62" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          fetch · decode
        </text>
        <text x="450" y="82" textAnchor="middle" fill="var(--text-faint)" fontSize="9" fontFamily="var(--font-mono)">
          ALU · pipeline
        </text>
        <text x="450" y="108" textAnchor="middle" fill="var(--text-faint)" fontSize="8" fontFamily="var(--font-mono)">
          fixed ISA program
        </text>
      </svg>
      <figcaption className="diagram-caption">
        Cartoon only: many real chips blur the boxes — an SoC can include FPGA fabric, and an MCU can include small
        programmable logic — but the three labels capture how teams divide work (integrate vs reconfigure vs program).
      </figcaption>
    </figure>
  )
}
