import { Link } from 'react-router-dom'
import { Cite, CitedSources } from '../../components/CitedSources'
import { HeroArtFrame } from '../../components/HeroArtFrame'
import { MemoryIllustration } from '../../components/art/MemoryIllustration'
import { MemoryLatencyDiagram } from '../../components/diagrams/MemoryLatencyDiagram'
import { MEMORY_CITATIONS, REFERENCES_RETRIEVED } from '../../content/references'
import { ScrollReveal } from '../../components/ScrollReveal'
import { SectionConnector } from '../../components/SectionConnector'

const rows: {
  tech: string
  retention: string
  cell: string
  feel: string
  where: string
}[] = [
  {
    tech: 'SRAM',
    retention: 'Volatile',
    cell: 'Six-transistor (6T) cell — two cross-coupled inverters plus access devices.',
    feel: 'Fast random read/write, simple interface, priced per megabit; leakage dominates standby power.',
    where: 'CPU caches, on-chip FPGA block RAM (BRAM), small microcontroller (MCU) RAM.',
  },
  {
    tech: 'DRAM',
    retention: 'Volatile',
    cell: 'One transistor + one capacitor (1T1C); sense amplifiers distinguish stored charge.',
    feel: 'Huge density per mm²; needs periodic refresh and a controller — latency quoted in bursts.',
    where: 'Main memory, SDRAM next to FPGA SoCs and processors.',
  },
  {
    tech: 'NOR flash',
    retention: 'Nonvolatile',
    cell: 'Floating gate or charge-trap cell; parallel bitlines give random read access.',
    feel: 'Good for execute-in-place (XIP) boot — CPU or FPGA reads instructions directly.',
    where: 'Boot code, FPGA configuration images, small firmware stores.',
  },
  {
    tech: 'NAND flash',
    retention: 'Nonvolatile',
    cell: 'Strings of cells in series for density; read/write in pages, erase in larger blocks.',
    feel: 'Lowest cost per gigabyte; requires wear leveling and bad-block management in SSDs / eMMC.',
    where: 'Solid-state drives (SSDs), embedded MultiMediaCard (eMMC), SD cards.',
  },
  {
    tech: 'EEPROM',
    retention: 'Nonvolatile',
    cell: 'Floating gate with byte- or page-erasable organization; slower than RAM, gentler than NAND block erase.',
    feel: 'Ideal for serial numbers, trim tables, and configuration the MCU updates occasionally.',
    where: 'MCU peripherals, sensor calibration, small parameter storage.',
  },
  {
    tech: 'FRAM / FeRAM',
    retention: 'Nonvolatile',
    cell: 'Ferroelectric capacitor polarization — toggles without separate erase cycle.',
    feel: 'Huge write endurance vs flash; limited density and premium cost vs EEPROM for many jobs.',
    where: 'Energy metering, datalogging, counters that must survive power loss without wear algorithms.',
  },
]

