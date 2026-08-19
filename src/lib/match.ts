/**
 * Which entries a cause has, and which causes are safe to offer.
 *
 * No AI, no network, no keys. This was a tag-intersection matcher until
 * 2026-08-09 (PLAN.md "Matching (Phase 1)") — entry tags intersected with the
 * reader's self-check answers, ranked by overlap. The self-check is gone, so
 * nothing is intersected with anything: a cause shows its whole shelf.
 *
 * `confidence` and `basis` are audit-only (see evidence.json _meta) and are
 * exposed here for internal use only — components must not render them to the
 * reader (PRINCIPLES.md "How answers read to users").
 */
import evidenceData from '../data/evidence.json'
import { CAUSES, type Cause } from '../data/taxonomy'

export interface EvidenceSource {
  authors: string
  year: number
  title: string
  venue: string
  doi: string | null
  url: string
}

export interface EvidenceEntry {
  id: string
  pattern: string
  why_lower_risk: string
  applies_to_privilege: string[]
  applies_to_causes: string[]
  low_risk_actions: string[]
  caveats: string[]
  sources: EvidenceSource[]
  confidence: 'well-established' | 'mixed' | 'emerging'
  basis: 'direct' | 'extrapolated'
  risk_level: number | null
  need_level: number | null
  accessibility: number | null
  /**
   * Rendering directive, not audit metadata: when true the shared honest-limit
   * line renders last among the entry's considerations instead of first. It
   * moves the line, never removes or rewords it (see evidence.json _meta).
   */
  honest_limit_last?: boolean
}

const ENTRIES = (evidenceData as unknown as { entries: EvidenceEntry[] }).entries

export interface MatchedEntry {
  entry: EvidenceEntry
  /** Count of the entry's privilege tags present in the user's selection. */
  overlap: number
}

/**
 * Causes with at least one vetted entry — the only ones ever surfaced
 * (taxonomy.ts checkpoint #2 decision C: no empty shelves).
 */
export function availableCauses(): Cause[] {
  const causeIdsWithEntries = new Set(ENTRIES.flatMap((e) => e.applies_to_causes))
  return CAUSES.filter((c) => causeIdsWithEntries.has(c.id))
}

/**
 * Every vetted entry for a cause, in declaration order.
 *
 * This is what the result screen renders. It was a private helper behind
 * `matchEntries` until 2026-08-09, when the self-check was removed: with
 * nothing known about the reader there is nothing to filter on, so the whole
 * shelf for a cause is the answer.
 */
export function entriesForCause(causeId: string): EvidenceEntry[] {
  return ENTRIES.filter((e) => e.applies_to_causes.includes(causeId))
}

/*
 * `insulationAxesForCause`, `overlapCount`, `matchEntries` and `nearestMatches`
 * lived here until 2026-08-09. They powered the self-check step: entry tags
 * intersected with the reader's answers, ranked by overlap.
 *
 * All four went with that step. `matchEntries` returned nothing for an empty
 * selection, which is why "skip" landed on the empty state rather than on
 * results — the escape hatch punished the readers who took it. `entriesForCause`
 * above is the whole of the matching logic now.
 *
 * `INSULATION_AXES` and every `applies_to_privilege` tag stay in the data.
 * They are audit-only now: evidence.test.ts asserts referential integrity
 * against them, and they record who each entry is about, which is still true.
 */
