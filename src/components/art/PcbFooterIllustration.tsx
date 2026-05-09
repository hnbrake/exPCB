import { PCB } from './pcbColors'

/** Tiny populated board for footer — reads as “actual PCB” at a glance. */
export function PcbFooterIllustration() {
  return (
    <svg
      className="pcb-footer-art"
      viewBox="0 0 200 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="1" y="1" width="198" height="42" rx="6" fill={PCB.mask} stroke={PCB.fr4Edge} strokeWidth="1" />
      <g stroke={PCB.copper} strokeWidth="1.2" strokeLinecap="round" fill="none">
        <path d="M 12 22 H 188" opacity="0.6" />
        <path d="M 24 14 V 30 M 100 14 V 30 M 176 14 V 30" opacity="0.75" />
      </g>
      <rect x="34" y="14" width="28" height="16" rx="2" fill={PCB.bodyIc} stroke="#111" strokeWidth="0.5" />
      <rect x="86" y="12" width="8" height="6" rx="1" fill={PCB.passiveBlack} />
      <rect x="118" y="14" width="20" height="14" rx="2" fill={PCB.capCeramic} />
      <circle cx="162" cy="22" r="4" fill={PCB.copper} opacity="0.9" />
      <rect x="174" y="16" width="14" height="12" rx="2" fill="#1e1e22" stroke={PCB.silkFaint} strokeWidth="0.5" />
      <text x="100" y="40" textAnchor="middle" fill={PCB.silkFaint} fontSize="7" fontFamily="var(--font-mono)">
        IC · 0402 · cap · via · header
      </text>
    </svg>
  )
}
