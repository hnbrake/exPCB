import { Link } from 'react-router-dom'
import { AttributedFigure } from '../components/AttributedFigure'
import { HeroArtFrame } from '../components/HeroArtFrame'
import { LearningPathOverview } from '../components/diagrams/LearningPathOverview'
import { ScrollReveal } from '../components/ScrollReveal'
import { SectionConnector } from '../components/SectionConnector'
import { StripeSection } from '../components/StripeSection'

const cards: {
  to: string
  label: string
  title: string
  desc: string
  light?: boolean
  swatch: 'fpga' | 'memory' | 'circuits' | 'power' | 'protocols'
}[] = [
  {
    to: '/fpga',
    label: 'Deep track',
    title: 'FPGAs',
    swatch: 'fpga',
    desc: 'Lookup tables (LUTs), flip-flops, block RAM (BRAM), configuration over Serial Peripheral Interface (SPI) flash, a guided block builder, and a comparison of FPGAs with systems on chip (SoCs) and microprocessors / microcontrollers.',
  },
  {
    to: '/memory',
    label: 'Deep track',
    title: 'Memory',
    swatch: 'memory',
    desc: 'Static RAM (SRAM), dynamic RAM (DRAM), NOR vs NAND flash, electrically erasable programmable ROM (EEPROM), ferroelectric RAM (FRAM) — where each shines, plus a drag-and-match lab.',
  },
  {
    to: '/circuits',
    label: 'Deep track',
    title: 'Circuit components',
    swatch: 'circuits',
    desc: 'Metal-oxide-semiconductor field-effect transistor (MOSFET) curves, complementary MOS (CMOS) switching, and passives — visuals tied to real schematic roles.',
  },
  {
    to: '/light/power',
    label: 'Light read',
    title: 'Power path',
    desc: 'Low-dropout linear regulators (LDOs) vs switching converters, input/output headroom, and why decoupling capacitors crowd every high-speed board.',
    light: true,
    swatch: 'power',
  },
  {
    to: '/light/protocols',
    label: 'Light read',
    title: 'Protocols at a glance',
    desc: 'Serial Peripheral Interface (SPI) and Inter-Integrated Circuit (I²C or I2C) for everyday peripherals, plus JTAG (Joint Test Action Group / IEEE 1149.1) — the small test-and-debug port that shifts bits through the chip for programming and lab work.',
    light: true,
    swatch: 'protocols',
  },
]

