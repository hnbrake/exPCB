import { useMemo, useState } from 'react'

type BlockId = 'clk' | 'cfg' | 'fpga' | 'jtag' | 'dram'

type Block = {
  id: BlockId
  label: string
  tag: string
  color: string
}

const BLOCKS: Block[] = [
  { id: 'clk', label: 'Clock', tag: 'OSC / crystal', color: '#e5e5e5' },
  { id: 'cfg', label: 'Config flash', tag: 'SPI/QSPI bitstream', color: '#c4c4c4' },
  { id: 'fpga', label: 'FPGA', tag: 'Programmable fabric + IO', color: '#a3a3a3' },
  { id: 'jtag', label: 'Debug', tag: 'JTAG test/debug port', color: '#737373' },
  { id: 'dram', label: 'DRAM', tag: 'Optional SO-DIMM', color: '#525252' },
]

type SlotId = 's1' | 's2' | 's3' | 's4' | 's5'

const SLOTS: { id: SlotId; title: string; hint: string }[] = [
  { id: 's1', title: 'Stable reference', hint: 'What ticks before anything configures?' },
  { id: 's2', title: 'Bitstream storage', hint: 'Holds the FPGA image between power cycles.' },
  { id: 's3', title: 'Reconfigurable core', hint: 'This is the programmable logic die.' },
  {
    id: 's4',
    title: 'Bring-up & debug',
    hint: 'Standard test pins (JTAG) shift bits in for programming and debug — boundary scan, ILA, probe — even if flash boot fails.',
  },
  { id: 's5', title: 'Optional bulk memory', hint: 'Soft CPU or video pipelines often want a RAM pool.' },
]

const IDEAL: Record<SlotId, BlockId> = {
  s1: 'clk',
  s2: 'cfg',
  s3: 'fpga',
  s4: 'jtag',
  s5: 'dram',
}

export function FPGASystemBuilder() {
  const [slots, setSlots] = useState<Partial<Record<SlotId, BlockId>>>({})
  const [picked, setPicked] = useState<BlockId | null>(null)

  const place = (slot: SlotId, block: BlockId | null) => {
    setSlots((prev) => {
      const next = { ...prev }
      if (block === null) {
        delete next[slot]
        return next
      }
      for (const k of Object.keys(next) as SlotId[]) {
        if (next[k] === block) delete next[k]
      }
      next[slot] = block
      return next
    })
  }

  const score = useMemo(() => {
    let ok = 0
    for (const s of SLOTS) {
      const b = slots[s.id]
      if (b && IDEAL[s.id] === b) ok++
    }
    return ok
  }, [slots])

  return (
    <div className="demo-panel">
      <p className="demo-panel__hint">
        Build a minimal board story left → right: pick a block, tap a slot (or drag on desktop). Five slots, five
        blocks — “typical bring-up” ordering only.
        <span className="emoji-after" aria-hidden>
          🧱
        </span>
      </p>
      <div className="prose-block" style={{ marginBottom: '1rem' }}>
        <p>
          <strong>Oscillator (OSC)</strong> or crystal (XTAL) modules establish timing. <strong>Quad SPI (QSPI)</strong>{' '}
          flash is common for FPGA configuration because it streams the bitstream quickly.           <strong>JTAG</strong> (Joint Test Action Group / IEEE 1149.1) is a small set of test pins that shift serial
          data through on-chip chains for programming and debug — the usual lab pipe even when production boots from
          flash.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.55rem',
          marginBottom: '1rem',
          justifyContent: 'center',
        }}
      >
        {BLOCKS.map((b) => (
          <button
            key={b.id}
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('block', b.id)
              setPicked(b.id)
            }}
            onDragEnd={() => setPicked(null)}
            onClick={() => setPicked((p) => (p === b.id ? null : b.id))}
            style={{
              border: picked === b.id ? '2px solid var(--text)' : '1px solid var(--border)',
              borderLeft: `3px solid ${b.color}`,
              borderRadius: 12,
              padding: '0.45rem 0.65rem',
              background: 'var(--bg-elevated)',
              color: 'var(--text)',
              textAlign: 'left',
              cursor: 'grab',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 'var(--step--1)' }}>{b.label}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{b.tag}</div>
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gap: '0.55rem',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        }}
      >
        {SLOTS.map((s, i) => (
          <div
            key={s.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (picked) {
                  place(s.id, picked)
                  setPicked(null)
                }
              }
            }}
            onClick={() => {
              if (picked) {
                place(s.id, picked)
                setPicked(null)
              }
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.dataTransfer.dropEffect = 'move'
            }}
            onDrop={(e) => {
              e.preventDefault()
              const id = e.dataTransfer.getData('block') as BlockId
              if (id) place(s.id, id)
              setPicked(null)
            }}
            style={{
              borderRadius: 14,
              border: `1px dashed ${slots[s.id] ? 'var(--border-strong)' : 'var(--text-faint)'}`,
              padding: '0.65rem',
              background: 'var(--bg-deep)',
              minHeight: 108,
              position: 'relative',
              outline: picked ? '2px dashed var(--accent)' : undefined,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 6,
                right: 8,
                fontSize: '0.65rem',
                color: 'var(--text-faint)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontWeight: 650, fontSize: 'var(--step--1)', marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8 }}>{s.hint}</div>
            {slots[s.id] ? (
              <SlotBadge blockId={slots[s.id]!} ok={IDEAL[s.id] === slots[s.id]} />
            ) : (
              <span style={{ color: 'var(--text-faint)', fontSize: '0.75rem' }}>Drop block</span>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <button
          type="button"
          className="nav-pill"
          style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
          onClick={() => setSlots({})}
        >
          Reset slots
        </button>
        <span style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
          Teaching order score:{' '}
          <strong style={{ color: score === SLOTS.length ? 'var(--accent)' : 'var(--text)' }}>
            {score}/{SLOTS.length}
          </strong>
        </span>
      </div>

      <svg viewBox="0 0 400 48" width="100%" height={48} style={{ marginTop: '0.75rem' }} aria-hidden>
        <line x1="12" y1="24" x2="388" y2="24" stroke="var(--border-strong)" strokeWidth="2" />
        {SLOTS.map((_, i) => {
          const x = 40 + i * 72
          return <circle key={i} cx={x} cy="24" r="5" fill="var(--accent)" opacity="0.85" />
        })}
        <text x="12" y="42" fill="var(--text-faint)" fontSize="10" fontFamily="var(--font-mono)">
          power & config dance → user logic
        </text>
      </svg>
    </div>
  )
}

function SlotBadge({ blockId, ok }: { blockId: BlockId; ok: boolean }) {
  const b = BLOCKS.find((x) => x.id === blockId)!
  return (
    <div
      style={{
        borderRadius: 10,
        padding: '0.3rem 0.55rem',
        display: 'inline-block',
        background: ok ? 'var(--ok-bg)' : 'var(--warn-bg)',
        border: ok ? '1px solid var(--border-strong)' : '1px dashed var(--warn-border)',
        color: ok ? 'var(--ok)' : 'var(--warn)',
        fontWeight: 600,
        fontSize: '0.78rem',
      }}
    >
      {b.label}
      {!ok && ' (typical order?)'}
    </div>
  )
}
