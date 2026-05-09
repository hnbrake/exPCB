import type { ReactNode } from 'react'

export type FigureCredit = {
  /** Visible credit line, e.g. author / project name */
  attribution: string
  /** Link to file page (Commons, etc.) */
  sourceUrl: string
  /** Short license name, e.g. "CC0 1.0" */
  license: string
  /** Link to license deed */
  licenseUrl?: string
}

type Props = {
  src: string
  alt: string
  /** Shown above caption as bold lead */
  title?: string
  caption?: ReactNode
  credit: FigureCredit
  className?: string
}

/**
 * Static figure from /public with required attribution (Commons / open licenses).
 */
export function AttributedFigure({ src, alt, title, caption, credit, className = '' }: Props) {
  return (
    <figure className={`attributed-figure ${className}`.trim()}>
      <img className="attributed-figure__img" src={src} alt={alt} loading="lazy" decoding="async" />
      {(title || caption || credit) && (
        <figcaption className="attributed-figure__cap">
          {title ? <strong className="attributed-figure__title">{title}</strong> : null}
          {caption ? <div className="attributed-figure__body">{caption}</div> : null}
          <p className="attributed-figure__credit">
            <span className="attributed-figure__credit-label">Image: </span>
            <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
              {credit.attribution}
            </a>
            {credit.licenseUrl ? (
              <>
                {' '}
                (
                <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
                  {credit.license}
                </a>
                ).
              </>
            ) : (
              <> ({credit.license}).</>
            )}
          </p>
        </figcaption>
      )}
    </figure>
  )
}
