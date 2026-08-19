/**
 * The one persistent element in the app, on every screen.
 *
 * Privacy was previously buried two clicks deep, which meant the reader who
 * most needs it — someone nervous about being seen reading this at all — had to
 * go looking before they'd trust the page enough to look. A reassurance only
 * works where the worry is, so it now sits under every step.
 *
 * Labelled "Privacy — we don't track you": the conventional word so nobody has
 * to work out what the link is, plus the fact, because the fact is what
 * reassures and the page is only there for anyone who wants it proven.
 *
 * NOT "you're safe here", which was considered and rejected. This product never
 * promises safety — PRINCIPLES #2 is lower relative risk, never safe — and a
 * footer promising it on every screen would quietly contradict every hedged
 * sentence above it.
 */
import { COPY } from '../data/taxonomy'

export default function SiteFooter({
  onPrivacy,
  onAbout,
}: {
  onPrivacy: () => void
  onAbout: () => void
}) {
  return (
    <footer className="site-foot">
      <div className="site-foot-links">
        <button type="button" className="site-foot-link" onClick={onPrivacy}>
          Privacy: we don’t track you
        </button>
        <span className="site-foot-sep" aria-hidden="true">
          ·
        </span>
        <button type="button" className="site-foot-link" onClick={onAbout}>
          How this works
        </button>
      </div>

      {/* The short notice, moved here 2026-08-09 from the landing page so it
          carries on every screen. The landing no longer renders its own copy —
          the footer sits directly beneath it there, and two disclaimers in one
          eyeful is how a reader learns to skip both.

          The longer `disclaimers.notAdvice` deliberately stays on the result
          screen. It names the project and what it does, which is worth saying
          beside an actual claim and is noise underneath the cause picker. */}
      <p className="site-foot-notice">{COPY.landing.notice}</p>
    </footer>
  )
}
