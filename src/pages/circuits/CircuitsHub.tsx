import { Link } from 'react-router-dom'
import { HeroArtFrame } from '../../components/HeroArtFrame'
import { CircuitsIllustration } from '../../components/art/CircuitsIllustration'
import { DeviceFamiliesDiagram } from '../../components/diagrams/DeviceFamiliesDiagram'
import { ScrollReveal } from '../../components/ScrollReveal'
import { SectionConnector } from '../../components/SectionConnector'

const mention: { title: string; body: string }[] = [
  {
    title: 'Diodes',
    body: 'Including electrostatic discharge (ESD) clamps, Schottky OR-ing, and voltage references — one PN junction, many jobs.',
  },
  {
    title: 'Bipolar junction transistors (BJTs)',
    body: 'Still common in linear regulators, bandgaps, and some discrete level shifters — current-controlled devices with well-defined exponential behavior.',
  },
  {
    title: 'Metal-oxide-semiconductor FETs (MOSFETs)',
    body: 'Voltage-controlled switches: enhancement-mode devices dominate digital CMOS; power MOSFETs handle amps with on-resistance (RDS(on)) specs.',
  },
  {
    title: 'Resistors',
    body: 'Set ratios, limit current, terminate transmission lines, and sense current as shunt elements — tolerance and temperature coefficient matter.',
  },
  {
    title: 'Capacitors',
    body: 'Bulk electrolytics for energy storage, multi-layer ceramic capacitors (MLCCs) for high-frequency decoupling — watch DC bias derating and equivalent series resistance (ESR).',
  },
  {
    title: 'Inductors & ferrite beads',
    body: 'Store energy in magnetics for DC–DC conversion; ferrite beads behave resistive at radio frequencies to eat electromagnetic interference (EMI).',
  },
  {
    title: 'Crystals & oscillators',
    body: 'Provide a stable timebase: pierce oscillators with quartz crystals or packaged oscillator modules (XO, TCXO, OCXO) depending on stability needs.',
  },
]

export function CircuitsHub() {
  return (
    <>
      <section className="hero hero--hub">
        <div>
          <p className="hero__eyebrow">Deep track</p>
          <h1 className="hero__title">
            Circuit components
            <span className="emoji-after" aria-hidden>
              🔌
            </span>
          </h1>
          <p className="hero__lede">
            Discrete and integrated devices obey the same physics — fields, charge, and material limits — but
            datasheets present them as checklists of parameters. These chapters connect symbols on the page to how
            engineers actually specify and combine parts.
          </p>
          <div className="prose-block" style={{ marginTop: '1rem' }}>
            <p>
              <strong>Complementary metal-oxide-semiconductor (CMOS)</strong> pairs n-channel and p-channel MOSFETs so
              that in steady state one device is off, cutting static current. That idea scales from an inverter to
              billions of gates inside a processor or the programmable <strong>FPGA fabric</strong> (the LUT/routing
              mesh on the die).
            </p>
          </div>
        </div>
        <HeroArtFrame intensity={0.05}>
          <CircuitsIllustration />
        </HeroArtFrame>
      </section>

      <DeviceFamiliesDiagram />

      <SectionConnector>
        <strong>Suggested path:</strong> start with the <strong>MOSFET</strong> curve (how a field turns a channel on),
        then the <strong>CMOS inverter</strong> (how complementary pairs avoid static fight), then <strong>R · L · C</strong>{' '}
        (how passives shape every rail and signal edge).
      </SectionConnector>

      <div className="grid-cards grid-cards--tri">
        <ScrollReveal>
          <Link to="/circuits/mosfet" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Interactive</div>
              <h2 className="card__title">MOSFET intuition</h2>
              <p className="card__desc">
                Gate-to-source (V<sub>GS</sub>) and drain-to-source (V<sub>DS</sub>) versus drain current (I<sub>d</sub>)
                — a toy curve, not a foundry model.
              </p>
            </article>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={70}>
          <Link to="/circuits/cmos" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Interactive</div>
              <h2 className="card__title">CMOS inverter</h2>
              <p className="card__desc">
                See how complementary devices steer current so the output rail is either supply (VDD) or ground (GND)
                without a resistive fight in steady state.
              </p>
            </article>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <Link to="/circuits/passives" className="topic-link">
            <article className="card card--interactive">
              <div className="card__label">Interactive</div>
              <h2 className="card__title">R · L · C playground</h2>
              <p className="card__desc">
                Resistance (R), inductance (L), and capacitance (C) shape filters and power delivery — start with a
                simple RC low-pass intuition.
              </p>
            </article>
          </Link>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <h2 className="section-title">Parts you will meet on schematics</h2>
        <div className="card">
          <ul className="prose-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
            {mention.map((m) => (
              <li key={m.title} style={{ marginBottom: '0.85rem' }}>
                <strong style={{ color: 'var(--text)' }}>{m.title}:</strong> {m.body}
              </li>
            ))}
          </ul>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--step--1)' }}>
            Later chapters could add diode drops, BJT operating quadrants, and ferrite impedance vs frequency — same
            shell, richer models.
          </p>
        </div>
      </ScrollReveal>

      <p>
        <Link to="/circuits/mosfet">Start here: MOSFET playground →</Link>
      </p>
    </>
  )
}