export function Home() {
  return (
    <>
      <section className="hero hero--home home-hero-flow">
        <div>
          <p className="hero__eyebrow">exPCB · learn · build intuition</p>
          <h1 className="hero__title">
            Silicon playground
            <span className="emoji-after" aria-hidden>
              🧩
            </span>
          </h1>
          <p className="hero__lede">
            A <strong style={{ color: 'var(--text)' }}>field-programmable gate array (FPGA)</strong> is logic you
            rewire after the part is built. <strong style={{ color: 'var(--text)' }}>Static RAM (SRAM)</strong> and{' '}
            <strong style={{ color: 'var(--text)' }}>flash</strong> are almost always nearby on a real design. This site
            walks the same stack—fabric, memory, devices, power, buses—with diagrams and small demos you can use on a
            phone or a laptop.
          </p>
          <SectionConnector>
            <strong>Recommended order:</strong> FPGA fabric and <strong>bitstream</strong> boot, then{' '}
            <strong>memory</strong> (volatile vs retained), then <strong>devices & passives</strong>, then{' '}
            <strong>rails and buses</strong>. Each page links forward at the bottom.
          </SectionConnector>
        </div>
        <HeroArtFrame intensity={0.055}>
          <AttributedFigure
            className="attributed-figure--hero"
            src="/diagrams/computer-circuit-board-cc0.svg"
            alt="Stylized circuit board with traces, pads, and component outlines"
            title="Example board"
            credit={{
              attribution: 'Gordon Johnson / Pixabay (Commons upload by Shehrozkaleem)',
              sourceUrl: 'https://commons.wikimedia.org/wiki/File:Computer_Circuit_Board_Skelton.svg',
              license: 'CC0 1.0',
              licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/deed.en',
            }}
          />
        </HeroArtFrame>
      </section>

      <ScrollReveal className="home-secondary-figure">
        <AttributedFigure
          className="attributed-figure--reference"
          src="/diagrams/fritzing-example-pcb.svg"
          alt="PCB layout view of a small Fritzing example circuit with traces and footprints"
          title="Example layout"
          caption="Copper, holes, and footprints—the view you sanity-check before sending a board out."
          credit={{
            attribution: 'Fritzing project (Commons upload by Wlanowski)',
            sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fritzing-pcb.svg',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.en',
          }}
        />
      </ScrollReveal>

      <StripeSection band="aurora" className="home-aurora-band" innerClassName="home-stripe-pick">
        <div className="home-pick-intro">
          <ScrollReveal>
            <h2 className="section-title section-title--home-wavy" style={{ marginTop: 0 }}>
              Pick a track
              <span className="emoji-after" aria-hidden>
                ↘
              </span>
            </h2>
            <p className="page-lede home-pick-lede" style={{ marginBottom: '1rem' }}>
              Each area pairs reading with something you can manipulate — drag, tap, or slide — so the acronym soup in
              datasheets starts to map to motion and diagrams.
            </p>
            <LearningPathOverview />
          </ScrollReveal>
        </div>
        <div className="grid-cards home-bento">
          {cards.map((c, i) => (
            <ScrollReveal key={c.to} delay={i * 70}>
              <Link to={c.to} className="topic-link">
                <article className={`card card--interactive card--swatch card--swatch-${c.swatch}`}>
                  {c.light ? (
                    <span className="badge badge--warm">{c.label}</span>
                  ) : (
                    <div className="card__label">{c.label}</div>
                  )}
                  <h2 className="card__title">{c.title}</h2>
                  <p className="card__desc">{c.desc}</p>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </StripeSection>

      <ScrollReveal>
        <div className="card card--inset home-inset-tilt">
          <h2 className="section-title section-title--on-dark">
            How to explore
            <span className="emoji-after" aria-hidden>
              👆
            </span>
          </h2>
          <div className="prose-block prose-block--on-dark">
            <p>
              Open a chapter, then try the demo. On touch devices you can <strong>drag</strong> pieces or use{' '}
              <strong>tap-to-pick, tap-to-drop</strong> where noted.
            </p>
            <p>
              <strong>Simulation Program with Integrated Circuit Emphasis (SPICE)</strong> is the industry standard for
              transistor-level simulation; these pages are deliberately <em>not</em> SPICE-accurate — they trade
              exactness for intuition you can absorb on a commute.
            </p>
            <p>
              Several chapters end with a <strong>Sources</strong> box: short excerpts tied to primary manuals and
              standards (IEEE, JEDEC, vendor architecture guides, TI / Analog Devices power notes, and CMOS textbook
              material), with links that open in a new tab.
            </p>
            <p>
              When you are ready, use <strong>“FPGA overview →”</strong> in the trail below — it is the recommended
              first stop after this home page.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <StripeSection band="twilight" innerClassName="home-stripe-twilight">
        <ScrollReveal>
          <h2 className="section-title section-title--home-slant" style={{ marginTop: 0 }}>
            What you get here
            <span className="emoji-after" aria-hidden>
              ✨
            </span>
          </h2>
          <p className="page-lede" style={{ marginBottom: '1.25rem' }}>
            Short reads and moving diagrams — enough structure to recognize real boards and datasheets, without pretending
            to replace bench time or a full simulator.
          </p>
          <div className="home-feature-scatter">
            <div className="home-feature-scatter__item">
              <h3>Hands-on demos</h3>
              <p>Drag, tap, and sliders that tie jargon to something you can manipulate on a phone or laptop.</p>
            </div>
            <div className="home-feature-scatter__item">
              <h3>Sources, not vibes</h3>
              <p>
                Chapters point to manuals and standards when it matters — vendor guides, JEDEC, IEEE, and textbook-level
                CMOS context.
              </p>
            </div>
            <div className="home-feature-scatter__item">
              <h3>Intuition first</h3>
              <p>
                These pages are deliberately <em>not</em> SPICE — they trade exact curves for a clear mental model you
                can carry onto the next page.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </StripeSection>

      <StripeSection band="midnight" className="home-midnight-band" innerClassName="home-stripe-midnight">
        <ScrollReveal>
          <h2 className="section-title section-title--home-slant section-title--home-slant-alt" style={{ marginTop: 0 }}>
            When to reach for it
            <span className="emoji-after" aria-hidden>
              ⏱
            </span>
          </h2>
          <p className="page-lede" style={{ marginBottom: '1.25rem' }}>
            A few minutes between meetings, on the bus, or before you open a new reference design — skim a chapter, run
            the demo once, then go deeper on the bench when you need numbers.
          </p>
          <div className="home-split home-split--editorial">
            <div className="home-split__block">
              <h3>Try this if you…</h3>
              <ul>
                <li>Keep mixing up volatile vs non-volatile memory on the block diagram.</li>
                <li>Want a picture of LUTs, carry chains, or how configuration loads at boot.</li>
                <li>Need a gentle on-ramp before vendor architecture PDFs.</li>
              </ul>
            </div>
            <div className="home-split__block">
              <h3>Trail order</h3>
              <ul>
                <li>
                  <strong>FPGA</strong> → fabric and bitstream, then{' '}
                  <strong>memory</strong> → retention and hierarchy.
                </li>
                <li>
                  <strong>Circuits</strong> for devices and passives, then <strong>power</strong> and{' '}
                  <strong>protocols</strong> for rails and buses.
                </li>
                <li>Each page nudges you to the next at the bottom.</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </StripeSection>

      <StripeSection band="ink" className="home-ink-band" innerClassName="home-stripe-ink">
        <div className="home-ink-stage">
          <span className="home-ink-orb" aria-hidden />
          <span className="home-ink-arc" aria-hidden />
          <ScrollReveal>
            <p className="home-ink__eyebrow">exPCB</p>
            <h2 className="home-ink__title">Build the picture in your head</h2>
            <p className="home-ink__lede">
              Start where the programmable fabric meets flash and SRAM — then follow the trail through memory, devices,
              power, and buses.
            </p>
            <hr className="home-ink__rule" />
            <Link to="/fpga" className="home-cta">
              Start with the FPGA track
              <span aria-hidden> →</span>
            </Link>
          </ScrollReveal>
        </div>
      </StripeSection>
    </>
  )
}
