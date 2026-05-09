import { Link } from 'react-router-dom'
import { Cite, CitedSources } from '../../components/CitedSources'
import { CMOSInverterDemo } from '../../components/demos/CMOSInverterDemo'
import { InverterTruthDiagram } from '../../components/diagrams/InverterTruthDiagram'
import { CMOS_CITATIONS, REFERENCES_RETRIEVED } from '../../content/references'
import { SectionConnector } from '../../components/SectionConnector'

export function CMOSPage() {
  return (
    <>
      <p className="page-back">
        <Link to="/circuits">← Circuits hub</Link>
      </p>
      <h1 className="page-title">CMOS switching</h1>
      <p className="page-lede">
        <strong>Complementary metal-oxide-semiconductor (CMOS)</strong> pairs an n-channel MOSFET (pull-down to
        ground) with a p-channel MOSFET (pull-up to the positive supply, historically called <strong>VDD</strong> for
        drain supply on MOS chips). The inverter is the simplest gate: output is the logical NOT of the input.
      </p>

      <InverterTruthDiagram />

      <div className="card">
        <div className="prose-block">
          <p>
            With a high input, the n-channel device is strongly on and the p-channel device is off, so the output sits
            near <strong>GND</strong> (ground). With a low input, the opposite happens and the output rises toward
            VDD. In steady state one branch is off, so there is no resistive path from supply to ground — that is why
            CMOS digital logic can idle at very low static power compared to older NMOS-only logic.
          </p>
          <p>
            During transitions both devices can be partially on briefly — that overlap causes <strong>dynamic power</strong>{' '}
            proportional to switching frequency, load capacitance, and supply voltage squared. Sharp edges also
            excite <strong>electromagnetic interference (EMI)</strong> and demand local decoupling capacitors to supply
            transient charge before board inductance starves the device.
          </p>
          <p>
            NAND and NOR gates extend the inverter idea with series/parallel transistor stacks; flip-flops add
            feedback and clocked elements — the entire digital IC industry is built from these patterns at scale.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 'var(--step-1)' }}>How references describe CMOS power</h2>
        <div className="prose-block">
          <p>
            Introductory CMOS chapters emphasize <strong>complementary</strong> drive: the same input steers the
            n-channel pull-down and p-channel pull-up so that, in a valid static 0 or 1, you do not keep a direct
            conducting path from supply to ground — which is why static CMOS families can idle with far lower DC
            current than older NMOS-dominated styles that relied on ratioed loads.
            <Cite id="cite-aac-cmos" n={1} />
          </p>
          <p>
            Those same lessons tie <strong>dynamic power</strong> to switching activity: every output transition moves
            charge on load capacitance and briefly overlaps the devices, so average supply current rises with clock
            rate — the same intuition behind counting toggles when estimating P<sub>dyn</sub> in larger blocks.
            <Cite id="cite-aac-cmos" n={1} />
          </p>
          <p style={{ marginBottom: 0 }}>
            Broader surveys of CMOS as a technology pair n-type and p-type MOSFETs on a shared oxide stack and connect
            that structure to how digital ICs scaled — useful when you zoom out from a single inverter to billions of
            gates in an FPGA fabric tile.
            <Cite id="cite-wiki-cmos" n={2} />
          </p>
        </div>
      </div>

      <SectionConnector>
        The interactive demo animates the <strong>same truth table</strong>: watch the pull-up and pull-down legs hand
        off so the output rail is always driven by exactly one strong path in steady state.
      </SectionConnector>

      <CMOSInverterDemo />

      <CitedSources retrieved={REFERENCES_RETRIEVED} citations={CMOS_CITATIONS} />

      <p>
        <Link to="/circuits/passives">Next: passives (R · L · C) →</Link>
      </p>
    </>
  )
}
