/** Linear trail overview for the home stripe */
export function LearningPathOverview() {
  const mid = 'lp-arrow-head'
  return (
    <svg
      className="diagram-frame"
      viewBox="0 0 520 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="lp-line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="35%" stopColor="#db2777" />
          <stop offset="70%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <marker id={mid} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#2563eb" />
        </marker>
      </defs>
      <line
        x1="24"
        y1="44"
        x2="496"
        y2="44"
        stroke="url(#lp-line-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        markerEnd={`url(#${mid})`}
      />
      {[
        { x: 40, t: 'FPGA', fill: '#7c3aed' },
        { x: 132, t: 'Memory', fill: '#0d9488' },
        { x: 236, t: 'Circuits', fill: '#ea580c' },
        { x: 352, t: 'Power', fill: '#db2777' },
        { x: 448, t: 'I/O', fill: '#2563eb' },
      ].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy="44" r="10" fill="var(--surface)" stroke={n.fill} strokeWidth="2" />
          <circle cx={n.x} cy="44" r="4" fill={n.fill} opacity="0.85" />
          <text x={n.x} y="72" textAnchor="middle" fill="var(--text)" fontSize="11" fontWeight="700">
            {n.t}
          </text>
        </g>
      ))}
      <text x="260" y="24" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
        suggested read order — use the trail at the bottom of each page
      </text>
    </svg>
  )
}
