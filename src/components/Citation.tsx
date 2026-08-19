import { CONTACT_EMAIL } from '../data/contact'
import { COPY } from '../data/taxonomy'
import type { EvidenceSource } from '../lib/match'

/**
 * Opened 2026-08-04, for the beta.
 *
 * The gate existed so nothing was listed before it had been checked. That
 * condition is now met by hand: every source in the corpus has had its DOI
 * resolved against Crossref, confirmed as genuinely registered, and its real
 * abstract read before the claim was written — the trail is in
 * docs/EVIDENCE-VERIFICATION-LOG.md. The harvester will add scale later; it was
 * never what made these particular citations trustworthy.
 *
 * It also fixed a live contradiction: the landing page promises work "grounded
 * in real research" while the card underneath showed nothing, which is the one
 * spot a sceptical reader would stop believing us.
 *
 * Set back to `false` if the corpus is ever ahead of its verification again.
 */
const SOURCES_DB_READY = true

/**
 * The catalog card — our archival object (DESIGN.md "The catalog card").
 * When live, it renders whatever real sources the matched entry carries: no
 * invented call numbers, ever; "N held" is the true `sources.length`, so the
 * card can never claim more provenance than the evidence base actually holds.
 */
/**
 * "Rasinski, H. M., & Czopp, A. M." -> "Rasinski & Czopp"
 * "Schniedewind, E., Lindsay, R., & Snow, S." -> "Schniedewind et al."
 *
 * Initials are a citation convention for finding a paper in an index. Nobody
 * reading this is doing that, and every character costs attention on a screen
 * a nervous reader is skimming. Attribution survives; the apparatus goes.
 */
function shortAuthors(authors: string): string {
  const surnames = authors
    .split(/,\s*&\s*|\s*&\s*|,(?=\s*[A-Z][a-z])/)
    .map((part) => part.trim().split(',')[0].trim())
    .filter(Boolean)
  if (surnames.length === 0) return authors
  if (surnames.length === 1) return surnames[0]
  if (surnames.length === 2) return `${surnames[0]} & ${surnames[1]}`
  return `${surnames[0]} et al.`
}

export default function Citation({
  sources,
  contribute = false,
}: {
  sources: EvidenceSource[]
  /** Render the "know research we're missing" invitation as this card's
   * closing row. Only the visible, lead card of a result should pass this —
   * see the comment on `.cat-contribute` in app.css for why. */
  contribute?: boolean
}) {
  if (!SOURCES_DB_READY) {
    return (
      <section className="catalog" aria-label={COPY.result.sourcesLabel}>
        <span className="catalog-hole" aria-hidden="true" />
        <header className="catalog-head catalog-head--pending">
          <span className="catalog-title">{COPY.result.sourcesLabel}</span>
        </header>
        <p className="catalog-pending">{COPY.result.sourcesPending}</p>
      </section>
    )
  }

  if (sources.length === 0) return null

  return (
    <section className="catalog" aria-label={COPY.result.sourcesLabel}>
      <span className="catalog-hole" aria-hidden="true" />
      <header className="catalog-head">
        <span className="catalog-title">{COPY.result.sourcesLabel}</span>
        <span className="catalog-held">
          {sources.length} {COPY.result.heldSuffix(sources.length)}
        </span>
      </header>

      {sources.map((s) => (
        <article className="cat-entry" key={s.url}>
          {/* Journal and year lead, in mono and darker — a card-catalog card
              files a thing by where it lives, not by its specific title. The
              article title is the detail underneath, and it stays the link
              because "doi" meant nothing to a reader. Journal names are also
              calmer to skim than article titles, which is the point on a page
              someone anxious is scanning. */}
          <p className="cat-venue">
            {s.venue} · {s.year}
          </p>
          <p className="cat-title">
            <a href={s.url} target="_blank" rel="noreferrer">
              {shortAuthors(s.authors)}, {s.title}
              {/* No visible arrow — decided after seeing four versions side
                  by side. The underline still marks it as a link, and screen
                  readers still get told it leaves the page. */}
              <span className="visually-hidden"> (opens the study in a new tab)</span>
            </a>
          </p>
        </article>
      ))}

      {/* Folded into the catalog card, not a loose paragraph after it
          (issue #55): the invitation is about sources — a correction to the
          evidence base — so it belongs with the sources, not detached below
          them. */}
      {contribute && (
        <p className="cat-contribute">
          {COPY.contribute.lead}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{COPY.contribute.cta}</a>
        </p>
      )}
    </section>
  )
}
