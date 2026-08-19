import { useState } from 'react'
import type { EvidenceEntry } from '../lib/match'
import ResultCard from './ResultCard'

/**
 * Shows the best-matching entry in full and folds any others away behind one
 * quiet line.
 *
 * Before this, every matching entry rendered at once. The first cause to match
 * two entries (disability) produced 567 words over 3.2 phone screens against
 * 272 words and 1.6 screens for a single-match cause — two actions competing
 * for the same reader, eight considerations, two source cards. That is the
 * "action is the point" principle losing to raw volume, and it would have hit
 * every cause as the evidence base grew, not just this one.
 *
 * The extra entries are rendered in the DOM and only visually collapsed, so
 * nothing is hidden from a screen reader or a headless renderer that ignores
 * the toggle.
 *
 * Takes plain entries since 2026-08-09. It used to take `MatchedEntry`, which
 * paired each entry with an overlap count against the reader's self-check
 * answers. With the self-check gone nothing computes an overlap, and a wrapper
 * carrying a number nobody sets is worse than no wrapper. Declaration order in
 * evidence.json now decides which entry leads.
 */
export default function ResultList({ entries }: { entries: EvidenceEntry[] }) {
  const [expanded, setExpanded] = useState(false)

  const [first, ...rest] = entries
  if (!first) return null

  return (
    <div className="result-list">
      <ResultCard entry={first} contribute />

      {rest.length > 0 && (
        <>
          {!expanded && (
            <button type="button" className="more-ways" onClick={() => setExpanded(true)}>
              {rest.length === 1 ? 'One more way to help' : `${rest.length} more ways to help`} →
            </button>
          )}
          <div className={`result-more${expanded ? ' is-open' : ''}`} hidden={!expanded}>
            {rest.map((entry) => (
              <ResultCard key={entry.id} entry={entry} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
