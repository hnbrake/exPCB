import { Link } from 'react-router-dom'
import { MOSFETPlayground } from '../../components/demos/MOSFETPlayground'
import { MosfetStructureDiagram } from '../../components/diagrams/MosfetStructureDiagram'
import { SectionConnector } from '../../components/SectionConnector'

export function MosfetPage() {
  return (
    <>
      <p className="page-back">
        <Link to="/circuits">← Circuits hub</Link>
      </p>
      <h1 className="page-title">MOSFET playground</h1>
      <p className="page-lede">
        A <strong>metal-oxide-semiconductor field-effect transistor (MOSFET)</strong> uses an electric field from the
        gate to modulate conductance between source and drain. This page uses a toy model of an{' '}
        <strong>n-channel enhancement</strong> device: no intentional channel at V<sub>GS</sub> = 0, channel forms when
        gate-to-source voltage exceeds the         threshold.
      </p>

      <MosfetStructureDiagram />

      <div className="card">
        <div className="prose-block">
          <p>
            <strong>Gate-to-source voltage (V<sub>GS</sub>)</strong> controls how strongly electrons are attracted
            under the gate oxide. <strong>Drain-to-source voltage (V<sub>DS</sub>)</strong> establishes the lateral
            field that sweeps carriers through the channel. <strong>Drain current (I<sub>d</sub>)</strong> is what you
            measure; its relationship to V<sub>GS</sub> and V<sub>DS</sub> forms the I–V family you see in
            datasheets (linear/triode region at low V<sub>DS</sub>, saturation at higher V<sub>DS</sub>).
          </p>
          <p>
            Power MOSFET datasheets add a body diode, capacitances such as <strong>C<sub>iss</sub></strong> (input
            capacitance), <strong>C<sub>oss</sub></strong> (output capacitance), safe operating area (SOA), and
            temperature derating for <strong>R<sub>DS(on)</sub></strong> — the on-state resistance between drain and
            source when fully enhanced. None of that detail is modeled here on purpose.
          </p>
        </div>
      </div>

      <SectionConnector>
        The diagram is a cartoon cross-section; the playground below is a <strong>toy I–V surface</strong> — use it to
        connect “more V<sub>GS</sub>” with “more current at a given V<sub>DS</sub>” before you open a real safe
        operating area plot.
      </SectionConnector>

      <MOSFETPlayground />

      <p>
        <Link to="/circuits/cmos">Next: CMOS inverter →</Link>
      </p>
    </>
  )
}
