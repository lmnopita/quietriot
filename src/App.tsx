import { useEffect, useMemo, useRef, useState } from 'react'
import './styles/app.css'
import Landing from './components/Landing'
import CausePicker from './components/CausePicker'
import ResultList from './components/ResultList'
import ThemeToggle from './components/ThemeToggle'
import About from './components/About'
import Privacy from './components/Privacy'
import SiteFooter from './components/SiteFooter'
import { CAUSES } from './data/taxonomy'
import { entriesForCause } from './lib/match'

type Step = 'landing' | 'cause' | 'result' | 'about' | 'privacy'

/** Steps that are pages you visit and come back from, not stops in the flow. */
type Aside = 'about' | 'privacy'

/**
 * Landing -> cause -> result. Three steps, and the reader is never asked
 * anything about themselves.
 *
 * A self-check step sat between the cause and the result until 2026-08-09: it
 * asked which of a few things were true of you ("I'm white", "I'm a citizen")
 * and matched entries against the answer. It is gone, and the tool is lighter
 * for it. Three reasons, in order of weight:
 *
 *  1. It made a tool for acting into a tool for reflecting. Someone came to
 *     find one thing they could do and was asked to inventory their position
 *     first.
 *  2. Skipping it was offered, and skipping it was a worse experience —
 *     `matchEntries([])` returns nothing, so anyone who took the offer landed
 *     on the empty state and saw patterns without actions. The escape hatch
 *     quietly punished the people who used it.
 *  3. It was the only thing on the site that looked like it collected data. It
 *     never did — nothing left the device — but "answer some questions about
 *     your identity" is a thing a nervous reader has to be *talked out of*
 *     worrying about, and now there is nothing to talk them out of.
 *
 * Every entry for a cause is shown instead of a matched subset. The reader
 * decides what applies to them, which is what they were doing anyway.
 *
 * `applies_to_privilege` is still on every entry and still audited by
 * evidence.test.ts. It no longer routes anybody; it records who each entry is
 * about, which is still true and still worth knowing.
 */
export default function App() {
  const [step, setStep] = useState<Step>('landing')
  /**
   * Where to return to when a reader leaves an aside.
   *
   * The footer offers About and Privacy from every screen, so "back" cannot be
   * a fixed destination: a reader who opens Privacy while reading their result
   * used to land on About — a page they had never seen — whose own back button
   * dropped them at the landing page, with no route to the result they had
   * just built. Remember where they were instead.
   */
  const [returnTo, setReturnTo] = useState<Step>('landing')

  const openAside = (aside: Aside) => {
    // Only remember a step that is a real place to come back to. Opening
    // Privacy from About should still return to whatever preceded About.
    setStep((current) => {
      if (current !== 'about' && current !== 'privacy') setReturnTo(current)
      return aside
    })
  }
  const [causeId, setCauseId] = useState<string | null>(null)

  const entries = useMemo(() => (causeId ? entriesForCause(causeId) : []), [causeId])

  const causeLabel = causeId ? CAUSES.find((c) => c.id === causeId)?.label : undefined

  /**
   * Move focus to the new screen whenever the step changes.
   *
   * Without it, focus stays on `<body>` through the whole flow: the button a reader just pressed
   * unmounts, focus falls back to the document, and the next Tab starts again
   * from the top of the page. A screen reader announces nothing at all, so
   * there is no signal that the screen changed.
   *
   * It matters more now, not less. Removing the self-check took out a step, so
   * a larger share of the journey is screen-to-screen with nothing else to
   * announce the change.
   *
   * Focus lands on the step container rather than a heading, because the
   * heading differs per step. Deliberately NOT paired with an aria-live region:
   * moving focus is already the announcement, and doing both reads it twice.
   */
  const stepRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the initial render. Stealing focus on page load would drop a reader
    // past the top of the document before they have read anything.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    stepRef.current?.focus()
  }, [step])

  return (
    <main className="shell">
      <ThemeToggle />

      <div ref={stepRef} tabIndex={-1} className="step-focus">
        {step === 'landing' && <Landing onStart={() => setStep('cause')} />}

        {step === 'about' && (
          <About onBack={() => setStep(returnTo)} onPrivacy={() => openAside('privacy')} />
        )}

        {step === 'privacy' && <Privacy onBack={() => setStep(returnTo)} />}

        {step === 'cause' && (
          <CausePicker
            onSelect={(id) => {
              setCauseId(id)
              setStep('result')
            }}
            onBack={() => setStep('landing')}
          />
        )}

        {step === 'result' && causeId && (
          <div className="stack">
            <button type="button" className="btn-link" onClick={() => setStep('cause')}>
              ← Try another cause
            </button>

            {/* The result screen had no heading at all — headings started
                inside ResultCard, so a screen reader had nothing to announce on
                arrival at the one screen the whole product exists to deliver.
                Screen-reader-only by decision: a visible heading here would put
                a second large element above the action zone, and the action is
                meant to land first.

                Both lines read from `causeLabel`, so they cannot drift apart.
                The visible kicker is aria-hidden because this heading already
                says the same thing — otherwise it is announced twice in a row.

                Unconditional now. It used to be suppressed on the empty-state
                path, which rendered its own h1; that path no longer exists. */}
            {causeLabel && <h1 className="visually-hidden">Standing with {causeLabel}</h1>}
            {causeLabel && (
              <p className="kicker" aria-hidden="true">
                Standing with: {causeLabel}
              </p>
            )}

            <ResultList entries={entries} />

            {/* The values note lived here for one afternoon. Moved to About
                2026-08-09 after rendering all three options side by side: on
                this screen it repeated what the considerations above already
                say, in a second register, and lengthened the one page a reader
                is meant to act from. See About.tsx for why the label still
                works from there. */}

            {/* The invitation to contribute is rendered inside the lead card's
                sources block, where corrections are most useful. */}
          </div>
        )}
      </div>

      {/* Every step except the pages it points at — a link to the page you're
          already on is noise. */}
      {step !== 'privacy' && step !== 'about' && (
        <SiteFooter onPrivacy={() => openAside('privacy')} onAbout={() => openAside('about')} />
      )}
    </main>
  )
}
