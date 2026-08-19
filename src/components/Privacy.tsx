import { CONTACT_EMAIL } from '../data/contact'
import MailGlyph from './MailGlyph'

/**
 * Privacy and safety, kept separate from the research method (2026-08-04)
 * because they answer different worries. "Is this true?" and "is this safe for
 * me to be reading?" are not the same question, and someone who needs the
 * second one needs it before they need the first.
 *
 * Rewritten 2026-08-06 for a reader who is anxious and skimming: the one
 * thing they need is "you are not being tracked," said first and short.
 * Everything else here is still accurate, just no longer the headline:
 *
 *  1. A host sees requests. Claiming "nothing leaves this page" would be false
 *     the moment this is deployed anywhere, because every web server logs an
 *     IP and a timestamp. Overclaiming privacy is worse than claiming none: a
 *     reader may act on it. Said briefly, not buried.
 *  2. Outbound links leak. Tapping through to a study tells THAT site someone
 *     arrived. Stated as a plain fact, not as guidance about what a reader
 *     should be careful about, that reads as paternal and this page doesn't
 *     do that.
 *
 * Updated 2026-08-09, when the self-check was removed. The claims here got
 * STRONGER, not weaker: the app no longer asks the reader anything, so
 * "nothing you check leaves your device" became a promise about a thing that
 * cannot happen. It now says there is nothing to collect, which is a plainer
 * and more absolute statement than the one it replaced.
 *
 * Two blocks were dropped in the same pass. "If you're worried about being
 * seen here" (browser history, shared devices, private windows) went because
 * it advised the reader on their own threat model, which is the paternal
 * register this page avoids elsewhere. The detention-statistics link left the
 * cause cards, so outbound links are now only ever journals.
 */
export default function Privacy({ onBack }: { onBack: () => void }) {
  return (
    <div className="stack">
      <button type="button" className="btn-link" onClick={onBack}>
        ← Back
      </button>

      <h1 className="heading">Privacy and safety</h1>

      <section className="about-block">
        <h2 className="about-h">We don’t collect anything about you.</h2>
        <p className="about-p">
          No accounts, no cookies, no analytics, no tracking. We never ask you
          anything about yourself. The only thing saved is light or dark mode,
          kept in your own browser.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-h">What the server sees.</h2>
        <p className="about-p">
          Every host logs requests: an IP, a time, a page. That is all there is
          to log, because nothing about you is ever sent.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-h">How the site works.</h2>
        <p className="about-p">
          This is a static site: a set of files your browser downloads and
          runs. There is no server-side code, no database, and no account
          system, so there is nowhere for information about you to be
          stored. The research ships with the page, and selecting a cause here
          doesn’t send a request anywhere.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-h">Research methodology.</h2>
        <p className="about-p">
          We only reference publications we can source. Every study is reviewed
          before it ships, and a cause with no solid evidence stays off the site
          rather than being filled with something weaker.
        </p>
      </section>

      <section className="about-block">
        <h2 className="about-h">Some links leave this site.</h2>
        <p className="about-p">
          A few direct to a study’s journal. Opening one tells that site someone
          arrived, just as if you had typed in the address yourself. The sources
          are there so you can check us.
        </p>
      </section>

      <section className="about-block">
        <p className="about-p">
          <MailGlyph />
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
    </div>
  )
}
