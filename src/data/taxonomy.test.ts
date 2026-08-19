import { describe, it, expect } from 'vitest'
import aboutSource from '../components/About.tsx?raw'
import { COPY } from './taxonomy'

function isNonEmptyString(v: unknown): boolean {
  return typeof v === 'string' && v.trim().length > 0
}

// G4 (closed 2026-08-08). The meta-principle is the single always-true line
// the app states without a citation. It earns that by naming itself a value
// rather than a finding — so the tag doing the naming is load-bearing, not
// decoration. These tests exist so removing it fails CI instead of quietly
// turning a values statement back into an evidence claim.
//
// Moved twice on 2026-08-09, and the reason is worth keeping. It first
// asserted the tag rendered in EmptyState — a component that had become
// unreachable — so it PASSED the whole time the label appeared nowhere in the
// product. A guard can only be as true as the screen it points at. It then
// followed the block to the result screen, and now to About, where the block
// landed after the three layouts were rendered and compared.
//
// The lesson each time: assert against the screen the copy actually renders on,
// and re-point the assertion whenever the copy moves.
describe('meta-principle — values framing (G4)', () => {
  it('the value tag exists and is non-empty', () => {
    expect(isNonEmptyString(COPY.values.metaPrincipleValueTag)).toBe(true)
  })

  it('the tag disclaims research backing in plain language', () => {
    const tag = COPY.values.metaPrincipleValueTag.toLowerCase()
    // Must say what it IS (a value) and what it is NOT (a study finding).
    // Asserting on meaning-bearing words rather than the exact sentence, so
    // the copy can be reworded without a spurious failure — but it cannot be
    // reworded into something that drops the disclaimer.
    expect(tag).toContain('value')
    expect(tag).toMatch(/not|never/)
    expect(tag).toMatch(/stud(y|ies)|research|evidence|proved|proven/)
  })

  it('the meta-principle itself is still present', () => {
    expect(isNonEmptyString(COPY.values.metaPrinciple)).toBe(true)
  })

  it('About renders the principle AND its tag, from COPY', () => {
    // Both, not just the tag: a principle rendered without its label is the
    // failure mode, and rendering the label alone would be meaningless.
    expect(aboutSource).toContain('COPY.values.metaPrinciple')
    expect(aboutSource).toContain('COPY.values.metaPrincipleValueTag')
  })

  it('the tag is not hardcoded into the page', () => {
    // It lived hardcoded in a component until 2026-08-08. Re-hardcoding would
    // slip past every assertion above, since those only read COPY.
    expect(aboutSource).not.toContain('not something a study proved')
  })

  // The value now sits on a page most readers never open, while every result
  // carries a cause-specific version of the same idea in a list otherwise made
  // of evidence-derived limits. This sentence is what ties the two together —
  // without it, the label stops covering the lines it is supposed to cover.
  it('About says the value appears on the results too', () => {
    expect(aboutSource).toMatch(/on every result/i)
  })
})
