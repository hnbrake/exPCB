import { Link } from 'react-router-dom'
import { AttributedFigure } from '../../components/AttributedFigure'
import { ScrollReveal } from '../../components/ScrollReveal'
import { SectionConnector } from '../../components/SectionConnector'
import { SocFpgaMpuDiagram } from '../../components/diagrams/SocFpgaMpuDiagram'

const compareRows: {
  axis: string
  fpga: string
  soc: string
  proc: string
}[] = [
  {
    axis: 'Primary abstraction',
    fpga: 'Spatial hardware: registers, wires, and memories laid out in parallel.',
    soc: 'Product architecture: CPUs plus fixed accelerators and I/O subsystems on one die.',
    proc: 'Sequential machine: instructions mutate state through a fixed instruction set architecture (ISA).',
  },
  {
    axis: 'How behavior changes after silicon',
    fpga: 'Reload a new bitstream to change gates, pipelines, and interfaces (hours to weeks in the lab).',
    soc: 'Firmware updates software; mask-ROM logic is fixed unless you taped out a new chip.',
    proc: 'Software only — hardware datapath width, pipeline depth, and ISA are fixed at tape-out.',
  },
  {
    axis: 'Parallelism',
    fpga: 'Massive fine-grained parallelism if you spend LUTs and clocks wisely.',
    soc: 'Mix of CPU cores, DMA engines, and hard IP (video, crypto, modem) chosen by the vendor.',
    proc: 'Limited explicit parallelism (cores, SIMD, accelerators) unless paired with other silicon.',
  },
  {
    axis: 'Typical sweet spot',
    fpga: 'Custom line rates, sensor fusion pipelines, protocol bridges, prototyping ASIC algorithms.',
    soc: 'Phones, set-top boxes, automotive domain controllers — highly integrated products at volume with predictable silicon cost.',
    proc: 'Control loops, application stacks on RTOS/Linux, boot managers, human-facing products.',
  },
  {
    axis: 'Team skills',
    fpga: 'HDL, timing closure, clock domains, lab bring-up with JTAG and logic analyzers.',
    soc: 'BSP work, drivers, power domains, security, verification across CPU + accelerators.',
    proc: 'Embedded C/C++, RTOS, debuggers, occasionally assembly for boot or ISR hot paths.',
  },
]

