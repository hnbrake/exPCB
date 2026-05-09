import type { ReactNode } from 'react'
import type { Citation } from '../content/references'

type CitedSourcesProps = {
  title?: string
  retrieved: string
  citations: Citation[]
  preamble?: ReactNode
}

/** Numbered reference list; each `Citation.id` must be unique on the page for `Cite` targets. */
export function CitedSources({ title = 'Sources', retrieved, citations, preamble }: CitedSourcesProps) {
  return (
    <aside className="cited-sources" aria-label={title}>
      {preamble}
      <h2 className="cited-sources__title">{title}</h2>
      <p className="cited-sources__retrieved">
        External references open in a new tab. Link list current as of{' '}
        <time dateTime={retrieved}>{retrieved}</time>.
      </p>
      <ol className="cited-sources__list">
        {citations.map((c, i) => (
          <li key={c.id} id={c.id} className="cited-sources__item">
            <span className="cited-sources__num">{i + 1}.</span>
            <span className="cited-sources__body">
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                {c.title}
              </a>
              <span className="cited-sources__publisher"> — {c.publisher}</span>
            </span>
          </li>
        ))}
      </ol>
    </aside>
  )
}

/** Inline superscript jump to the matching `Citation.id` in `CitedSources`. */
export function Cite({ id, n }: { id: string; n: number }) {
  return (
    <sup className="cite-sup">
      <a href={`#${id}`} className="cite-link">
        [{n}]
      </a>
    </sup>
  )
}
