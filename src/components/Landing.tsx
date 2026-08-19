import { COPY } from '../data/taxonomy'

export default function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="stack hero">
      <p className="kicker">{COPY.brand}</p>

      <h1 className="headline">{COPY.landing.headline}</h1>

      <p className="lede">{COPY.landing.lede}</p>

      {/* The "All grounded in real research." link was removed 2026-08-09. It
          asserted the project's credibility on the landing page, which is the
          one place it cannot yet have been earned; "How this works" in the
          persistent footer reaches the same page without the claim. */}

      <button type="button" className="btn" onClick={onStart}>
        {COPY.landing.cta}
      </button>

      {/* `COPY.landing.notice` used to render here. It moved to the site footer
          2026-08-09 so it carries on every screen — and the footer sits
          directly beneath this block, so keeping both put two disclaimers in
          one eyeful, which is how a reader learns to skip both. */}
    </div>
  )
}
