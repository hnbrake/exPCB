import { Link } from 'react-router-dom'
import { PcbStripIllustration } from '../../components/art/PcbStripIllustration'
import { PassivesExplorer } from '../../components/demos/PassivesExplorer'
import { RlcTopologyDiagram } from '../../components/diagrams/RlcTopologyDiagram'
import { SectionConnector } from '../../components/SectionConnector'

export function PassivesPage() {
  return (
    <>
      <p className="page-back">
        <Link to="/circuits">← Circuits hub</Link>
      </p>
      <h1 className="page-title">Passives</h1>
      <p className="page-lede">
        <strong>Resistors (R)</strong>, <strong>capacitors (C)</strong>, and <strong>inductors (L)</strong> are called
        passive because they do not provide power gain. Yet they set time constants, store energy, filter noise, and
        define stability margins in every power supply and analog interface.
      </p>

      <PcbStripIllustration variant="passives" />

      <RlcTopologyDiagram />

      <div className="card">
        <div className="prose-block">
          <p>
            <strong>Ohm’s law</strong> relates voltage, current, and resistance on a resistor; in AC steady state,
            phasors extend the idea with reactance from capacitors (impedance decreases with frequency) and inductors
            (impedance increases with frequency). Together they create poles and zeros that shape gain and phase.
          </p>
          <p>
            <strong>Multi-layer ceramic capacitors (MLCCs)</strong> dominate high-frequency decoupling because their
            low equivalent series resistance (ESR) and small package inductance let them source charge quickly — but
            their capacitance drops with applied DC bias and temperature, so a “10 µF” part is not always 10 µF in
            circuit.
          </p>
          <p>
            <strong>Ferrite beads</strong> are lossy at high frequency: they look partly resistive so they damp ringing
            on clocks and supply rails without behaving like ideal inductors at all frequencies — read Z vs f curves
            before substituting them for real inductors in filters.
          </p>
        </div>
      </div>

      <SectionConnector>
        The sketch shows how <strong>R</strong> sets damping, <strong>C</strong> stores electric field energy, and{' '}
        <strong>L</strong> stores magnetic energy — the explorer below lets you feel those tradeoffs in a toy circuit.
      </SectionConnector>

      <PassivesExplorer />

      <p>
        <Link to="/light/power">Next: power path (LDO vs buck) →</Link>
      </p>
    </>
  )
}
