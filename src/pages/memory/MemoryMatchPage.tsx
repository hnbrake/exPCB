import { Link } from 'react-router-dom'
import { MemoryBuckets } from '../../components/demos/MemoryBuckets'
import { MemoryLatencyDiagram } from '../../components/diagrams/MemoryLatencyDiagram'
import { SectionConnector } from '../../components/SectionConnector'

export function MemoryMatchPage() {
  return (
    <>
      <p className="page-back">
        <Link to="/memory">← Memory hub</Link>
      </p>
      <h1 className="page-title">Match memory to the job</h1>
      <p className="page-lede">
        Six buckets describe <em>roles</em> on a system — not chip part numbers. Your job is to place each memory
        technology where its physics and economics make sense. Real products cheat (for example, copying boot code
        from NAND into <strong>synchronous DRAM (SDRAM)</strong> with a bootloader), but the exercise builds a
        vocabulary tied to intent.
      </p>

      <MemoryLatencyDiagram />

      <div className="card">
        <div className="prose-block">
          <p>
            <strong>NOR flash</strong> tolerates fine random reads — good for boot and FPGA configuration bitstreams
            read over <strong>Serial Peripheral Interface (SPI)</strong>. <strong>NAND flash</strong> is optimized for
            cheap bulk storage (SSD, eMMC). <strong>Static RAM (SRAM)</strong> is fast and volatile — ideal for caches
            and RAM <em>inside</em> the FPGA’s programmable <strong>fabric</strong> (on-die block or distributed RAM).{' '}
            <strong>Dynamic RAM (DRAM)</strong> is dense volatile main memory.{' '}
            <strong>Electrically erasable programmable ROM (EEPROM)</strong> stores small rewriteable tables;{' '}
            <strong>ferroelectric RAM (FRAM)</strong> targets very high endurance nonvolatile logging.
          </p>
        </div>
      </div>

      <SectionConnector>
        You already mapped <strong>latency vs capacity</strong> on the hub and deep pages — this lab is the same idea in
        drag-and-drop form: slow/cheap bulk vs fast/volatile scratch vs small rewriteable tables.
      </SectionConnector>

      <MemoryBuckets />

      <p>
        <Link to="/circuits">Next: circuit components →</Link>
      </p>
    </>
  )
}
