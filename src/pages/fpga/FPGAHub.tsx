import { Link } from 'react-router-dom'
import { HeroArtFrame } from '../../components/HeroArtFrame'
import { FPGAIllustration } from '../../components/art/FPGAIllustration'
import { BitstreamBootDiagram } from '../../components/diagrams/BitstreamBootDiagram'
import { ScrollReveal } from '../../components/ScrollReveal'
import { SectionConnector } from '../../components/SectionConnector'

export function FPGAHub() {
  return (
    <>
      <section className="hero hero--hub">
        <div>
          <p className="hero__eyebrow">Deep track</p>
          <h1 className="hero__title">
            FPGAs
            <span className="emoji-after" aria-hidden>
              ⚡
            </span>
          </h1>
          <p className="hero__lede">
            A <strong style={{ color: 'var(--text)' }}>field-programmable gate array (FPGA)</strong> is an array of
            configurable logic, routing, and on-chip memory that you personalize by loading a{' '}
            <strong style={{ color: 'var(--text)' }}>bitstream</strong> — a binary file that programs lookup tables
            (LUTs), flip-flops, and interconnect. Unlike a microprocessor with a fixed instruction set, you decide the
            parallel data paths.
          </p>
          <div className="prose-block" style={{ marginTop: '1rem' }}>
            <p>
              That configurable mesh on the die — LUTs, flip-flops, routing, on-chip RAM — is what people mean by the{' '}
              <strong>FPGA fabric</strong> (as opposed to the package pins or big hard IP you drop in as a block).
            </p>
            <p>
              Vendor tools map your <strong>hardware description language (HDL)</strong> — typically Verilog or
              VHDL — onto those resources. After place-and-route, static timing analysis checks that every signal
              meets <strong>setup</strong> and <strong>hold</strong> requirements relative to its clock.
            </p>
          </div>
        </div>
        <HeroArtFrame intensity={0.05}>
          <FPGAIllustration />
        </HeroArtFrame>
      </section>

      <BitstreamBootDiagram />

      <SectionConnector>
        <strong>Read order:</strong> <strong>Fabric</strong> (LUT/FF/RAM tiles), <strong>System builder</strong> (boot
        chain into fabric), then <strong>SoC vs FPGA &amp; processors</strong> so “programmable” does not get confused with
        “runs Linux on a vendor core.”
      </SectionConnector>

      <div className="grid-cards grid-cards--tri">
        <ScrollReveal>
          <Link to="/fpga/fabric" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Read + diagram</div>
              <h2 className="card__title">Fabric & memory inside</h2>
              <p className="card__desc">
                <strong>Fabric</strong> = the programmable logic-and-routing grid on the chip. How{' '}
                <strong>lookup tables (LUTs)</strong> implement truth tables, how <strong>flip-flops (FFs)</strong> store
                state, how <strong>carry chains</strong> speed math, and how <strong>block RAM (BRAM)</strong> differs
                from <strong>distributed RAM</strong> built from leftover LUT memory.
              </p>
            </article>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Link to="/fpga/system" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Guided demo</div>
              <h2 className="card__title">Minimal system builder</h2>
              <p className="card__desc">
                Order clock source, <strong>Serial Peripheral Interface (SPI)</strong> or{' '}
                <strong>Quad SPI (QSPI)</strong> configuration flash, the FPGA die, a{' '}
                <strong>Joint Test Action Group (JTAG)</strong> header (standard test/debug pins used to program and
                probe the chip), and optional <strong>dynamic RAM (DRAM)</strong> the way a bring-up story usually
                unfolds.
              </p>
            </article>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <Link to="/fpga/soc" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Read + diagram</div>
              <h2 className="card__title">SoC vs FPGA vs processor</h2>
              <p className="card__desc">
                What a <strong>system on a chip (SoC)</strong> integrates, how that differs from{' '}
                <strong>FPGA fabric</strong>, and how both relate to <strong>microprocessors</strong> and{' '}
                <strong>microcontrollers (MCUs)</strong> — including when real products blend all three.
              </p>
            </article>
          </Link>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <h2 className="section-title">At a glance</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              <strong>Configurable logic blocks (CLBs)</strong> (vendor naming varies) pack LUTs, registers, and
              local routing: they are the repeating tile you feel when you visualize “fabric.” Beside that mesh,
              <strong>PLL</strong> / <strong>MMCM</strong> blocks synthesize clocks from a reference, and{' '}
              <strong>high-speed transceivers</strong> (SerDes) drive multi-gigabit serial lanes — see the fabric page
              for a longer treatment.
            </p>
            <p>
              Most boards store the golden bitstream in external <strong>NOR flash</strong> (often over SPI/QSPI)
              so the FPGA can self-load at power-on. <strong>JTAG</strong> (IEEE 1149.1 boundary scan) is a separate,
              standardized <em>test and debug port</em> — usually four or five pins — that shifts bits through an
              on-chip chain so tools can program logic, inspect pins, and attach debug features even when flash boot is
              broken.
            </p>
            <p>
              When clocks differ between subsystems you cross a <strong>clock domain crossing (CDC)</strong>: you
              synchronize control signals (typically with flip-flop chains) so metastability risk stays bounded — a
              whole branch of digital hygiene beyond this short overview.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <p>
        <Link to="/fpga/fabric">Start here: inside the fabric →</Link>
      </p>
      <p>
        <Link to="/fpga/soc">Or jump ahead: SoC vs FPGA &amp; processors →</Link>
      </p>
    </>
  )
}