export function SoCComparePage() {
  return (
    <>
      <p className="page-back">
        <Link to="/fpga">← FPGA hub</Link>
      </p>
      <h1 className="page-title">
        SoC, FPGA, or processor?
        <span className="emoji-after" aria-hidden>
          🧠
        </span>
      </h1>
      <p className="page-lede">
        A <strong>system on a chip (SoC)</strong> integrates most of a product’s digital subsystems — one or more{' '}
        <strong>microprocessor</strong> cores, memory controllers, I/O, and often graphics or machine-learning
        accelerators — on a single die. A <strong>field-programmable gate array (FPGA)</strong> emphasizes{' '}
        <em>reconfigurable fabric</em> instead of a fixed program fetch loop. A standalone <strong>microprocessor</strong>{' '}
        (often part of a larger SoC) or <strong>microcontroller (MCU)</strong> is the sequential engine that runs
        compiled software against a frozen ISA.
      </p>

      <SocFpgaMpuDiagram />

      <SectionConnector>
        The question is rarely “FPGA <em>or</em> SoC” in the real world — it is <strong>where the boundary sits</strong>{' '}
        between software on a core, hardened IP blocks, and programmable logic you still control at the gate level.
      </SectionConnector>

      <AttributedFigure
        className="attributed-figure--portrait"
        src="/diagrams/motherboard-block-diagram.svg"
        alt="Block diagram of a late-2000s PC motherboard showing CPU, northbridge, southbridge, RAM, and buses"
        title="System integration at board scale"
        caption={
          <>
            A classic motherboard map: CPUs, bridges, memory, and I/O — the same <em>integration story</em> an SoC
            collapses into one die (often with more specialized accelerators).
          </>
        }
        credit={{
          attribution: 'Moxfyre (derived from Gribeco), English Wikipedia',
          sourceUrl: 'https://commons.wikimedia.org/wiki/File:Motherboard_diagram.svg',
          license: 'CC BY-SA 3.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/deed.en',
        }}
      />

      <ScrollReveal>
        <h2 className="section-title">System on a chip (SoC)</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              Designers use <strong>SoC</strong> to mean “single chip owns the platform”: application or real-time
              processors, on-chip SRAM and boot ROM, external <strong>dynamic RAM (DRAM)</strong> controllers, USB /
              PCIe / MIPI PHYs, power islands, and security processors. Silicon is optimized for unit cost and power at
              huge volumes; you customize behavior mainly through <strong>firmware</strong>, <strong>drivers</strong>, and
              which hard accelerators the vendor already included.
            </p>
            <p>
              Some SoCs also embed a slice of <strong>FPGA fabric</strong> (for example certain adaptive SoC families) so
              teams can move late-binding logic next to application-class CPU clusters — the diagram above is a mental
              model, not a die floorplan.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <h2 className="section-title">FPGA (fabric-first)</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              An FPGA’s headline feature is the <strong>programmable fabric</strong>: LUTs, flip-flops, block RAM, and
              routing you stitch with a bitstream. You can implement parallel datapaths that would be inefficient on a
              general-purpose core, or stitch odd legacy buses, or validate an algorithm before taping out an{' '}
              <strong>application-specific integrated circuit (ASIC)</strong>.
            </p>
            <p>
              Tradeoffs: tool time, power when toggling lots of fabric, and the need to think like a hardware designer
              (clocks, timing, metastability) rather than only like a programmer stepping through C statements.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={90}>
        <h2 className="section-title">Microprocessors and microcontrollers</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              A <strong>microprocessor</strong> is the CPU proper — registers, ALU, pipeline, caches — usually paired with
              external memory and I/O chips on a board (classic PC-style, or big application processors). A{' '}
              <strong>microcontroller (MCU)</strong> packs that core with on-chip flash, SRAM, timers, ADCs, and GPIO so
              a single cheap part runs a washing machine or sensor node.
            </p>
            <p>
              In both cases the mental model is <strong>fetch → decode → execute</strong>: one program counter walks
              memory. Parallelism comes from multiple cores, SIMD units, or hand-written threads — not from thousands of
              independent hardware threads unless you add accelerators or FPGA fabric beside the core.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <h2 className="section-title">Side-by-side</h2>
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--step--1)' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', minWidth: '7rem' }}>Axis</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', minWidth: '11rem' }}>FPGA</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', minWidth: '11rem' }}>SoC</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', minWidth: '11rem' }}>
                  MPU / MCU
                </th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.axis}>
                  <td
                    style={{
                      padding: '0.55rem',
                      borderBottom: '1px solid var(--border)',
                      fontWeight: 600,
                      verticalAlign: 'top',
                    }}
                  >
                    {row.axis}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem',
                      borderBottom: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      verticalAlign: 'top',
                    }}
                  >
                    {row.fpga}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem',
                      borderBottom: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      verticalAlign: 'top',
                    }}
                  >
                    {row.soc}
                  </td>
                  <td
                    style={{
                      padding: '0.55rem',
                      borderBottom: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      verticalAlign: 'top',
                    }}
                  >
                    {row.proc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <h2 className="section-title">How they show up together</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              A smartphone <strong>SoC</strong> is the textbook example: big cores, GPU, image signal processor (ISP),
              cellular modem slices, and security enclaves. A <strong>network switch chip</strong> might pair many RISC
              cores with fixed packet engines. A <strong>development board</strong> might strap an MCU to an FPGA so
              the MCU handles USB stacks while the fabric handles line-rate I/O.
            </p>
            <p style={{ marginBottom: 0 }}>
              Picking “FPGA vs SoC vs processor” is really picking <strong>which layer owns the risk</strong>: software on
              a core you did not design, vendor IP you instantiate, or gates you still control — often you blend two or
              three on the same board or the same package.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SectionConnector>
        Once you know how integration differs from reconfigurable fabric, the next practical topic is{' '}
        <strong>memory</strong> — every SoC and FPGA board still has to place DRAM, flash, and SRAM sensibly.
      </SectionConnector>

      <p>
        <Link to="/memory">Next: memory overview →</Link>
      </p>
    </>
  )
}
