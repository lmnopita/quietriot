import { describe, it, expect } from 'vitest'
import evidenceData from './evidence.json'
import { CAUSES, COPY, INSULATION_FORMS } from './taxonomy'

interface EvidenceSource {
  authors: string
  year: number
  title: string
  venue: string
  doi: string | null
  url: string
}

interface EvidenceEntry {
  id: string
  pattern: string
  why_lower_risk: string
  applies_to_privilege: string[]
  applies_to_causes: string[]
  low_risk_actions: string[]
  caveats: string[]
  sources: EvidenceSource[]
  confidence: string
  basis: string
  honest_limit_last?: boolean
}

const data = evidenceData as unknown as { _meta: { schema_version: number }; entries: EvidenceEntry[] }
const ENTRIES = data.entries

function isNonEmptyString(v: unknown): boolean {
  return typeof v === 'string' && v.trim().length > 0
}

describe('evidence.json — structural', () => {
  it('entry ids are unique and non-empty', () => {
    const ids = ENTRIES.map((e) => e.id)
    for (const id of ids) {
      expect(isNonEmptyString(id)).toBe(true)
    }
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every entry has non-empty pattern and why_lower_risk', () => {
    for (const e of ENTRIES) {
      expect(isNonEmptyString(e.pattern)).toBe(true)
      expect(isNonEmptyString(e.why_lower_risk)).toBe(true)
    }
  })

  it('low_risk_actions and caveats are non-empty arrays of non-empty strings', () => {
    for (const e of ENTRIES) {
      expect(Array.isArray(e.low_risk_actions)).toBe(true)
      expect(e.low_risk_actions.length).toBeGreaterThan(0)
      for (const a of e.low_risk_actions) expect(isNonEmptyString(a)).toBe(true)

      expect(Array.isArray(e.caveats)).toBe(true)
      expect(e.caveats.length).toBeGreaterThan(0)
      for (const c of e.caveats) expect(isNonEmptyString(c)).toBe(true)
    }
  })

  it('low_risk_actions are unique within an entry (ResultCard.tsx keys on action text)', () => {
    for (const e of ENTRIES) {
      expect(new Set(e.low_risk_actions).size).toBe(e.low_risk_actions.length)
    }
  })

  it('caveats are unique within an entry (ResultCard.tsx keys on caveat text)', () => {
    for (const e of ENTRIES) {
      expect(new Set(e.caveats).size).toBe(e.caveats.length)
    }
  })

  it('confidence is one of the allowed values', () => {
    for (const e of ENTRIES) {
      expect(['well-established', 'mixed', 'emerging']).toContain(e.confidence)
    }
  })

  it('basis is one of the allowed values', () => {
    for (const e of ENTRIES) {
      expect(['direct', 'extrapolated']).toContain(e.basis)
    }
  })

  it('_meta.schema_version is 2', () => {
    expect(data._meta.schema_version).toBe(2)
  })
})

describe('evidence.json — sources (Citation.tsx keys on s.url with no fallback)', () => {
  it('every entry has at least one source', () => {
    for (const e of ENTRIES) {
      expect(Array.isArray(e.sources)).toBe(true)
      expect(e.sources.length).toBeGreaterThan(0)
    }
  })

  it('every source has a non-empty url', () => {
    for (const e of ENTRIES) {
      for (const s of e.sources) {
        expect(isNonEmptyString(s.url)).toBe(true)
      }
    }
  })

  it('source urls are unique within an entry', () => {
    for (const e of ENTRIES) {
      const urls = e.sources.map((s) => s.url)
      expect(new Set(urls).size).toBe(urls.length)
    }
  })

  it('source urls are unique across the pooled set of entries for any given cause (the result screen pools by cause)', () => {
    const causeIds = new Set(ENTRIES.flatMap((e) => e.applies_to_causes))
    for (const causeId of causeIds) {
      const pooledUrls = ENTRIES.filter((e) => e.applies_to_causes.includes(causeId)).flatMap((e) =>
        e.sources.map((s) => s.url),
      )
      expect(new Set(pooledUrls).size).toBe(pooledUrls.length)
    }
  })

  it('every source has non-empty authors, title, venue, and a sane year', () => {
    const currentYear = new Date().getFullYear()
    for (const e of ENTRIES) {
      for (const s of e.sources) {
        expect(isNonEmptyString(s.authors)).toBe(true)
        expect(isNonEmptyString(s.title)).toBe(true)
        expect(isNonEmptyString(s.venue)).toBe(true)
        expect(typeof s.year).toBe('number')
        expect(s.year).toBeGreaterThan(1900)
        expect(s.year).toBeLessThanOrEqual(currentYear)
      }
    }
  })

  it('doi, where present, is a string starting with "10."', () => {
    for (const e of ENTRIES) {
      for (const s of e.sources) {
        if (s.doi !== null && s.doi !== undefined) {
          expect(typeof s.doi).toBe('string')
          expect(s.doi.startsWith('10.')).toBe(true)
        }
      }
    }
  })
})

