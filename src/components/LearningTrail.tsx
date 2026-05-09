import { Link, useLocation } from 'react-router-dom'
import { LEARNING_PATH, learningStepIndex } from '../content/learningPath'

export function LearningTrail() {
  const { pathname } = useLocation()
  const i = learningStepIndex(pathname)
  if (i < 0) return null

  const prev = i > 0 ? LEARNING_PATH[i - 1] : null
  const next = i < LEARNING_PATH.length - 1 ? LEARNING_PATH[i + 1] : null
  const step = LEARNING_PATH[i]

  return (
    <nav className="learning-trail" aria-label="Suggested reading order">
      <div className="learning-trail__meta">
        <span className="learning-trail__step">
          Step {i + 1} of {LEARNING_PATH.length}
        </span>
        <span className="learning-trail__title">{step.title}</span>
        <span className="learning-trail__sub">{step.subtitle}</span>
      </div>
      <div className="learning-trail__dots" aria-hidden>
        {LEARNING_PATH.map((s, k) => (
          <span
            key={s.path}
            className={`learning-trail__dot${k === i ? ' learning-trail__dot--here' : ''}${k < i ? ' learning-trail__dot--done' : ''}`}
          />
        ))}
      </div>
      <div className="learning-trail__nav">
        {prev ? (
          <Link to={prev.path} className="learning-trail__link learning-trail__link--prev">
            ← {prev.title}
          </Link>
        ) : (
          <span className="learning-trail__link learning-trail__link--disabled">Start</span>
        )}
        {next ? (
          <Link to={next.path} className="learning-trail__link learning-trail__link--next">
            {next.title} →
          </Link>
        ) : (
          <span className="learning-trail__link learning-trail__link--disabled">End of trail</span>
        )}
      </div>
    </nav>
  )
}
