import { Link } from 'react-router-dom'
import { PcbStripIllustration } from '../../components/art/PcbStripIllustration'
import { Cite, CitedSources } from '../../components/CitedSources'
import { BusWiringDiagram } from '../../components/diagrams/BusWiringDiagram'
import { JtagChainDiagram } from '../../components/diagrams/JtagChainDiagram'
import { PROTOCOLS_CITATIONS, REFERENCES_RETRIEVED } from '../../content/references'
import { SectionConnector } from '../../components/SectionConnector'

export function ProtocolsLitePage() {
  return (
    <>
      <p className="page-back">
        <Link to="/">← Home</Link>
      </p>
      <span className="badge badge--warm">Light read</span>
      <h1 className="page-title">
        Protocols at a glance
        <span className="emoji-after" aria-hidden>
          📡
        </span>
      </h1>
      <p className="page-lede">
        Two general-purpose serial buses show up constantly near processors and FPGAs:{' '}
        <strong>Serial Peripheral Interface (SPI)</strong> and <strong>Inter-Integrated Circuit (I²C, often written I2C)</strong>.
        A third interface, <strong>JTAG</strong> (from the <strong>Joint Test Action Group</strong> standard, IEEE
        1149.1), is different: it is a <em>test and debug port</em> — a handful of pins that clock configuration and
        diagnostic data through shift registers inside the chip, not a bus where you “read a register at an address”
        the way you do on SPI or I²C. SPI and I²C trade pin count and speed; JTAG trades a small connector for deep
        access during bring-up.
      </p>

      <PcbStripIllustration variant="protocols" />

      <BusWiringDiagram />

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>What the standards and manuals emphasize</h2>
        <div className="prose-block">
          <p>
            IEEE’s summary of <strong>IEEE Std 1149.1-2013</strong> describes optional on-chip <strong>test access</strong>{' '}
            circuitry — including a <strong>boundary-scan</strong> path and a serial interface for instructions and test
            data — intended to help test assembled boards and internal circuits, which is why JTAG feels unlike SPI or
            I²C even though all three use a clocked serial bit stream.
            <Cite id="cite-ieee-1149" n={1} />
          </p>
          <p>
            NXP’s <strong>UM10204</strong> I²C-bus specification is the usual primary reference for the two-wire model:
            open-drain <strong>SDA</strong> and <strong>SCL</strong>, pull-ups, bus capacitance limits, and named speed
            grades (Standard-mode through Fast-mode Plus and beyond) that datasheets echo verbatim.
            <Cite id="cite-um10204" n={2} />
          </p>
          <p style={{ marginBottom: 0 }}>
            Microchip’s peripheral overview for <strong>SPI</strong> highlights what you will see in MCU chapters: a
            shared clock, dedicated in/out data lines, and a per-device <strong>chip select</strong>, aimed at
            short-distance, controller-driven transfers rather than a shared multi-drop bus like I²C.
            <Cite id="cite-mchp-spi" n={3} />
          </p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>SPI — Serial Peripheral Interface</h2>
        <div className="prose-block">
          <p>
            SPI is a master-driven synchronous bus: <strong>serial clock (SCLK)</strong>,{' '}
            <strong>master-out-slave-in (MOSI)</strong>, <strong>master-in-slave-out (MISO)</strong>, and one active-low
            <strong> chip select (/CS or /SS)</strong> per slave. It is full-duplex in four-wire mode (data can flow on
            MOSI and MISO simultaneously) though many peripherals only use one direction at a time.
          </p>
          <p>
            SPI is fast and simple electrically, but every slave needs a select line — pin count grows. You will see
            it for sensors, displays, digital-to-analog converters (DACs), and SPI NOR flash that stores FPGA
            configuration bitstreams.
          </p>
        </div>
      </div>

      <SectionConnector>
        SPI’s dedicated clock and data lines make timing straightforward for masters; I²C shares clock and data with{' '}
        <strong>open-drain</strong> physics — the next card is why rise time and pull-ups matter as much as baud rate.
      </SectionConnector>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>I²C — Inter-Integrated Circuit</h2>
        <div className="prose-block">
          <p>
            I²C uses two wires: <strong>SDA</strong> (serial data) and <strong>SCL</strong> (serial clock), both
            open-drain with pull-up resistors. Multiple devices share the bus; each slave has a 7-bit or 10-bit
            address. Capacitance on long cables slows rise times, so maximum clock rate depends on topology — there are
            relaxed modes (Standard, Fast, Fast-mode Plus, High Speed) with different rules.
          </p>
          <p>
            Great for small EEPROMs, power management ICs (PMICs), and sensors where wiring simplicity beats raw
            throughput.
          </p>
        </div>
      </div>

      <SectionConnector>
        When you plug a debugger into an FPGA or MCU, you are often talking through a <strong>shift register chain</strong>{' '}
        that was originally meant for boundary scan — same pins, different software stacks.
      </SectionConnector>

      <JtagChainDiagram />

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>JTAG — Joint Test Action Group</h2>
        <div className="prose-block">
          <p>
            If SPI is “move bytes between chips” and I²C is “share two wires with addresses,” JTAG is “walk this chip’s
            built-in state machine so bits enter at <strong>TDI</strong> (test data in), travel through a chain of
            flip-flops, and exit at <strong>TDO</strong> (test data out) while <strong>TCK</strong> (test clock) and{' '}
            <strong>TMS</strong> (test mode select) choose the mode.” That chain originally drove <strong>boundary-scan</strong>{' '}
            cells at each pin for manufacturing test; FPGA vendors reuse the same pins for programming, debug, and
            embedded logic analysis even when production boots from flash.
          </p>
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          border: '1px solid var(--border)',
          padding: '1rem',
          background: 'var(--chart-bg)',
        }}
      >
        <p style={{ margin: '0 0 0.75rem', color: 'var(--text-muted)', fontSize: 'var(--step--1)' }}>
          Conceptual SPI timing (mode 0-ish, not to scale) — note how MOSI is sampled on clock edges while{' '}
          <strong>/CS</strong> frames the transaction:
        </p>
        <svg viewBox="0 0 360 120" width="100%" style={{ maxHeight: 140 }} aria-hidden>
          <text x="8" y="14" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
            SCLK
          </text>
          <polyline
            fill="none"
            stroke="var(--chart-series)"
            strokeWidth="2"
            points="8,28 24,28 24,44 40,44 40,28 56,28 56,44 72,44 72,28 88,28 88,44 104,44 104,28 120,28 120,44 136,44 136,28 152,28 152,44 168,44 168,28 184,28 184,44 200,44 200,28 216,28 216,44 232,44 232,28 248,28 248,44 264,44 264,28 280,28 280,44 296,44 296,28 312,28 312,44 328,44 328,28 344,28"
          />
          <text x="8" y="64" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
            MOSI
          </text>
          <polyline
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
            points="8,78 56,78 56,94 104,94 104,78 152,78 152,110 200,110 200,78 248,78 248,94 296,94 296,78 344,78"
          />
          <text x="8" y="118" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
            /CS
          </text>
          <line x1="8" y1="112" x2="40" y2="112" stroke="var(--text-muted)" strokeWidth="3" />
          <line x1="40" y1="118" x2="200" y2="118" stroke="var(--text-muted)" strokeWidth="3" />
          <line x1="200" y1="112" x2="232" y2="112" stroke="var(--text-muted)" strokeWidth="3" />
        </svg>
      </div>

      <SectionConnector>
        You have reached the end of the suggested trail — use the <strong>learning trail</strong> at the bottom of the
        page to hop back, or return home and pick another branch.
      </SectionConnector>

      <CitedSources retrieved={REFERENCES_RETRIEVED} citations={PROTOCOLS_CITATIONS} />

      <p>
        <Link to="/">Back to home →</Link>
      </p>
    </>
  )
}