describe('evidence.json — referential integrity', () => {
  it('every applies_to_privilege tag exists as a form id in INSULATION_AXES', () => {
    const validFormIds = new Set(INSULATION_FORMS.map((f) => f.id))
    for (const e of ENTRIES) {
      for (const tag of e.applies_to_privilege) {
        expect(validFormIds.has(tag)).toBe(true)
      }
    }
  })

  it('every applies_to_causes id exists in CAUSES', () => {
    const validCauseIds = new Set(CAUSES.map((c) => c.id))
    for (const e of ENTRIES) {
      for (const causeId of e.applies_to_causes) {
        expect(validCauseIds.has(causeId)).toBe(true)
      }
    }
  })
})

/**
 * PRINCIPLES.md "When a claim is applied from similar research".
 *
 * Until 2026-08-09 the disclosure was a verbatim template at the head of
 * `why_lower_risk`, so it was obvious on sight when one went missing. It now
 * lives in the considerations, where it reads better and where nothing but
 * this test would notice it being trimmed by a copy edit that "tightened" a
 * bullet list.
 *
 * The match is deliberately loose — the wording varies per entry, and forcing
 * one sentence is what the move away from a fixed template was for. What is
 * NOT optional is that an entry whose reassurance is borrowed from other
 * research says so somewhere a reader will see it.
 */
describe('evidence.json — extrapolated entries disclose that they are extrapolated', () => {
  const DISCLOSURE = /(other|similar) situations|carrying over|comes from research on/i

  it('every basis:extrapolated entry has a caveat naming the borrowed evidence', () => {
    const extrapolated = ENTRIES.filter((e) => e.basis === 'extrapolated')
    // Guards against a vacuous pass if the corpus ever holds no such entry.
    expect(extrapolated.length).toBeGreaterThan(0)

    for (const e of extrapolated) {
      const discloses = e.caveats.some((c: string) => DISCLOSURE.test(c))
      expect(discloses, `${e.id} is extrapolated but no caveat says so`).toBe(true)
    }
  })
})

/**
 * PRINCIPLES #2 — the honest limit, now rendered once per card from
 * `COPY.result.honestLimit` rather than stored nine times.
 *
 * Two things to hold. The line must exist and must actually say the thing; and
 * no entry may quietly grow its own copy back, which is what produced the
 * seven diverging, editorialising versions this replaced.
 */
describe('the honest limit is shared, and stays shared', () => {
  it('the shared line exists and says lower-risk-is-not-no-risk', () => {
    expect(typeof COPY.result.honestLimit).toBe('string')
    expect(COPY.result.honestLimit.toLowerCase()).toContain('no risk')
  })

  it('no entry carries its own version of it', () => {
    for (const e of ENTRIES) {
      for (const caveat of e.caveats) {
        expect(
          caveat.toLowerCase().includes('lower risk isn’t no risk') ||
            caveat.toLowerCase().includes("lower risk isn't no risk"),
          `${e.id} has grown its own honest-limit caveat back`,
        ).toBe(false)
      }
    }
  })

  it('every entry still has at least one caveat of its own', () => {
    // The shared line is an addition, not a replacement for entry-specific
    // limits. An entry with nothing of its own to say is a drafting error.
    for (const e of ENTRIES) {
      expect(e.caveats.length, `${e.id} has no caveats of its own`).toBeGreaterThan(0)
    }
  })
})
