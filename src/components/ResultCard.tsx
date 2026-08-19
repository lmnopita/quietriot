import { useState } from 'react'
import { COPY } from '../data/taxonomy'
import type { EvidenceEntry } from '../lib/match'
import Citation from './Citation'

/**
 * Action-first answer (PRINCIPLES.md "Every answer follows this fixed order"):
 * the action → why it works for you → the honest limit → the source.
 *
 * The action zone leads with the first low-cost action; "Show me N more" reveals
 * the rest (the product's one piece of motion, DESIGN.md "Motion"). The
 * remaining actions render in the DOM up front and are only visually enhanced by
 * the reveal, so nothing ships blank to a reduced-motion or headless reader.
 *
 * `confidence` and `basis` are audit-only fields — never rendered. The honesty
 * about evidence strength comes through the caveats' wording, not a label.
 */
export default function ResultCard({
  entry,
  contribute = false,
}: {
  entry: EvidenceEntry
  /** Passed through to this card's Citation — see Citation.tsx. Only the
   * lead card of a result should ever pass true. */
  contribute?: boolean
}) {
  const [revealed, setRevealed] = useState(false)

  const [firstAction, ...moreActions] = entry.low_risk_actions
  // +1 for the shared honest-limit line rendered below, so the label still
  // matches what a reader can count (DESIGN.md "Considerations").
  const caveatLabel =
    entry.caveats.length + 1 === 1
      ? COPY.result.caveatLabelOne
      : COPY.result.caveatLabelMany

  return (
    <article className="result-card">
      <section className="action-zone">
        <p className="action-kicker">{COPY.result.actionLabel}</p>
        <p className="action-headline">{firstAction}</p>

        {moreActions.length > 0 && (
          <>
            <ul
              className={`action-more${revealed ? ' is-revealed' : ''}`}
              hidden={!revealed}
            >
              {moreActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            {!revealed && (
              <button
                type="button"
                className="action-reveal"
                onClick={() => setRevealed(true)}
              >
                {COPY.result.revealActions(moreActions.length)}
              </button>
            )}
          </>
        )}
      </section>

      <section className="why">
        {/* h2, not h3: App.tsx renders the screen's h1, so an h3 here would
            skip a level. Carried over from the other session's pre-launch
            accessibility work (PR #25). */}
        <h2 className="why-heading">{COPY.result.whyHeading}</h2>
        <p className="why-body">{entry.pattern}</p>
        <p className="why-body">{entry.why_lower_risk}</p>
      </section>

      <section className="considerations">
        <p className="considerations-label">{caveatLabel}</p>
        <ul className="considerations-list">
          {/* The honest limit comes from COPY rather than the entry. It was a
              per-entry caveat until 2026-08-09, where seven of the nine
              appended their own explanation and editorialised past the sources.
              Rendered structurally it cannot be omitted, softened for one
              cause, or drift — which is a stronger reading of PRINCIPLES #2
              than nine hand-maintained copies.

              `honest_limit_last` changes its POSITION only, never its presence
              or its wording: the line renders either way, identical in both.
              An entry sets it when leading with a hedge would talk past the
              reader — `breed-stigma-is-racial` opens by acknowledging that a
              frightening encounter with a dog is real. */}
          {!entry.honest_limit_last && <li>{COPY.result.honestLimit}</li>}
          {entry.caveats.map((caveat) => (
            <li key={caveat}>{caveat}</li>
          ))}
          {entry.honest_limit_last && <li>{COPY.result.honestLimit}</li>}
        </ul>
      </section>

      <Citation sources={entry.sources} contribute={contribute} />
    </article>
  )
}

/*
 * A `ResultDisclaimers` export lived here until 2026-08-09, rendering two
 * page-level honesty lines beneath the result cards. Both have better homes and
 * neither was lost:
 *
 *  - `relativeRisk` was a duplicate. Every card's considerations already open
 *    with "Lower risk isn't no risk", which sits beside the claim it qualifies
 *    instead of once at the foot of the page. PRINCIPLES #2 is still enforced,
 *    per card, where a reader is actually looking.
 *  - `notAdvice` said what the site footer now says shorter, on every screen
 *    rather than only this one.
 *
 * The result screen therefore carries no page-level disclaimer of its own, and
 * reads like every other screen. Before adding one back, check it isn't already
 * being said in the footer or in the considerations.
 */
