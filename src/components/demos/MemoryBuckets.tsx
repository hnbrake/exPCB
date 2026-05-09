import { useCallback, useMemo, useState } from 'react'

export type MemoryChipId = 'eeprom' | 'nor' | 'nand' | 'sram' | 'dram' | 'fram'

type Chip = {
  id: MemoryChipId
  label: string
  short: string
  /** Full name for hover / accessibility */
  expand: string
  color: string
}

/** Grayscale accents — distinguish chips by tone, not hue */
const CHIPS: Chip[] = [
  {
    id: 'eeprom',
    label: 'EEPROM',
    short: 'Byte-erasable NV',
    expand: 'Electrically erasable programmable read-only memory — small rewrites, moderate endurance.',
    color: '#e5e5e5',
  },
  {
    id: 'nor',
    label: 'NOR Flash',
    short: 'Random-read NV',
    expand: 'Not-OR topology flash — good for boot and execute-in-place (XIP) code.',
    color: '#d4d4d4',
  },
  {
    id: 'nand',
    label: 'NAND Flash',
    short: 'Page/block NV',
    expand: 'Not-AND topology flash — cheap bulk storage; needs controllers and wear leveling.',
    color: '#a3a3a3',
  },
  {
    id: 'sram',
    label: 'SRAM',
    short: 'Fast volatile',
    expand: 'Static random-access memory — six-transistor cells, no refresh, loses data at power-off.',
    color: '#737373',
  },
  {
    id: 'dram',
    label: 'DRAM',
    short: 'Dense volatile',
    expand: 'Dynamic RAM — capacitor + access transistor, requires refresh and a memory controller.',
    color: '#525252',
  },
  {
    id: 'fram',
    label: 'FRAM',
    short: 'Endurance NV',
    expand: 'Ferroelectric RAM — nonvolatile like flash but write endurance closer to RAM (still density-limited).',
    color: '#404040',
  },
]

type BucketId = 'boot' | 'scratch' | 'bulk' | 'ids' | 'nvlog' | 'volatile'

type Bucket = {
  id: BucketId
  title: string
  blurb: string
}

const BUCKETS: Bucket[] = [
  {
    id: 'boot',
    title: 'Boot & execute in place',
    blurb: 'CPU or FPGA reads code directly from memory — random read latency matters.',
  },
  {
    id: 'scratch',
    title: 'High-capacity working memory',
    blurb: 'Main system RAM: huge, fast enough, needs a controller and refresh (DRAM).',
  },
  {
    id: 'bulk',
    title: 'Cheap bulk nonvolatile',
    blurb: 'Filesystems, SSDs, eMMC — cost per gigabyte wins over byte-level ease.',
  },
  {
    id: 'ids',
    title: 'IDs, tables, small EEPROM jobs',
    blurb: 'Serial numbers, trim bytes — rewritable but not rewritten millions of times per day.',
  },
  {
    id: 'nvlog',
    title: 'High-endurance NV counters / logs',
    blurb: 'FRAM-style: many write cycles without flash wear algorithms (still capacity-limited).',
  },
  {
    id: 'volatile',
    title: 'Fast volatile scratch',
    blurb: 'Caches, FIFOs, FPGA block RAM — gone when power drops, extremely simple timing.',
  },
]

/** Primary "best" answers for teaching */
const IDEAL: Record<MemoryChipId, BucketId> = {
  nor: 'boot',
  nand: 'bulk',
  sram: 'volatile',
  dram: 'scratch',
  eeprom: 'ids',
  fram: 'nvlog',
}

