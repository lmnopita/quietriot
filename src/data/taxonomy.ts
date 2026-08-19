/**
 * taxonomy.ts — the shared vocabulary of the app.
 *
 * This file is live, and everything downstream keys on it: `match.ts` reads the
 * causes, every component reads `COPY`, and `evidence.json` references the ids
 * below by hand. It was labelled "a DRAFT for review — nothing downstream is
 * built on it yet" from the day it was written until 2026-08-09, long after all
 * three of those became true. A false claim at the top of the most load-bearing
 * file in the project is worse than no comment at all, because it tells the
 * next reader they can change things freely.
 *
 * It defines three things, and only these three:
 *   1. the forms of social insulation a person might have to spend,
 *   2. the causes they might stand with,
 *   3. all user-facing copy that isn't tied to a specific evidence entry.
 *
 * The `id` on every insulation form and cause is the canonical tag that
 * `evidence.json` entries reference in `applies_to_privilege` /
 * `applies_to_causes`. Change an id here and every entry that uses it must
 * change too — so this file is the thing to get right BEFORE any evidence is
 * written. That's why it's its own checkpoint.
 *
 * Everything here answers to docs/PRINCIPLES.md. In particular:
 *   #2 lower *relative* risk, never "safe"  → labels never imply safety.
 *   #3 solidarity, not saviorism            → "stand with", "spend", "insulation
 *                                              you have"; never "save/help/give
 *                                              voice to".
 *   #4 offer and invite, never command      → prompts are invitations, phrased
 *                                              "if it fits", never "you should".
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CHECKPOINT #2 — RESOLVED (2026-07-16). Settled decisions; don't re-derive.
 *
 *  A. GENDER is two axes that point opposite ways by domain, modeled WITHOUT a
 *     "being a woman is a privilege" checkbox. `man` is selectable insulation
 *     only for the sexism domain (a man confronting sexism absorbs less
 *     backlash — the Drury & Kaiser mechanism). The gender axis is OPTIONAL /
 *     skippable (`optional: true`) — it only matters in specific domains.
 *     The stigmatized-breed-dog domain keys on `white` (the strongly-evidenced,
 *     racial part — pit bulls racially coded as "Black-owned"), NOT on
 *     womanhood. The "a woman reads as less threatening" component is more
 *     inferential; it is handled inside that entry's "why it applies to you"
 *     prose with its own honest confidence marker, and the race evidence
 *     carries the entry. (Guardrail for the evidence step — do not over-claim
 *     the messenger-appearance part.)
 *
 *  B. CONVENTIONAL-APPEARANCE / "reads as non-threatening" is NOT a
 *     user-selectable trait — removed. The mechanism lives inside the relevant
 *     evidence entry's "why it applies to you" text, which must name honestly
 *     that this social read is shaped by race, body, and class and isn't
 *     equally available to everyone. No self-select checkbox for it.
 *
 *  C. CAUSES: broad everyday set + the dog domain (locked). Surface a cause
 *     ONLY if it has ≥1 real vetted entry; hide zero-entry causes rather than
 *     showing them empty (a build-time rule for the CausePicker). No
 *     fabrication surface.
 *
 *  D. Headline: default kept; the other two candidates stay swappable in the
 *     comment below. No copy in this file is final.
 *
 *  E. EVERY SELF-CHECK OPTION MUST EARN ITS PLACE (added 2026-07-16). The
 *     PositionPicker shows an insulation form ONLY if at least one vetted
 *     entry keys on it (`availableInsulationAxes()` in match.ts) — the mirror
 *     of decision C for causes. A tag that surfaces nothing is a dead end and
 *     "leads the witness"; we don't ask what we can't use, and we never add a
 *     tag for reflection alone. Unbacked axes below stay in the data as latent
 *     roadmap; they reappear in the UI when an entry starts keying on them
 *     (e.g. `citizen` returns once the immigrants entry ships).
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ========================================================================
 * Types
 * ==================================================================== */

