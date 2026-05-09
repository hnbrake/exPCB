import { Link } from 'react-router-dom'
import { HeroArtFrame } from '../../components/HeroArtFrame'
import { MemoryIllustration } from '../../components/art/MemoryIllustration'
import { MemoryLatencyDiagram } from '../../components/diagrams/MemoryLatencyDiagram'
import { ScrollReveal } from '../../components/ScrollReveal'
import { SectionConnector } from '../../components/SectionConnector'

export function MemoryHub() {
  return (
    <>
      <section className="hero hero--hub">
        <div>
          <p className="hero__eyebrow">Deep track</p>
          <h1 className="hero__title">
            Memory
            <span className="emoji-after" aria-hidden>
              📦
            </span>
          </h1>
          <p className="hero__lede">
            Memory is not one technology — it is a menu. <strong>Volatile</strong> parts lose data at power-off;{' '}
            <strong>nonvolatile (NV)</strong> parts retain charge or polarization for years. Designers trade random
            access latency, erase block size, cost per bit, write endurance, and interface complexity.
          </p>
          <div className="prose-block" style={{ marginTop: '1rem' }}>
            <p>
              <strong>Static RAM (SRAM)</strong> uses a six-transistor (6T) cell for stable cross-coupled inverters;{' '}
              <strong>dynamic RAM (DRAM)</strong> stores charge on a capacitor addressed by a single access transistor
              and must be refreshed. <strong>NOR flash</strong> (Not OR topology) offers fine random reads for
              execute-in-place boot; <strong>NAND flash</strong> wins cost per gigabyte for bulk storage but prefers
              page-oriented access.
            </p>
          </div>
        </div>
        <HeroArtFrame intensity={0.05}>
          <MemoryIllustration />
        </HeroArtFrame>
      </section>

      <MemoryLatencyDiagram />

      <SectionConnector>
        The bars are <strong>qualitative</strong> — real numbers come from datasheets — but the ordering is always the
        same: registers and on-chip SRAM sit closest to the logic that needs nanosecond access; bulk NAND sits at the
        far end of the latency/capacity trade.
      </SectionConnector>

      <div className="grid-cards">
        <ScrollReveal>
          <Link to="/memory/deep" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Deep read</div>
              <h2 className="card__title">Technologies compared</h2>
              <p className="card__desc">
                A table plus narrative on cells, interfaces, and where each technology lands next to a microcontroller
                (MCU), FPGA, or system-on-chip (SoC).
              </p>
            </article>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Link to="/memory/match" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Guided demo</div>
              <h2 className="card__title">Match chips to jobs</h2>
              <p className="card__desc">
                Place <strong>EEPROM</strong> (electrically erasable programmable read-only memory), NOR/NAND flash,
                SRAM, DRAM, and <strong>FRAM</strong> (ferroelectric RAM) into realistic system roles.
              </p>
            </article>
          </Link>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <h2 className="section-title">More vocabulary you will see</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              <strong>One-time programmable (OTP)</strong> memory is mask or fuse style — cheap and tamper-evident but
              not rewriteable. <strong>Magnetoresistive RAM (MRAM)</strong> and <strong>phase-change memory (PCM)</strong>{' '}
              aim for nonvolatile density with RAM-like behavior; they show up in niche SoCs and research parts.
            </p>
            <p>
              <strong>Retention</strong> is how long a cell keeps its state at temperature; <strong>endurance</strong>{' '}
              is how many program/erase cycles it survives. Flash controllers wear-level to spread writes;{' '}
              <strong>electrically erasable programmable ROM (EEPROM)</strong> and FRAM relax different constraints at
              different costs.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SectionConnector>
        Next, read the <strong>technology table</strong> for cell-level intuition — then the <strong>match lab</strong>{' '}
        forces you to apply that intuition to system roles.
      </SectionConnector>

      <p>
        <Link to="/memory/deep">Next: memory technologies →</Link>
      </p>
    </>
  )
}