export function MemoryBuckets() {
  const [placements, setPlacements] = useState<Partial<Record<BucketId, MemoryChipId>>>({})
  const [selectedChip, setSelectedChip] = useState<MemoryChipId | null>(null)

  const place = useCallback((bucket: BucketId, chip: MemoryChipId | null) => {
    setPlacements((prev) => {
      const next = { ...prev }
      if (chip === null) {
        delete next[bucket]
        return next
      }
      for (const k of Object.keys(next) as BucketId[]) {
        if (next[k] === chip) delete next[k]
      }
      next[bucket] = chip
      return next
    })
  }, [])

  const score = useMemo(() => {
    const used = Object.values(placements).filter(Boolean) as MemoryChipId[]
    const filled = used.length
    let matches = 0
    for (const b of BUCKETS) {
      const chip = placements[b.id]
      if (!chip) continue
      if (IDEAL[chip] === b.id) matches++
    }
    return { filled, matches }
  }, [placements])

  return (
    <div className="demo-panel">
      <p className="demo-panel__hint">
        Drag a chip into a bucket (or <strong style={{ color: 'var(--text)' }}>tap chip, then tap bucket</strong> on
        touch). Typical roles — real designs mix technologies.
        <span className="emoji-after" aria-hidden>
          🎯
        </span>
      </p>
      <div className="prose-block" style={{ marginBottom: '1.1rem' }}>
        <p>
          Each bucket describes a <strong>system role</strong>, not a pinout. <strong>Execute-in-place (XIP)</strong>{' '}
          means a processor reads instructions straight from a memory without copying all of it into RAM first — NOR
          flash is built for that access pattern. <strong>Wear leveling</strong> spreads writes across physical blocks so
          NAND flash survives years of filesystem traffic. Hover a chip (or long-press on mobile) to read its full
          name.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
          marginBottom: '1.1rem',
          justifyContent: 'center',
        }}
      >
        {CHIPS.map((c) => (
          <button
            key={c.id}
            type="button"
            title={c.expand}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('chip', c.id)
              e.dataTransfer.effectAllowed = 'move'
              setSelectedChip(c.id)
            }}
            onDragEnd={() => setSelectedChip(null)}
            onClick={() => setSelectedChip((d) => (d === c.id ? null : c.id))}
            style={{
              border: selectedChip === c.id ? '2px solid var(--text)' : '1px solid var(--border)',
              borderLeft: `3px solid ${c.color}`,
              borderRadius: 12,
              padding: '0.5rem 0.75rem',
              background: 'var(--bg-elevated)',
              color: 'var(--text)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              minWidth: '6.5rem',
              cursor: 'grab',
              boxShadow: selectedChip === c.id ? '0 0 0 2px rgba(0, 0, 0, 0.12)' : undefined,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 'var(--step--1)' }}>{c.label}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.short}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '0.65rem' }}>
        {BUCKETS.map((b) => (
          <div
            key={b.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (selectedChip) {
                  place(b.id, selectedChip)
                  setSelectedChip(null)
                }
              }
            }}
            onClick={() => {
              if (selectedChip) {
                place(b.id, selectedChip)
                setSelectedChip(null)
              }
            }}
            onDragOver={(e) => {
              e.preventDefault()
              e.dataTransfer.dropEffect = 'move'
            }}
            onDrop={(e) => {
              e.preventDefault()
              const id = e.dataTransfer.getData('chip') as MemoryChipId
              if (id) place(b.id, id)
              setSelectedChip(null)
            }}
            style={{
              borderRadius: 14,
              border: `1px dashed ${placements[b.id] ? 'var(--border-strong)' : 'var(--text-faint)'}`,
              padding: '0.75rem 1rem',
              background: 'var(--bg-deep)',
              minHeight: 72,
              outline: selectedChip ? '2px dashed var(--accent)' : undefined,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 650, marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>{b.blurb}</div>
              </div>
              <div style={{ minWidth: 100, alignSelf: 'center' }}>
                {placements[b.id] ? (
                  <ChipBadge chipId={placements[b.id]!} ideal={IDEAL[placements[b.id]!] === b.id} />
                ) : (
                  <span style={{ color: 'var(--text-faint)', fontSize: 'var(--step--1)' }}>Drop here</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <button
          type="button"
          className="nav-pill"
          style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
          onClick={() => setPlacements({})}
        >
          Clear board
        </button>
        <span style={{ fontSize: 'var(--step--1)', color: 'var(--text-muted)' }}>
          {score.filled}/{CHIPS.length} placed — teaching match:{' '}
          <strong style={{ color: score.matches === CHIPS.length ? 'var(--accent)' : 'var(--text)' }}>
            {score.matches}/{CHIPS.length}
          </strong>
        </span>
      </div>
    </div>
  )
}

function ChipBadge({ chipId, ideal }: { chipId: MemoryChipId; ideal: boolean }) {
  const c = CHIPS.find((x) => x.id === chipId)!
  return (
    <div
      style={{
        borderRadius: 10,
        padding: '0.35rem 0.6rem',
        background: ideal ? 'var(--ok-bg)' : 'var(--warn-bg)',
        border: ideal ? '1px solid var(--border-strong)' : '1px dashed var(--warn-border)',
        fontSize: 'var(--step--1)',
        fontWeight: 600,
        color: ideal ? 'var(--ok)' : 'var(--warn)',
      }}
    >
      {c.label}
      {!ideal && ' (rethink?)'}
    </div>
  )
}