/** A single form of social insulation, individually selectable. */
export interface InsulationForm {
  /** Canonical tag — must match evidence.json `applies_to_privilege`. */
  id: string;
  /** How it read as a checkbox, back when there was one. */
  label: string;
  /*
   * `hint` was removed 2026-08-09. It clarified each option under its checkbox
   * on the self-check screen, which no longer exists — so eight strings of dead
   * copy were still being emitted into COPY-REVIEW.md for a human to review,
   * and all of them addressed the reader ("Your status isn't on the line…")
   * long after the app stopped speaking that way. What each tag MEANS is now a
   * comment beside it, which is who actually needs it: whoever tags an entry's
   * `applies_to_privilege`.
   */
}

/** A grouping axis for insulation forms (purely for legible UX). */
export interface InsulationAxis {
  id: string;
  /** The calm, inviting question that heads this group. */
  question: string;
  /**
   * If true, the picker presents this axis as explicitly skippable and only
   * relevant in specific domains (currently: gender). Absence means the axis
   * is offered like any other — still not required (the whole picker is
   * opt-in), just not called out as domain-narrow.
   */
  optional?: boolean;
  /** Optional quieter note under the question (e.g. "skip if not relevant"). */
  note?: string;
  forms: InsulationForm[];
}

/** A cause / domain a person might stand with. */
export interface Cause {
  /** Canonical tag — must match evidence.json `applies_to_causes`. */
  id: string;
  label: string;
  /*
   * `blurb` and `blurbSource` were removed 2026-08-09. Cause cards render a
   * label and nothing else, so both had stopped being reader-facing while
   * still appearing in COPY-REVIEW.md — asking a human to review copy no
   * reader can see. What each cause covers is now a comment beside it, which
   * documents scope without pretending to be product copy.
   */
}

/* ========================================================================
 * Insulation forms — "the safety you might have to spend"
 *
 * These are relative and context-dependent by construction (#2). The picker
 * copy (below) frames them as "insulation you *might* hold in some rooms",
 * never as fixed status. A person checks what's true for them; the matcher
 * intersects their set with each entry's `applies_to_privilege`.
 * ==================================================================== */

export const INSULATION_AXES: InsulationAxis[] = [
  {
    id: 'race',
    question: 'Race',
    forms: [
      {
        id: 'white',
        label: 'I’m white',
        // A hard question from a white person meets less pushback in many rooms.
      },
    ],
  },
  {
    id: 'orientation',
    question: 'Sexual orientation',
    forms: [
      {
        id: 'straight',
        label: 'I’m straight',
        // Speaking up for LGBTQIA+ folk from outside the group.
      },
    ],
  },
  {
    id: 'gender',
    question: 'Gender',
    optional: true,
    note: 'Optional — this one only matters in certain situations, like sexism at work. Skip it if it doesn’t feel relevant.',
    forms: [
      {
        id: 'cisgender',
        label: 'I’m cisgender (not transgender)',
      },
      {
        id: 'man',
        label: 'I’m a man',
        // A man naming sexism is often heard with less pushback than a woman speaking for herself.
      },
    ],
  },
  {
    id: 'citizenship',
    question: 'Citizenship & documentation',
    forms: [
      {
        id: 'citizen',
        label: 'I’m a citizen or securely documented',
        // Status is not on the line the way an undocumented neighbor’s can be.
      },
    ],
  },
  {
    id: 'economic',
    question: 'Economic cushion',
    forms: [
      {
        id: 'economic-cushion',
        label: 'I could absorb some cost without it capsizing my life',
        // A job, a rainy-day fund, housing that survives one hard conversation.
      },
    ],
  },
  {
    // Renamed 2026-08-04 (flagged in review): "able-bodied" centres the BODY,
    // which writes out chronic illness, mental-health conditions and
    // neurodivergence — someone with lupus or long COVID is disabled with what
    // most people would call an able body. The old label also mashed together
    // *being* non-disabled and *being read as* non-disabled, which are
    // different situations with different stakes.
    //
    // More importantly it named the wrong thing. The evidence (Baldridge &
    // Veiga 2006) locates the cost in asking for YOUR OWN accommodation — that
    // is what reads as an imposition. So the tag is situational, not an
    // identity: it asks whether you'd be asking for yourself. Someone with an
    // invisible condition who doesn't need this particular access is genuinely
    // the lower-risk messenger; someone who does need it is the exposed one.
    //
    // "Abled" was considered (2026-08-04) and is the better IDENTITY
    // term than "able-bodied" — it doesn't centre the body. It was not used
    // because it doesn't fix the actual problem: a person with ME/CFS or a
    // psychiatric disability is not abled, yet can still be the lower-risk
    // messenger for an access need that isn't theirs. An identity label
    // shuts them out of a role they can genuinely fill. Use "abled" if this
    // ever needs an identity framing; the situational one includes more
    // people and matches what the evidence measures.
    id: 'disability',
    question: 'Access',
    forms: [
      {
        id: 'access-not-mine',
        label: 'I’m not the one who needs this access',
        // Chronic illness and disability are not always visible; what matters is whether the person would be asking for themselves.
      },
    ],
  },
  {
    id: 'workplace',
    question: 'Standing at work',
    forms: [
      {
        id: 'workplace-seniority',
        label: 'I have seniority or job security where I work',
        // Standing at work that a newer or less secure colleague does not have.
      },
    ],
  },
  {
    id: 'language',
    question: 'Language',
    forms: [
      {
        id: 'english-fluent',
        label: 'I’m a confident, fluent English speaker',
        // Matters most where speaking English easily gets someone taken seriously.
      },
    ],
  },
];

