import { Link } from 'react-router-dom'
import { BitstreamBootDiagram } from '../../components/diagrams/BitstreamBootDiagram'
import { FPGASystemBuilder } from '../../components/demos/FPGASystemBuilder'
import { SectionConnector } from '../../components/SectionConnector'

export function SystemBuilderPage() {
  return (
    <>
      <p className="page-back">
        <Link to="/fpga">← FPGA hub</Link>
      </p>
      <h1 className="page-title">Minimal FPGA board</h1>
      <p className="page-lede">
        You now know <em>what</em> lives inside the <strong>FPGA fabric</strong> — the programmable LUT, flip-flop,
        routing, and RAM mesh on the die. The next question is <em>how that fabric becomes your design on power-up</em>{' '}
        — which is always a board-level story involving a clock, configuration storage, and a debug pipe (often{' '}
        <strong>JTAG</strong>, the standardized test pins that let tools stream a bitstream or talk to debug logic).
      </p>

      <BitstreamBootDiagram />

      <SectionConnector>
        The lab below abstracts the <strong>five-way handshake</strong> between those actors. After you can narrate
        this order, memory chapters make more sense — FPGAs constantly talk to SRAM, DRAM, and flash in real systems.
      </SectionConnector>

      <div className="card">
        <div className="prose-block">
          <p>
            <strong>Serial Peripheral Interface (SPI)</strong> is a four-wire master/slave bus: serial clock (SCLK),
            master-out-slave-in (MOSI), master-in-slave-out (MISO), and an active-low chip select per slave.{' '}
            <strong>Quad SPI (QSPI)</strong> reuses data pins for four parallel lines during read bursts so configuration
            flash can feed the FPGA faster at boot.
          </p>
          <p>
            <strong>JTAG</strong> (from the <strong>Joint Test Action Group</strong> that standardized it) is not a
            memory bus: it is a <em>serial test interface</em> — a small set of pins (TCK, TMS, TDI, TDO, …) that walk an
            on-chip state machine so bits can be shifted through <strong>boundary-scan</strong> cells at the pins for
            factory test, and so lab software can reuse the same plumbing to program the device or attach an on-chip
            logic analyzer (<strong>ILA</strong>) during development.
          </p>
          <p>
            Real boards add low-dropout regulators (<strong>LDOs</strong>), DC–DC converters, level shifters, strapping
            resistors for configuration mode, and <strong>signal integrity (SI)</strong> work on fast lines. This toy
            abstracts that stack to five conceptual blocks so the ordering story is clear.
          </p>
        </div>
      </div>

      <FPGASystemBuilder />

      <h2 className="section-title">Why this order?</h2>
      <div className="card">
        <ul className="prose-list">
          <li>
            <strong>Clock oscillator:</strong> crystal or packaged oscillator gives a stable reference; power-on reset
            and configuration engines wait for valid frequency and amplitude before trusting timing.
          </li>
          <li>
            <strong>Configuration flash:</strong> holds the golden FPGA image; SPI/QSPI is typical. JTAG can still
            inject a bitstream during lab even if flash is blank or corrupted.
          </li>
          <li>
            <strong>FPGA silicon:</strong> the programmable fabric and I/O banks — the object all the other pieces serve
            until your design owns the pins.
          </li>
          <li>
            <strong>JTAG / debug:</strong> boundary scan, programming headers, and vendor debug cores — your safety net
            for bring-up.
          </li>
          <li>
            <strong>Optional DRAM:</strong> not every glue FPGA needs external RAM; soft CPUs, packet buffers, and
            video pipelines often add <strong>synchronous DRAM (SDRAM)</strong> or DDR variants with a hardened
            controller.
          </li>
        </ul>
      </div>

      <SectionConnector>
        With FPGA configuration understood, compare that mental model to <strong>systems on chip (SoCs)</strong> and{' '}
        <strong>microprocessors</strong> — then continue to <strong>memory</strong>, because every board mixes SRAM,
        DRAM, and flash regardless of which silicon does the thinking.
      </SectionConnector>

      <p>
        <Link to="/fpga/soc">Next: SoC vs FPGA &amp; processors →</Link>
      </p>
    </>
  )
}
