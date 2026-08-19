import { CONTACT_EMAIL } from '../data/contact'
import { COPY } from '../data/taxonomy'
import MailGlyph from './MailGlyph'

/**
 * "How this works" — the trust page.
 *
 * Modelled on what electioncheatsheet.org does well: say who you are, show your
 * method, give an address.
 *
 * Privacy lives on its OWN page (Privacy.tsx), not in a bullet here. "Is this
 * true?" and "is this safe for me to be reading?" are different worries, and a
 * reader who has the second one needs it answered before the first.
 *
 * Every claim on this page is checkable against the repo. If any of it stops
 * being true, this page is wrong and changes in the same commit.
 */
export default function About({ onBack, onPrivacy }: { onBack: () => void; onPrivacy: () => void }) {
  return (
    <div className="stack">
      <button type="button" className="btn-link" onClick={onBack}>
        ← Back
      </button>

      <h1 className="heading">How this works</h1>

      <section className="about-block">
        <h2 className="about-h">Where the research comes from.</h2>
        <p className="about-p">
          Every suggestion is tied to published studies you can open and read. Each
          one is checked before it ships: we confirm the study is real and
          registered, then read its abstract to make sure it says what we claim it
          says.
        </p>
        <p className="about-p">
          When research exists for a similar situation but not this exact one, the
          page says so in those words rather than blurring the difference.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-h">What we leave out.</h2>
        <p className="about-p">
          If we can't find solid evidence for a cause, it doesn't appear here at
          all. One is hidden right now for exactly that reason.
        </p>
      </section>

      {/*
        The one always-true line the app states without a citation, and the tag
        that makes that honest (G4). It is here rather than on the result screen
        by decision, 2026-08-09, after seeing all three options rendered: on the
        result screen it repeated what each card's own considerations already
        say, in a second register, and made a long page longer.

        The second sentence of the tag is load-bearing and is why this works
        from a page most readers never open. Every result carries a cause-
        specific version of this idea ("Follow their lead and back what they're
        asking for") sitting in a list otherwise made of evidence-derived
        limits. Saying plainly HERE that those lines are values rather than
        findings is what keeps them from reading as research claims — so if the
        result-screen bullets are ever reworded, this sentence has to still
        describe them.

        Rendered from COPY, never written inline: the tag was hardcoded in a
        component once before, and that is how it slipped past its own guard.
        `taxonomy.test.ts` asserts it renders here.
      */}
      <section className="about-block">
        <h2 className="about-h">{COPY.values.label}</h2>
        <p className="about-p">{COPY.values.metaPrinciple}</p>
        <p className="about-p about-p-quiet">
          {COPY.values.metaPrincipleValueTag} You’ll see a version of it on every result.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-h">What this isn't.</h2>
        <p className="about-p">
          Lower risk for you than for someone more exposed is not the same as safe,
          and context always matters. This isn't professional advice. Follow the
          lead of people already organizing on it.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-h">Your privacy.</h2>
        <p className="about-p">
          We don’t collect anything about you.{' '}
          <button type="button" className="lede-link" onClick={onPrivacy}>
            What that does and doesn’t cover
          </button>
        </p>
      </section>

      {/* No heading and no invitation sentence, 2026-08-10: an address at the
          foot of the page is already an offer to write, and saying so out loud
          read as instructing the reader how to feel about the sources. Same
          block, same glyph, as the foot of Privacy.tsx — the two pages are
          meant to end identically. */}
      <section className="about-block">
        <p className="about-p">
          <MailGlyph />
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
    </div>
  )
}