/** Flat list of every insulation id, for the matcher. Derived — don't edit. */
export const INSULATION_FORMS: InsulationForm[] = INSULATION_AXES.flatMap(
  (axis) => axis.forms,
);

/* ========================================================================
 * Causes — "who you might stand with"
 *
 * Broad, everyday, reachable. Includes the stigmatized-breed-dog domain
 * (locked in the plan). A cause ships ONLY once it has at least one vetted
 * entry; a cause with zero entries is hidden, never shown as an empty shelf.
 * ==================================================================== */

export const CAUSES: Cause[] = [
  {
    id: 'lgbtq',
    label: 'LGBTQIA+ folk',
    // Covered: everyday hostility at work, in public, in families.
  },
  // `trans` was a separate cause until 2026-08-08, hidden throughout for want of
  // a verified source. Removed as redundant with LGBTQIA+ above, which is the
  // box a reader actually sees. Note what that box's evidence does NOT cover:
  // the entry behind it rests on Weber & Dickter (2015), which measured straight
  // people confronting anti-GAY comments, plus extrapolation from race and
  // gender. No source in the corpus measures anti-trans bias. So do not widen
  // the LGBTQIA+ blurb to promise bathroom bills or healthcare bans — that would
  // be the same substitution the log rejected Kutlaca (2020) for. The research
  // gap stays recorded in EVIDENCE-VERIFICATION-LOG.md.
  {
    id: 'immigrants',
    label: 'Immigrants',
    // Rewritten 2026-08-04 for the current enforcement climate. Names
    // raids/detention plainly and points at the messenger asymmetry rapid
    // response networks already organize around: there are roles a citizen can
    // fill that an undocumented neighbor cannot risk filling. Deliberately does
    // NOT say the reader would be "safe" (PRINCIPLES #2) — the risk named here
    // is the one carried by the person without papers, which is accurate.
    // Covered: raids, detention, and the legal exposure a citizen doesn't carry.
    //
    // This card used to state a fact — "Most people held in immigration
    // detention have no criminal conviction" — with an arrow linking ICE's own
    // published statistics. Both went with the blurbs. The claim and its source
    // are preserved in EVIDENCE-VERIFICATION-LOG.md rather than deleted, since
    // it was a checked source and that is where checked sources live. If it
    // ever returns to the product, it returns with the citation attached.
  },
  {
    id: 'racial-justice',
    label: 'Racial justice',
    // Covered: everyday and structural racism, at work and in public.
  },
  {
    // PERSON-FIRST ("people with disabilities") — decided 2026-08-04.
    // There is no single correct term: preference splits across the community.
    // Identity-first ("disabled people") comes out of Disability Pride and is
    // strongly preferred by the Deaf and Autistic communities; person-first is
    // taught in North American health professions, mandated by many medical
    // journals, and generally preferred by people with intellectual
    // disabilities. Advocates' own consensus is that both support dignity and
    // the real answer is to ask the person — which an app cannot do. So this is
    // a judgment call that was made, not a default that was inherited. Keep it
    // consistent everywhere, including evidence prose.
    // Blurb names access being rolled back and keeps "taken at their word",
    // which carries the invisible-disability case.
    id: 'disability',
    label: 'People with disabilities',
    // Covered: access rolled back, and people not trusted to know what they need —
    // which carries the invisible-disability case.
  },
  {
    id: 'gender-equity',
    label: 'Women',
    // Covered: sexism at work and in public.
  },
  {
    // Labor rights, not interpersonal workplace advocacy (2026-08-04).
    // The earlier "a colleague with less standing than you, in the room you're
    // already in" framed this as backing someone up in a meeting; the cause is
    // actually union drives, hours capped to dodge benefits, and the like.
    // Evidence keyed here must be about labor power, not bystander support.
    id: 'workers',
    label: 'Workers',
    // Covered: union drives, hours capped to dodge benefits, little standing to
    // push back. Labor power, NOT interpersonal workplace support.
  },
  {
    id: 'unhoused',
    label: 'Unhoused people',
    // Covered: treated as a problem to move along, not people to hear.
  },
  {
    id: 'stigmatized-breed-dogs',
    // Relabelled from "Pit-bull-type dogs" 2026-08-09, on the operator's
    // suggestion: breed-specific bans and stigma reach beyond one breed
    // (Rottweilers, Dobermans, and others get swept in too), and this reads
    // as the category rather than singling one breed out. Shortened same day
    // from "Stigmatized dog breeds" to "Stigmatized dogs" — operator call,
    // no change in meaning.
    //
    // Worth knowing if this entry grows more sources: the evidence behind it
    // today (Tesler & McThomas 2024, Linder 2018) is specifically about pit
    // bulls, so the label now names a broader category than its one entry's
    // sources measure. That mismatch is the same shape as "Workers" naming a
    // broader category than its one survey — acceptable for a menu label,
    // but the entry's own `pattern`/`why_lower_risk` still say "pit bull"
    // specifically rather than generalizing past what was measured
    // (checkpoint #2, guardrail A).
    label: 'Stigmatized dogs',
    // Blurb stays on the well-evidenced racial-coding frame; the messenger
    // mechanism is more inferential and is handled in the entry's prose, not
    // previewed here (checkpoint #2, guardrail A).
    // Covered: the "dangerous dog" fear, and how tangled up with race it is.
    // Deliberately the well-evidenced racial-coding frame; the messenger
    // mechanism is more inferential and lives in the entry prose.
  },
];

