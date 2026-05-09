import { Link } from 'react-router-dom'
import { Cite, CitedSources } from '../../components/CitedSources'
import { HeroArtFrame } from '../../components/HeroArtFrame'
import { FPGAIllustration } from '../../components/art/FPGAIllustration'
import { AttributedFigure } from '../../components/AttributedFigure'
import { BitstreamBootDiagram } from '../../components/diagrams/BitstreamBootDiagram'
import { FABRIC_CITATIONS, REFERENCES_RETRIEVED } from '../../content/references'
import { ScrollReveal } from '../../components/ScrollReveal'
import { SectionConnector } from '../../components/SectionConnector'

export function FabricPage() {
  return (
    <>
      <p className="page-back">
        <Link to="/fpga">← FPGA hub</Link>
      </p>
      <h1 className="page-title">Inside the fabric</h1>
      <p className="page-lede">
        <strong>FPGA fabric</strong> is informal shorthand for the <em>reprogrammable</em> part of the die: the grid of
        logic tiles, the programmable routing that wires them together, and the on-chip RAM blocks your bitstream
        configures. It does <em>not</em> mean the package, the I/O pads themselves, or large “hard” blocks (PLLs,
        transceivers, CPU cores) you mostly instantiate and parameterize rather than build from LUTs. Vendor FPGAs tile
        that fabric from <strong>configurable logic blocks (CLBs)</strong> (names differ: logic array blocks, adaptive
        logic modules, etc.), routing channels, and <strong>hard intellectual property (IP)</strong> macros such as
        serializers, PLLs, and memory controllers.
      </p>

      <BitstreamBootDiagram />

      <SectionConnector>
        The picture above is the <strong>outside-in story</strong>: nothing inside the LUT array matters until the
        bitstream has crossed from flash. Below we unpack what that configured fabric actually contains — lookup
        tables, registers, and RAM tiles.
      </SectionConnector>

      <HeroArtFrame intensity={0.04}>
        <FPGAIllustration />
      </HeroArtFrame>

      <ScrollReveal>
        <div className="card">
          <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>Lookup tables (LUTs)</h2>
          <div className="prose-block">
            <p>
              A <strong>lookup table (LUT)</strong> is a small SRAM whose address lines are driven by a handful of
              input signals; the stored bits are the truth table of a combinational function. Modern FPGAs often use
              6-input LUTs that can also be fractured into two smaller functions, which helps pack random glue logic
              densely.
            </p>
            <p>
              Chaining LUT outputs through dedicated carry logic (fast ripple paths) is how adders, counters, and wide
              arithmetic get speed without consuming general routing for every bit — vendors publish per-bit delay
              numbers so you can sanity-check your HDL before you trust the tool blindly.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={40}>
        <div className="card">
          <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>How this maps to real vendor silicon</h2>
          <div className="prose-block">
            <p>
              AMD’s architecture documentation for 7 Series parts describes the <strong>configurable logic block (CLB)</strong>{' '}
              as the repeating site that contains paired <strong>slices</strong>, each built from six-input LUTs,
              dedicated carry resources, and registers — the physical structures your place-and-route tool targets when
              it maps RTL onto “fabric.”
              <Cite id="cite-ug474" n={1} />
            </p>
            <p style={{ marginBottom: 0, color: 'var(--text-faint)', fontSize: 'var(--step--1)' }}>
              This site’s diagrams stay vendor-neutral; the PDF is useful when you want naming and tile structure straight
              from the architecture user guide.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SectionConnector>
        Once combinational clouds exist, <strong>sequential logic</strong> needs storage: flip-flops sample the world
        on clock edges — which immediately raises timing and clock-domain questions.
      </SectionConnector>

      <ScrollReveal delay={60}>
        <div className="card">
          <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>Flip-flops, clocks, & timing</h2>
          <div className="prose-block">
            <p>
              A <strong>flip-flop (FF)</strong> (or latch in some architectures) samples its input on a clock edge when
              clock enable and reset/preset conditions allow. <strong>Setup time</strong> is how long data must be
              stable <em>before</em> the clock edge; <strong>hold time</strong> is how long it must remain valid{' '}
              <em>after</em> the edge. Violating either risks metastability or wrong capture.
            </p>
            <p>
              When logic runs from different clock roots you implement <strong>clock domain crossing (CDC)</strong>{' '}
              discipline: synchronize single-bit control signals with two or more flip-flops, use gray codes for
              multi-bit counters crossing asynchronously, and avoid sampling wide buses without a FIFO protocol.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SectionConnector>
        Flip-flops need <strong>clocks</strong>; high-speed I/O needs <strong>serial links</strong>. Those jobs usually
        belong to dedicated tiles next to the fabric — not to LUTs you program by hand.
      </SectionConnector>

      <div className="diagram-reference-grid" role="group" aria-label="Reference diagrams: PLL and SerDes">
        <AttributedFigure
          src="/diagrams/phase-locked-loop-cc0.svg"
          alt="Block diagram of a phase-locked loop: phase comparator, loop filter, VCO, and feedback divider"
          title="Classic PLL signal flow"
          caption="Same feedback idea FPGA clocking tiles implement in silicon — compare phase, filter, steer a VCO, divide the output."
          credit={{
            attribution: 'Chetvorno',
            sourceUrl: 'https://commons.wikimedia.org/wiki/File:Phase_locked_loop.svg',
            license: 'CC0 1.0',
            licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
          }}
        />
        <AttributedFigure
          src="/diagrams/serdes-principle-by-sa.svg"
          alt="Serializer and deserializer blocks converting parallel data to a serial lane and back"
          title="SerDes principle"
          caption="Parallel words become a high-speed serial stream; the receiver expands them again — the core of FPGA transceiver lanes."
          credit={{
            attribution: 'Xinfe',
            sourceUrl: 'https://commons.wikimedia.org/wiki/File:SerDes_(Serializer_-_Deserializer).svg',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.en',
          }}
        />
      </div>

      <ScrollReveal delay={75}>
        <div className="card">
          <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>
            PLLs, MMCMs, and on-chip clocking
          </h2>
          <div className="prose-block">
            <p>
              A <strong>phase-locked loop (PLL)</strong> is a feedback circuit that locks an internal oscillator’s phase
              and frequency to a <strong>reference clock</strong> (often from a crystal or external oscillator). In
              FPGAs, PLL-like resources sit in <strong>clock management</strong> regions: they multiply and divide the
              reference to produce several <strong>related clocks</strong> (core logic, I/O, memory interfaces) while
              keeping known phase relationships — critical for meeting setup/hold across the chip.
            </p>
            <p>
              Vendors also ship <strong>MMCM</strong> (<strong>mixed-mode clock manager</strong>) and similar
              primitives that combine analog PLL behavior with extra digital control (fine phase shift, dynamic
              reconfiguration in some families). You rarely “draw” a PLL in LUTs; you <strong>instantiate</strong> a
              vendor primitive or let the IP wizard configure one, then constrain generated clocks in your timing
              constraints file (<strong>SDC</strong>-style <strong>synchronous design constraints</strong>).
              <Cite id="cite-ug472" n={2} />
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Jitter</strong> (short-term clock edge uncertainty) matters for SerDes line rates and for
              analog-adjacent blocks: PLL datasheets and clocking user guides quote phase noise and jitter budgets so you
              can compare whether a given reference and PLL configuration can feed, say, a 10&nbsp;Gbps line rate or a
              precise ADC sample clock.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={95}>
        <div className="card">
          <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>Serializers, deserializers, and transceivers</h2>
          <div className="prose-block">
            <p>
              A <strong>serializer</strong> turns a <strong>parallel</strong> word (many bits per clock) into a{' '}
              <strong>serial</strong> bit stream on one differential pair (or a few lanes), so you escape the pin-count
              and skew limits of wide parallel buses at multi-gigabit speeds. The companion <strong>deserializer</strong>{' '}
              recovers parallel data at the receiver. Together the pair is often called <strong>SerDes</strong>{' '}
              (serializer/deserializer).
              <Cite id="cite-serdes-mw" n={3} />
            </p>
            <p>
              Modern FPGAs implement SerDes inside <strong>high-speed transceiver</strong> tiles (vendor names differ:
              e.g. GTX, GTH, GTY, transceiver “channels”). Those hard blocks typically include{' '}
              <strong>transmit and receive equalization</strong>, <strong>clock and data recovery (CDR)</strong>, and
              sometimes a <strong>physical coding sublayer (PCS)</strong> for standards like{' '}
              <strong>PCI Express (PCIe)</strong>, <strong>Ethernet</strong>, or <strong>Interlaken</strong> — plus
              glue to the programmable fabric for custom protocols.
            </p>
            <p style={{ marginBottom: 0 }}>
              At the PCB level, each lane is a controlled-impedance <strong>differential pair</strong> with careful
              layout (length matching, return path, AC coupling caps where required). The serializer does not remove
              the need for solid <strong>power integrity</strong> and <strong>signal integrity</strong>; it concentrates
              bandwidth into fewer traces so the board must be honest about loss and crosstalk.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SectionConnector>
        LUTs and FFs answer “how does logic compute?” — <strong>on-chip memory tiles</strong> answer “where do FIFOs,
        buffers, and soft-processor stacks live?” That is the BRAM vs distributed-RAM split.
      </SectionConnector>

      <ScrollReveal delay={120}>
        <div className="card">
          <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>Block RAM vs distributed RAM vs off-chip DRAM</h2>
          <div className="prose-block">
            <p>
              <strong>Block RAM (BRAM)</strong> is dedicated dual-port (or simple-dual / true-dual depending on mode)
              SRAM inside the FPGA die — fixed width/depth tiles you instantiate or infer. It is ideal for FIFOs,
              small frame buffers, coefficient ROMs, and CPU scratch if you embed a soft core.
            </p>
            <p>
              <strong>Distributed RAM</strong> repurposes LUT SRAM as tiny async or sync RAM tables; it is wonderful
              for small register files but does not replace megabit-scale storage.
            </p>
            <p>
              <strong>Dynamic RAM (DRAM)</strong> — often synchronous DRAM (<strong>SDRAM</strong>) modules — usually
              lives off-chip next to large FPGAs or SoCs, accessed through a hardened memory controller and PHY. That
              pool is what people mean by “main memory,” distinct from BRAM inside the fabric.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SectionConnector>
        The island diagram is only <strong>topology</strong> — it helps you visualize routing pools between LUT
        clusters. The next page puts the same story into <strong>bring-up order</strong>: oscillator, config flash,
        silicon, debug, optional DRAM.
      </SectionConnector>

      <ScrollReveal>
        <div
          style={{
            borderRadius: 20,
            border: '1px solid var(--border)',
            padding: '1rem',
            background: 'var(--chart-bg)',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow)',
          }}
        >
          <svg viewBox="0 0 420 200" width="100%" style={{ maxHeight: 220 }} aria-label="Simplified fabric diagram">
            <defs>
              <linearGradient id="lutg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--text)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--text-muted)" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <text x="210" y="22" textAnchor="middle" fill="var(--text-muted)" fontSize="13" fontWeight="600">
              Simplified island-style routing fabric
            </text>
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={40 + col * 90}
                  y={44 + row * 46}
                  width="72"
                  height="34"
                  rx="6"
                  fill="url(#lutg)"
                  stroke="var(--border-strong)"
                />
              )),
            )}
            <text
              x="210"
              y="190"
              textAnchor="middle"
              fill="var(--text-faint)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              LUT tiles + switch boxes (conceptual, not vendor-specific)
            </text>
          </svg>
        </div>
      </ScrollReveal>

      <CitedSources retrieved={REFERENCES_RETRIEVED} citations={FABRIC_CITATIONS} />

      <p>
        <Link to="/fpga/system">Next: minimal system builder →</Link>
      </p>
    </>
  )
}
