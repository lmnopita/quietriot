import { describe, it, expect } from 'vitest'
import { availableCauses, entriesForCause } from './match'
import { CAUSES, INSULATION_AXES } from '../data/taxonomy'
import evidenceData from '../data/evidence.json'

const ENTRIES = (evidenceData as unknown as { entries: Array<{ id: string; applies_to_causes: string[]; applies_to_privilege: string[] }> }).entries

/*
 * The suites for `insulationAxesForCause`, `matchEntries` and `nearestMatches`
 * were removed 2026-08-09 with the functions themselves, when the self-check
 * step went. They tested tag intersection, overlap ranking and tie-breaking —
 * behaviour the product no longer has.
 *
 * What replaced them is smaller on purpose. There is one question left to ask
 * of this module: does a cause show exactly its own vetted entries, and never
 * an empty shelf?
 */

describe('availableCauses', () => {
  it('returns only causes that appear in some entry applies_to_causes', () => {
    const causeIdsWithEntries = new Set(ENTRIES.flatMap((e) => e.applies_to_causes))
    for (const cause of availableCauses()) {
      expect(causeIdsWithEntries.has(cause.id)).toBe(true)
    }
  })

  it('preserves CAUSES declaration order', () => {
    const result = availableCauses()
    const expectedOrder = CAUSES.filter((c) => result.some((r) => r.id === c.id)).map((c) => c.id)
    expect(result.map((c) => c.id)).toEqual(expectedOrder)
  })

  // Stated generically on purpose. This used to name `trans` and `unhoused`
  // literally, which meant it kept passing for the wrong reason once `trans` was
  // removed from the taxonomy entirely (2026-08-08) — an assertion about a cause
  // that no longer exists proves nothing. Derived from the data, it now fails if
  // any entry-less cause is ever offered as a shelf.
  it('offers no cause that has zero entries (no empty shelves)', () => {
    const causeIdsWithEntries = new Set(ENTRIES.flatMap((e) => e.applies_to_causes))
    const withoutEntries = CAUSES.filter((c) => !causeIdsWithEntries.has(c.id)).map((c) => c.id)
    expect(withoutEntries).toContain('unhoused')
    const offered = availableCauses().map((c) => c.id)
    for (const id of withoutEntries) {
      expect(offered).not.toContain(id)
    }
  })
})

describe('entriesForCause', () => {
  it('returns exactly the entries tagged with that cause', () => {
    for (const cause of CAUSES) {
      const expected = ENTRIES.filter((e) => e.applies_to_causes.includes(cause.id))
        .map((e) => e.id)
        .sort()
      const actual = entriesForCause(cause.id).map((e) => e.id).sort()
      expect(actual).toEqual(expected)
    }
  })

  /*
   * The guarantee the result screen rests on. Every cause a reader can pick
   * returns at least one entry, so the result screen cannot render empty —
   * which is what lets the empty-state branch be gone rather than merely
   * unreachable.
   */
  it('returns at least one entry for every cause a reader can reach', () => {
    const causes = availableCauses()
    expect(causes.length).toBeGreaterThan(0)
    for (const cause of causes) {
      expect(entriesForCause(cause.id).length).toBeGreaterThan(0)
    }
  })

  it('returns nothing for a cause id that does not exist', () => {
    expect(entriesForCause('not-a-real-cause')).toEqual([])
  })

  // Declaration order in evidence.json decides which entry leads the result
  // screen, now that nothing ranks them. Worth asserting, because it is a
  // product decision hiding in a data file: reorder the entries and you change
  // which action a reader is offered first.
  it('preserves evidence.json declaration order', () => {
    for (const cause of availableCauses()) {
      const expected = ENTRIES.filter((e) => e.applies_to_causes.includes(cause.id)).map((e) => e.id)
      expect(entriesForCause(cause.id).map((e) => e.id)).toEqual(expected)
    }
  })
})

/*
 * INSULATION_AXES no longer drives any screen. It is kept because
 * evidence.test.ts asserts every `applies_to_privilege` tag resolves to a form
 * id in it, and because those tags still record who each entry is about.
 *
 * This asserts the data stays coherent so that audit keeps meaning something.
 */
describe('INSULATION_AXES (audit-only since the self-check was removed)', () => {
  it('every axis has at least one form, and every form id is unique', () => {
    const ids: string[] = []
    for (const axis of INSULATION_AXES) {
      expect(axis.forms.length).toBeGreaterThan(0)
      for (const form of axis.forms) ids.push(form.id)
    }
    expect(new Set(ids).size).toBe(ids.length)
  })
})