/* ========================================================================
 * User-facing copy — everything not tied to a specific evidence entry.
 *
 * Calm, spare, warm, grown-up. No hype, no jargon, no guilt, no exclamation
 * points (Tone, PRINCIPLES.md). None of this is final wording.
 * ==================================================================== */

export const COPY = {
  brand: 'quietriot',

  landing: {
    // Default headline. Alternates (from PRINCIPLES microcopy seeds):
    //   "You might be exactly the right person to say something."
    //   "Some risks cost you less than they’d cost them. Here’s where."
    headline: 'Spend the safety you have alongside people who may have less.',
    // Two gerund clauses, deliberately. This was a caveat on the racial-justice
    // entry ("You're taking on a little risk you can afford…") and it says the
    // whole product in one line, so it was promoted here. The semicolon holds
    // the two halves in balance: what you spend, and where the attention goes.
    lede: 'Taking on a little risk you can afford; keeping the spotlight on the people it’s about.',
    cta: 'Start',
    // Upfront, whole-app "what this is / isn't" notice (shown on the landing).
    notice: 'Not legal, financial, or professional advice.',
  },

  /*
   * `positionPicker` copy lived here until 2026-08-09, with the self-check
   * screen it belonged to. It asked one question narrowed to the chosen cause
   * ("I'm white", "I'm a citizen") and offered a skip.
   *
   * Both the screen and this copy are gone. The skip is the part worth
   * remembering: it existed because the question had to be optional, and taking
   * it landed the reader on the empty state with no actions at all. An offer
   * that punishes the people who accept it is worse than no offer.
   */

  causePicker: {
    // "Who do you want to stand with?" made this a menu the reader shops from,
    // centring their preference, and carried the allyship posture Indigenous
    // Action's "Accomplices Not Allies" (2014) critiques — the supporter who
    // arrives from outside. Rephrased 2026-08-04 toward anti-paternalism
    // (Aboriginal activists group, Queensland, 1970s): the question is where a
    // person can be useful, not which group they'd like to help.
    // Changed twice on 2026-08-09. "Where do you want to be useful?" centred
    // the reader's usefulness. "Who's already organizing near you?" fixed that
    // but broke on the cards themselves: they are a mix of causes ("Racial
    // justice"), groups ("Women"), and one that is not people at all
    // ("Stigmatized dogs"), so a question about *who* only fit some of them.
    //
    // This wording works across all three. Any future rewrite has to clear the
    // same bar: it must read correctly above a cause, a group, and the dogs.
    heading: 'What are you here to support?',
    invitation: 'You can come back for another whenever you like.',
  },

  result: {
    // Action-first order (PRINCIPLES "Every answer follows this fixed order").
    // The kicker wording is load-bearing — it keeps the action an offer, not an
    // order — and must stay verbatim with PRINCIPLES.md.
    actionLabel: 'One thing you could try, if it fits',
    // "from you" until 2026-08-09. It was the last piece of the app addressing
    // a reader it no longer knows anything about: the self-check is gone, the
    // claims underneath it are third person, and the heading was still telling
    // someone the finding was about them personally.
    whyHeading: 'Why it lands differently',
    // Reveal button for the extra actions; {n} is the count still hidden.
    revealActions: (n: number) => `Show me ${n} more`,
    /**
     * The honest limit, rendered once per card (PRINCIPLES #2).
     *
     * Lived as a per-entry caveat until 2026-08-09, where eight of nine entries
     * carried it and seven appended their own explanation — "Homophobic
     * hostility can be intense, and a lot depends on where you are and who's
     * around", "Immigration is a heated subject", and so on. Those additions
     * editorialised past what the sources say, and drifted apart in tone
     * because nine copies of a sentence always do.
     *
     * One string, rendered structurally, is a STRONGER guarantee than nine
     * copies: it cannot be omitted from an entry, cannot be softened for one
     * cause, and can be test-guarded. It also takes a bullet off every
     * considerations list.
     *
     * Do not re-add a per-cause version. If a cause genuinely needs a specific
     * warning, that is a caveat about that evidence, not a rewording of this.
     */
    honestLimit: 'Lower risk isn’t no risk; there’s still some friction in speaking up.',
    // Conditional caveat label — must match the count (DESIGN.md "Considerations").
    caveatLabelOne: 'One consideration',
    caveatLabelMany: 'A few considerations',
    // Catalog card header. The count is the real sources.length.
    // Was "N held" — library holdings language, cut 2026-08-04. Three
    // problems: it needs decoding, which costs attention a nervous reader
    // hasn't got; "held" implies the app possesses knowledge about these
    // communities, which is a loaded frame for an archive; and it performs an
    // institutional authority this project hasn't earned. The catalog LOOK
    // (punched hole, mono, ruled entries) stays — the jargon doesn't.
    sourcesLabel: 'Sources',
    heldSuffix: (n: number) => (n === 1 ? 'study' : 'studies'),
    // Shown until the verified study database is built. Until then we list
    // NOTHING — a source only appears once it's been checked (PRINCIPLES #1).
    sourcesPending: 'The verified library is still being built. We won’t list a study here until it’s been checked.',
    confidenceLabels: {
      'well-established': 'Well-established',
      mixed: 'Mixed evidence',
      emerging: 'Emerging',
    } as const,
  },

  /*
   * `emptyState` copy lived here until 2026-08-09. Most of it described a
   * screen that no longer exists — headings, "the closest things we do have",
   * and a separate set of strings for the reader who skipped the self-check.
   * Removing that step removed every route to it: a cause is only ever offered
   * when it has a vetted entry, so the result screen cannot come up empty.
   *
   * Three things it carried outlived it and moved into `values` and
   * `contribute` below. Nothing was dropped for convenience.
   */

  /**
   * The one always-true line the app states without a citation, and the label
   * that makes that honest (G4, closed 2026-08-08).
   *
   * It is deliberately uncited because it is a claim about what someone OUGHT
   * to do, and no study can establish an obligation. It earns its place by
   * naming itself a value out loud.
   *
   * **The tag is load-bearing.** It is the only thing keeping an always-true
   * line from reading as an evidence claim, and `taxonomy.test.ts` fails if it
   * is removed or reworded into something that drops the disclaimer.
   *
   * Rendered on the RESULT screen since 2026-08-09. It used to render only on
   * the empty state — which meant that when that screen became unreachable,
   * the label stopped appearing anywhere, while per-cause "follow their lead"
   * bullets carried on leading every card's considerations unlabelled. An
   * ought-claim sitting unmarked among evidence-derived caveats is precisely
   * what G4 was closed to prevent, so the labelled line moved to the screen
   * every reader now reaches.
   */
  values: {
    // Reads as an About-page section heading now, not a card kicker — hence the
    // trailing period, which every heading on that page and on Privacy carries.
    label: 'What we believe.',
    metaPrinciple:
      'Follow the lead of the people most affected. Amplify what they’re already asking for, rather than deciding for them what they need.',
    metaPrincipleValueTag:
      'This is a value we hold here, not something a study proved.',
  },

  /**
   * PRINCIPLES.md requires an invitation to contribute — it grows the evidence
   * base bottom-up, and a corrected source is the most valuable thing anyone
   * sends. It was reachable only through the empty state until 2026-08-09.
   */
  contribute: {
    lead: 'Know real research or a real example we’re missing?',
    cta: 'Add it',
  },

  // Shown wherever a claim appears. This is the load-bearing honesty line.
  disclaimers: {
    // `relativeRisk` ("Lower risk for you than for them; never a guarantee of
    // safety.") was removed 2026-08-09 as a duplicate: every entry's own
    // considerations already open with "Lower risk isn't no risk", which says
    // the same thing next to the claim it qualifies rather than once at the
    // bottom of the page. PRINCIPLES #2 is still enforced — per card, where a
    // reader is actually looking.
    //
    // `notAdvice` ("Quietriot shares general patterns from published research
    // and is not professional or legal advice.") was removed 2026-08-09. It
    // rendered on the result screen only, one screen below `landing.notice`
    // in the site footer, which says the same thing shorter and says it on
    // every page. Two disclaimers on one screen is how a reader learns to skip
    // both.
    //
    // The obligation it carried moved with it, not away. PLAYBOOK G6 closed the
    // pre-launch legal-review gate on 2026-08-04 but was explicit that the
    // in-product safeguards are NOT covered by that removal: a not-legal-advice
    // disclaimer, the deferral to immigrant-led and legal-aid organisations, and
    // the reframed `citizen-buffer-immigrants` copy.
    //
    // The third of those changed shape on 2026-08-10 by operator decision. The
    // in-card "This is not legal advice" caveat came off
    // `citizen-buffer-immigrants` — on a card that already ends by pointing at
    // legal aid, a second disclaimer in the considerations list was the same
    // stacking problem `notAdvice` had, one card lower down. What now carries
    // G6's obligation is two things, and G6 is satisfied only while BOTH hold:
    //
    //   1. `landing.notice`, which names legal advice explicitly and shows on
    //      every screen — broader reach than the removed in-card line had.
    //   2. That card's closing action, which sends the reader to know-your-
    //      rights and legal-aid organisations "rather than advice of your own".
    //
    // Dropping or softening either is a separate decision nobody has made.
    noFabrication:
      'If we don’t have real evidence for something, we say so and point you somewhere useful. We never invent reassurance.',
  },


} as const;

export type ConfidenceLevel = keyof typeof COPY.result.confidenceLabels;
