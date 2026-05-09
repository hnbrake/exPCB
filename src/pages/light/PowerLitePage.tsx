import { Link } from 'react-router-dom'
import { PcbStripIllustration } from '../../components/art/PcbStripIllustration'
import { Cite, CitedSources } from '../../components/CitedSources'
import { LdoVsBuckDiagram } from '../../components/diagrams/LdoVsBuckDiagram'
import { POWER_CITATIONS, REFERENCES_RETRIEVED } from '../../content/references'
import { SectionConnector } from '../../components/SectionConnector'

export function PowerLitePage() {
  return (
    <>
      <p className="page-back">
        <Link to="/">← Home</Link>
      </p>
      <span className="badge badge--warm">Light read</span>
      <h1 className="page-title">
        Power path
        <span className="emoji-after" aria-hidden>
          💡
        </span>
      </h1>
      <p className="page-lede">
        Almost every board takes a messy input — battery, USB bus voltage, barrel jack — and produces one or more
        regulated rails for digital cores, analog front ends, and I/O banks. The two dominant building blocks are
        linear regulators and switching converters.
      </p>

      <PcbStripIllustration variant="power" />

      <LdoVsBuckDiagram />

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>What vendor literature emphasizes</h2>
        <div className="prose-block">
          <p>
            TI’s LDO application literature formalizes the vocabulary you will see on every linear-regulator datasheet:
            <strong> dropout</strong> as the minimum headroom (V<sub>in</sub> − V<sub>out</sub>) where regulation still
            holds, <strong>quiescent / ground current</strong> for the regulator’s own bias, and figures of merit such
            as line and load regulation and power supply rejection — the bridge between “burns the extra volts as heat”
            and numbers you can budget.
            <Cite id="cite-ti-slva079" n={1} />
          </p>
          <p style={{ marginBottom: 0 }}>
            Analog Devices’ step-down (buck) overview stresses the switched-inductor loop: energy is stored in the
            magnetics and delivered through the output capacitor each cycle, which is why well-designed bucks trade
            control complexity and conducted EMI for efficiency that a linear pass device cannot match when V<sub>in</sub>
            ≫ V<sub>out</sub>.
            <Cite id="cite-adi-buck" n={2} />
          </p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>
          Low-dropout linear (LDO) vs buck (step-down) switching regulators
        </h2>
        <div className="prose-block">
          <p>
            A <strong>low-dropout linear regulator (LDO)</strong> uses a pass transistor controlled in a feedback loop
            so that output voltage tracks a reference. Excess voltage from input to output (V<sub>in</sub> − V<sub>out</sub>)
            times load current is dissipated as heat — quiet, simple, excellent ripple rejection on the output, but
            inefficient when the drop is large.
          </p>
          <p>
            A <strong>buck (step-down) switching converter</strong> chops input voltage through an inductor and
            output capacitor network, storing and releasing energy each cycle. Efficiency can be high, but you accept
            switching ripple, magnetics, compensation network design, and electromagnetic compatibility (EMC) work that
            linear regulators mostly avoid.
          </p>
        </div>
      </div>

      <SectionConnector>
        The cartoon exaggerates the difference: LDOs <strong>burn headroom as heat</strong>; bucks <strong>swap energy
        through an inductor</strong> each cycle. The next cards spell out the datasheet vocabulary that turns that
        cartoon into pass/fail margins.
      </SectionConnector>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>Headroom, dropout, & quiescent current</h2>
        <div className="prose-block">
          <p>
            <strong>Dropout voltage</strong> is the minimum (V<sub>in</sub> − V<sub>out</sub>) at rated load where the
            LDO still regulates. <strong>Headroom</strong> is the extra margin you leave for line transients, IR drops
            in traces, and battery sag. If V<sub>in</sub> falls below required headroom, the output droops even though
            nominal schematic values looked fine.
          </p>
          <p>
            <strong>I<sub>q</sub></strong> (quiescent current) matters in battery gadgets — it is the current the
            regulator consumes to run its own bandgap and error amplifier even when the load is zero.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>Decoupling & power distribution</h2>
        <div className="prose-block">
          <p>
            Fast digital parts draw current spikes with nanosecond edges. A <strong>decoupling capacitor</strong> is a
            local energy reservoir placed with minimal loop inductance to supply that charge until the power plane and
            upstream regulator respond. That is why dense <strong>0402</strong> (0.04 × 0.02 inch) ceramic capacitors
            carpet FPGAs and DRAM — not decoration, but controlled loop inductance physics.
          </p>
          <p>
            Real designs also worry about bulk capacitance, series resistance in capacitors (ESR), and layout symmetry
            so ground bounce and simultaneous switching noise stay bounded — topics for a dedicated power integrity
            chapter later.
          </p>
          <p style={{ marginBottom: 0 }}>
            High-speed layout guides from the same analog ecosystem argue in the same direction: parallel small
            capacitors with tight loops <strong>shape power-delivery impedance</strong> at high frequency, while a
            continuous ground reference gives switching currents a predictable return path — the board-level partner to
            the on-die CMOS current spikes you read about in logic chapters.
            <Cite id="cite-adi-pcb-layout" n={3} />
          </p>
        </div>
      </div>

      <CitedSources retrieved={REFERENCES_RETRIEVED} citations={POWER_CITATIONS} />

      <p>
        <Link to="/light/protocols">Next: protocols at a glance →</Link>
      </p>
    </>
  )
}