export function MemoryDeepPage() {
  return (
    <>
      <p className="page-back">
        <Link to="/memory">← Memory hub</Link>
      </p>
      <h1 className="page-title">Memory technologies</h1>
      <p className="page-lede">
        Systems mix <strong>volatile</strong> working memory with <strong>nonvolatile</strong> storage. The table
        below is a coarse map; every real design adds controllers, error correction, security, and power-management
        details on top.
      </p>

      <MemoryLatencyDiagram />

      <SectionConnector>
        Keep this figure in mind while you read the table: the same technologies appear in different <strong>roles</strong>{' '}
        depending on whether you need nanosecond scratch storage, boot-time XIP, or cheap bulk files.
      </SectionConnector>

      <HeroArtFrame intensity={0.035}>
        <MemoryIllustration />
      </HeroArtFrame>

      <ScrollReveal>
        <div className="card">
          <div className="prose-block">
            <p>
              <strong>Random access</strong> means any address is reachable in similar time (ignoring caches and
              bank rules). <strong>Flash</strong> families differ in whether they favor fine-grained reads (NOR) or
              bulk erase/program (NAND). <strong>Electrically erasable programmable ROM (EEPROM)</strong> and{' '}
              <strong>ferroelectric RAM (FRAM)</strong> sit in the middle for small, rewrite-friendly nonvolatile
              fields.
            </p>
            <p>
              Acronyms you will keep seeing: <strong>MCU</strong> (microcontroller unit), <strong>SoC</strong>{' '}
              (system on chip), <strong>SSD</strong> (solid-state drive), <strong>eMMC</strong> (embedded MMC),{' '}
              <strong>SDRAM</strong> (synchronous DRAM), <strong>XIP</strong> (execute in place).
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={50}>
        <div className="card" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--step--1)' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>Technology</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>Volatile?</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>Cell / mechanism</th>
                <th style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>Designer feel</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.tech}>
                  <td style={{ padding: '0.55rem', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>
                    {r.tech}
                  </td>
                  <td
                    style={{ padding: '0.55rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    {r.retention}
                  </td>
                  <td
                    style={{ padding: '0.55rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    {r.cell}
                  </td>
                  <td
                    style={{ padding: '0.55rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    {r.feel} <span style={{ color: 'var(--text-faint)' }}>— {r.where}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      <SectionConnector>
        The rows above are <strong>cell physics + interface feel</strong>. Next, unpack the two volatile families side by
        side — that contrast explains why FPGAs and caches lean on SRAM while phones and SBCs lean on DRAM.
      </SectionConnector>

      <ScrollReveal>
        <h2 className="section-title">Volatile memory: SRAM vs DRAM</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              <strong>SRAM</strong> is built from latching elements (classically six transistors) that hold a bit as
              long as power is applied — no refresh strobe. It is fast and simple to interface but large on silicon.
            </p>
            <p>
              <strong>DRAM</strong> stores charge on a capacitor accessed through one transistor per bit. Charge
              leaks, so a controller issues refresh cycles that rewrite rows before data decays. The payoff is density:
              main memory in PCs, phones, and many embedded Linux boards is DRAM-based.
            </p>
            <p style={{ marginBottom: 0 }}>
              When a datasheet says <strong>SDRAM</strong> (<strong>synchronous DRAM</strong>), it is pointing at the
              large JEDEC-standardized family where transfers on the external interface are aligned to a supplied clock
              — the mainstream evolution away from legacy asynchronous DRAM pin timing on modern boards.
              <Cite id="cite-jedec-sdram" n={1} />
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SectionConnector>
        Volatile working memory is only half the story. The next block is why boot media, SSDs, and tiny parameter stores
        are <em>different</em> nonvolatile animals — not interchangeable “flash.”
      </SectionConnector>

      <ScrollReveal delay={60}>
        <h2 className="section-title">Nonvolatile: NOR vs NAND vs EEPROM vs FRAM</h2>
        <div className="card">
          <div className="prose-block">
            <p>
              <strong>NOR flash</strong> arranges cells in parallel for fast random reads — good when a processor
              or FPGA must read boot code without copying all of it to RAM first.
            </p>
            <p>
              <strong>NAND flash</strong> strings many cells in series for density; reads and writes happen in pages,
              erases in large blocks. Controllers hide wear, remap bad blocks, and implement flash translation layers
              for file systems.
            </p>
            <p>
              <strong>EEPROM</strong> targets byte-level rewrites for configuration data; <strong>FRAM</strong>{' '}
              offers RAM-like endurance with nonvolatile retention — choose based on density, voltage, and cost curves
              from the datasheet, not vibes.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <h2 className="section-title">How designers compare parts</h2>
        <div className="card">
          <ul className="prose-list">
            <li>
              <strong>Latency vs bandwidth:</strong> SRAM and NOR excel at low-latency random access; DRAM and NAND
              win streaming bandwidth per dollar when a controller amortizes access patterns.
            </li>
            <li>
              <strong>Erase granularity:</strong> EEPROM bytes vs NAND blocks — file systems on raw NAND must manage
              erase units; EEPROM is kinder for tiny persistent fields.
            </li>
            <li>
              <strong>Endurance & retention:</strong> every NV technology wears; NAND relies on wear leveling; FRAM
              trades write cycles for different physics limits — always read the “cycling” and “data retention” charts
              at your operating temperature.
            </li>
          </ul>
        </div>
      </ScrollReveal>

      <SectionConnector>
        <strong>Apply it:</strong> the match lab hides part numbers and asks you to assign each technology to a system
        role — the fastest way to see whether the table “stuck.”
      </SectionConnector>

      <CitedSources retrieved={REFERENCES_RETRIEVED} citations={MEMORY_CITATIONS} />

      <p>
        <Link to="/memory/match">Next: match lab →</Link>
      </p>
    </>
  )
}
