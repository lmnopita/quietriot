# Evidence verification log

A running record of how every citation in `src/data/evidence.json` was
verified, kept so no citation ships on trust alone. **Standing practice
(2026-07-16):** for any future evidence work, this log is updated
entry-by-entry as sources are verified, and shown *before* the commit
that adds them.

Verification method key:
- **Crossref lookup** — bibliographic/DOI query against `api.crossref.org`,
  confirming title/authors/year/venue/DOI match the claimed source.
- **Crossref agency** — `…/works/{doi}/agency` returns `agency: Crossref`,
  proving the DOI is genuinely registered (not fabricated or malformed).
- **OpenAlex abstract** — fetched and read the actual abstract, to confirm the
  claimed finding *and its direction*, not just that the paper exists.
- **URL resolve** — for the one law-review source (law reviews carry no DOI):
  the stable Digital Commons URL returns HTTP 200 and the page confirms the
  citation and that it supports the claim.
- **doi.org GET** — direct resolution. T&F / SAGE / Wiley return 403 to
  automated requests (a bot-wall, not a dead DOI — confirmed via agency every
  time); PLOS and APA return 200 live.

**Schema note (v2):** each entry carries two audit-only fields, never shown to
users — `confidence` (well-established | mixed | emerging = strength of the
evidence base) and `basis` (direct = measured for this case | extrapolated =
applied from similar research, and rendered to users with the fixed
PRINCIPLES.md template).

Last audit: 2026-07-16 — **PASS**: 5 entries, all tags valid against taxonomy,
no banned jargon in reader fields, 8/8 DOIs registered, law-review URL 200,
both extrapolated entries carry the exact template.

---

## Entry: `advantaged-messenger-race`
**Tags:** `white` × `racial-justice` · **confidence:** well-established · **basis:** direct · **doubt:** none

| Source | Verified via | Verdict |
| --- | --- | --- |
| Rasinski, H. M., & Czopp, A. M. (2010). *The effect of target status on witnesses' reactions to confrontations of bias.* Basic and Applied Social Psychology. `10.1080/01973530903539754` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ (full) · doi.org 403 bot-wall (T&F) | **On-point.** Abstract: nontarget (White) confronter rated more persuasive; target (Black) confronter rated rude. |
| Gulker, J. E., Mark, A. Y., & Monteith, M. J. (2013). *Confronting prejudice: The who, what, and why of confrontation effectiveness.* Social Influence. `10.1080/15534510.2012.736879` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ | **On-point.** "Greater acceptance when performed by a White than a Black confronter." |
| Kaiser, C. R., & Miller, C. T. (2001). *Stop complaining!…* PSPB. `10.1177/0146167201272010` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ · doi.org 403 (SAGE) | **On-point** for the "complainer" cost mechanism (grounds *why*, not the confronter comparison itself). |
| Czopp, A. M., Monteith, M. J., & Mark, A. Y. (2006). *Standing up for a change…* JPSP. `10.1037/0022-3514.90.5.784` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ · doi.org **200** (psycnet) | **On-point.** Confrontation reduces later bias regardless of confronter race — the effectiveness baseline. |

## Entry: `male-allies-sexism`
**Tags:** `man` × `gender-equity` · **confidence:** well-established · **basis:** direct · **doubt:** none

| Source | Verified via | Verdict |
| --- | --- | --- |
| Drury, B. J., & Kaiser, C. R. (2014). *Allies against sexism…* Journal of Social Issues. `10.1111/josi.12083` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ · doi.org 403 (Wiley) | **On-point.** "Men who act as allies are evaluated more positively, [confrontations] taken as more serious." |
| Gulker, Mark, & Monteith (2013) | *(verified above)* | Supporting: sexism confrontations broadly "trivialized" — used for the honest-limit line, not the man/woman comparison. |

## Entry: `breed-stigma-is-racial`  (was the "mixed" dog entry — now split; this is the DIRECT half)
**Tags:** `white` × `stigmatized-breed-dogs` · **confidence:** well-established · **basis:** direct · **doubt:** resolved by split (see below)

| Source | Verified via | Verdict |
| --- | --- | --- |
| Tesler, M., & McThomas, M. (2024). *The racialization of pit bulls…* PLOS ONE. `10.1371/journal.pone.0305959` | Crossref direct ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ · doi.org **200** live (open access) | **Strongest source in the corpus.** Abstract: most Americans associate pit bulls with Black people; anti-Black attitudes independently predict anti-pit views. |
| Linder, A. (2018). *The Black Man's Dog: The social context of breed specific legislation.* Animal Law Review (Lewis & Clark), 25(1). **No DOI.** URL: `https://lawcommons.lclark.edu/alr/vol25/iss1/4/` | **URL resolve ✓ (HTTP 200)** · page contents confirmed via fetch: author Ann Linder, 2018, Animal Law Review 25(1); argues BSL "may be rooted in racial bias" and pit bulls perceived as owned by young Black males | **Restored** (was dropped in v1 as unverifiable). Now verified by resolving URL; supports the racial-coding claim directly. Law reviews carry no DOI — URL is the correct verification path. |
| Thompson, A. J., Pickett, J. T., & Intravia, J. (2022). *Racial stereotypes, extended criminalization…* Race and Justice. `10.1177/2153368719876332` | Crossref lookup ✓ · agency=Crossref ✓ · **full** OpenAlex abstract ✓ · doi.org 403 (SAGE) | **On-point as the honest limit.** Full abstract: "treatment and control groups did not significantly differ… findings do not support the extended criminalization hypothesis." Rendered to users as the "not a simple on-off switch" caveat. |

## Entry: `breed-advocate-lower-cost`  (the EXTRAPOLATED half of the former dog entry)
**Tags:** `white` × `stigmatized-breed-dogs` · **confidence:** well-established (of the general pattern) · **basis:** extrapolated · **doubt:** named openly, handled by template

| Source | Verified via | Verdict |
| --- | --- | --- |
| Rasinski & Czopp (2010); Gulker et al. (2013) | *(verified above)* | Real and well-established for race — **not** measured for dog advocacy. This entry's reassurance (a white advocate personally takes less heat here) is applied from those studies, and says so via the required template. |

**Why the split (resolves the v1 doubt):** in v1 this was one `mixed` entry mixing
a well-sourced claim (the stigma is racial) with an inference (you'd personally
face less backlash). By decision, it's now two entries: the
racial-coding claim stands on its own direct sources (well-established), and the
advocate-cost claim is a separate `extrapolated` entry that tells the reader
plainly it's applied from similar research. No single entry now blends a measured
finding with an inference.

## Entry: `advantaged-messenger-lgbtq`  (kept; now anchored by a domain-specific study)
**Tags:** `straight`, `cisgender` × `lgbtq` · **confidence:** well-established (of the general pattern) · **basis:** extrapolated · **doubt:** reduced, not eliminated — see below

| Source | Verified via | Verdict |
| --- | --- | --- |
| Weber, D. M., & Dickter, C. L. (2015). *Confronting the "F" word… Non-Targets' Confrontation of Heterosexist Comments.* Journal of Homosexuality. `10.1080/00918369.2015.1060050` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ | **Found in the targeted search that was requested.** Directly about heterosexual (non-target) confrontation of anti-gay comments — anchors the domain as real and studied. **Honest limit:** it studied *whether/how* straight people confront (and found women confronted more than men); it did **not** test the comparative-cost claim. So it grounds the pattern, not the "costs you less" reassurance. |
| Rasinski & Czopp (2010); Gulker et al. (2013) | *(verified above)* | The "similar situations" the comparative-cost claim is applied from — race and gender, not sexual orientation. |

**Doubt, updated:** the earlier concern was that the entire entry was inference
with no LGBTQ-specific source. The targeted search fixed half of that — Weber &
Dickter is a real, on-point study of straight people confronting anti-gay
comments, so the domain is no longer unsupported. What remains extrapolated is
the *comparative-cost* claim (that it costs a straight ally less than a gay
person), which no study tests directly. That's why `basis` stays `extrapolated`
and the reassurance is rendered with the template. Kept, by decision.

---

## Changelog

- **2026-07-16 (v1):** 4 entries, 7 sources; every DOI verified registered.
  "Black Man's Dog" dropped as unverifiable at the time; dog entry shipped as a
  single `mixed` entry; LGBTQ entry `emerging`.
- **2026-07-16 (v2):** Added `basis` field. Split the dog entry into
  `breed-stigma-is-racial` (direct) + `breed-advocate-lower-cost` (extrapolated).
  Restored **Linder (2018)** via resolving URL. Added **Weber & Dickter (2015)**
  to the LGBTQ entry from the targeted search. Both inferences relabeled from
  `emerging` → `basis: extrapolated`, rendered with the PRINCIPLES.md template.
  All reader-facing prose rewritten to the "How answers read to users" voice
  (plain words, no jargon — audit confirms none of the banned terms appear).

## Entry: `citizen-buffer-immigrants`  (activates the immigrants cause + Citizenship axis)
**Tags:** `citizen` × `immigrants` · **confidence:** well-established · **basis:** direct · **doubt:** one nuance, handled honestly (see below)

| Source | Verified via | Verdict |
| --- | --- | --- |
| Alsan, M., & Yang, C. S. (2024). *Fear and the safety net: Evidence from Secure Communities.* Review of Economics and Statistics. `10.1162/rest_a_01250` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex **full** abstract ✓ | **On-point and clean.** Abstract: Secure Communities enforcement caused Hispanic-headed *citizen* households to significantly reduce safety-net participation, via fear propagating through networks. Directly documents that deportation-era fear measurably pulls people back from public institutions — the "the risk is real and it chills engagement" half of the entry. |
| Maginot, K. B. (2021). *Effects of deportation fear on Latinxs' civic and political participation.* Ethnic and Racial Studies. `10.1080/01419870.2020.1738516` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ | **On-point, with a nuance I nearly missed.** The full abstract shows deportation fear produces *distinct trajectories* — it depresses some participation but **catalyzed nonelectoral action** around immigration reform. So it does NOT support "immigrants are silenced." I represented this honestly in a reader caveat ("immigrants also organize powerfully for themselves — this is about sharing a risk you can afford, not speaking in their place"), which also serves PRINCIPLES #3 (solidarity, not saviorism). |

**Why `basis: direct`, not the extrapolation template:** the claim the entry
actually asserts is the *legal-exposure asymmetry* — a citizen can raise
immigration concerns publicly without deportation risk; an undocumented person
cannot, and that risk is documented to chill public engagement (Alsan & Yang).
That is measured in this domain, not borrowed from another. I deliberately did
**not** claim a persuasion/effectiveness advantage (that would be extrapolated);
the entry stays on the risk asymmetry, which the sources support.

**Doubt / scope, stated plainly:** both studies center Latinx/Hispanic
communities (where enforcement has been heaviest), while the cause is
"immigrants" broadly — noted in a reader caveat ("Most of this research looks
at Latino communities…"). The Alsan & Yang chilling effect is measured on
safety-net *program participation*, a slightly lower-stakes public act than
advocacy; the inference from "withdraws from benefits under fear" to "faces
real risk speaking up" is short and honest, but it is an inference, flagged
here for the record.

**Liability reframe (2026-07-16) — the sources didn't change; the
framing did.** Immigration is the most legally fraught cause, so the entry was
reworked to (1) drop any legal green-light — the pattern now reports the
documented risk *asymmetry* rather than telling a user they can act "without
risking deportation"; (2) drop the action that inserted the user into a
neighbor's legal situation ("be the public name… so a neighbor doesn't put
their status on the line"); (3) defer all "what to do" to immigrant-led and
legal-aid organizations, who carry the expertise; (4) lead the caveats with an
explicit "this is not legal advice." Reinforced product-wide: a strengthened
"not legal, financial, or professional advice" disclaimer on every result, an
upfront notice on the landing, and a softened Citizenship self-check hint.
**This cause carries a hard pre-public-launch gate: real legal review before
the tool goes public** (playbook G6). Copy reframe reduces apparent risk; it is
not legal clearance.

## Changelog (continued)

- **2026-07-16 (immigrants):** Added `citizen-buffer-immigrants` (5th cause).
  Two sources verified registered + abstract-grounded. Framed on the
  legal-exposure asymmetry (`basis: direct`), not a persuasion claim; Maginot's
  mobilization nuance honored in the anti-saviorism caveat. Full audit passed
  (10/10 DOIs registered, tags valid — `citizen` now live, no jargon, templates
  intact). Verified in-browser: Citizenship axis re-surfaced and the immigrants
  result renders. Shown before commit.

## Retired from the UI, kept here: the ICE detention statistic (2026-08-09)

The `immigrants` cause card carried a factual claim as its one-line blurb —
**"Most people held in immigration detention have no criminal conviction"** —
with a superscript arrow linking the source. Both went when the cause cards were
reduced to labels alone (#37).

Recorded here rather than dropped, because it was a real sourced claim and this
log is where those live:

| Claim | Source | Verified via |
| --- | --- | --- |
| Most people held in immigration detention have no criminal conviction | U.S. Immigration and Customs Enforcement, *Detention Management* — published detention statistics. `https://www.ice.gov/detain/detention-management#section6009-1` | Government primary source, cited by link rather than paraphrase so a reader can open the page and count for themselves |

**Why it was a link and not a footnote, worth keeping if it ever returns.** The
marker was an arrow, not an asterisk, by decision: an asterisk promises a
footnote further down the page — there wasn't one — and on a claim about
detained people it reads as hedging, *"true, but"*. An arrow says go and look.

The claim itself is not currently rendered anywhere. If it returns to the
product, it comes back with this source attached.

## Regression caught and reverted: the immigrants legal green-light (2026-08-09)

**The 2026-07-16 liability reframe above was undone by accident today, and put
back the same day.** Recording it because the reframe is the kind of decision
that gets re-broken by well-meaning edits that never read this file.

During the third-person voice pass, `citizen-buffer-immigrants.why_lower_risk`
was rewritten as:

> "A citizen can raise immigration concerns in public **without risking
> deportation**."

That is, near enough verbatim, the phrasing item (1) of the reframe says was
deliberately dropped — a legal green-light on the most legally fraught cause in
the corpus. It was written to fix a genuine problem (the field held a
legal-advice paragraph rather than the entry's actual claim) and reintroduced a
worse one.

Now reads:

> "Enforcement risk falls on people without status, not on citizens, and that
> fear is documented to pull people back from public life. What is safe for any
> particular person is not something research can settle."

Reports the documented asymmetry, which is what the sources support, and states
plainly that it cannot speak to any individual's safety.

**Found by a structured copy review, not by CI.** No test can catch a sentence
that is grammatical, on-topic, well-sourced and quietly reckless. If this entry
is edited again, read the liability reframe first.

## Caveat removed by operator decision: the breed-ban null result (2026-08-09)

`breed-stigma-is-racial` carried this caveat until today:

> "One catch: when researchers tried to stir up this race link on purpose, it
> didn't actually change whether people supported breed bans. So the link is
> real and well-documented, but it's not a simple on-off switch."

It reported the experimental null in Thompson, Pickett & Intravia (2022):
priming racial stereotypes did not shift support for breed-specific
legislation in their experiment, even though the observational link is solid.

**Removed at the operator's direction, from their own review notes — not
lost in a rewrite.** Recording it here because this log exists precisely to
distinguish deliberate removals from accidental ones. If a future editor
wants to restore a nuance caveat on this entry, this is what it said and
what it was based on. The Thompson et al. source stays in the entry: it
still supports the pattern's claim that anti-Black attitudes track negative
views of the dogs.

The same pass reordered the remaining caveats ("this isn't a claim these
dogs are never a concern" now leads) and simplified "breed-neutral rescues"
to "rescues" — both operator decisions from the same notes.

## Note on this log's timing

The v1 section of this log was reconstructed *after* its commit — the underlying
checks were all really run, but I failed to show the log before committing. This
v2 update is being shown *before* the commit that carries it, as requested.

## Entry: `access-advocate-workplace`  (added 2026-08-04)
**Tags:** `access-not-mine` × `disability` · **confidence:** mixed · **basis:** extrapolated · **doubt:** see "What is NOT claimed"

Prompted (2026-08-04) by ADA access being dismantled. Needed no new
plumbing — the `disability` cause and its self-check tag both already
existed; the cause was hidden only for want of a verified source.

| Source | Verified via | Verdict |
| --- | --- | --- |
| Baldridge, D. C., & Veiga, J. F. (2006). *The impact of anticipated social consequences on recurring disability accommodation requests.* Journal of Management. `10.1177/0149206305277800` | Crossref lookup ✓ (title/authors/year/venue match) · agency=Crossref ✓ · OpenAlex abstract ✓ (full) | **On-point.** Abstract: survey of 229 hearing-impaired employees + expert panel; logistic regression confirmed monetary costs and "impositions on others" reduce the likelihood of requesting recurring accommodations, and worsen the requester's assessment of social consequences, which in turn depresses future requests. This is the measured cost of self-advocacy. |
| Baldridge, D. C., & Swift, M. L. (2011). *Withholding requests for disability accommodation.* Journal of Management. `10.1177/0149206310396375` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ (full) | **On-point.** Abstract: 279 people with hearing impairments; models *request withholding frequency* and confirms people with disabilities often do not request needed accommodations — "potentially self-limiting behavior." Corroborates entry 1 on a separate sample. |

### What is NOT claimed
The messenger asymmetry itself — that a non-disabled person raising an access
issue absorbs less cost — **is not measured for disability.** Searched Crossref
and OpenAlex for ally/bystander confrontation of ableism (`confronting ableism`,
`disability microaggressions bystander intervention`, `nondisabled advocate
disability bias`, `ally confrontation disability discrimination`) and found no
on-point empirical source. So `basis: extrapolated`, and the reader gets the
exact PRINCIPLES.md template rather than a custom hedge. The transfer is from
the confrontation literature already verified in this corpus (Rasinski & Czopp
2010; Gulker et al. 2013), where non-target confronters are received better.

**Rejected on the way:** Colella, A. (2001). *Coworker distributive fairness
judgments of the workplace accommodation of employees with disabilities.*
Academy of Management Review. `10.2307/259397` — DOI verified and registered,
but AMR publishes theory, and OpenAlex carries no abstract for it. Using a
conceptual model as though it were a measured effect is exactly the
plausible-but-unfounded citation this log exists to prevent. Left out.

**Honest limits rendered to the reader:** both studies are of employees with
**hearing loss** requesting **workplace** accommodations — named in the caveats
so nobody reads it as covering all disabilities or all settings. A further
caveat states plainly that the cost-to-you claim comes from other situations.

**Audit:** tags valid ✓ · no banned jargon or soft filler in reader fields ✓ ·
extrapolation template verbatim ✓ · 2/2 DOIs registered ✓ · confidence/basis
audit-only, never rendered ✓ · verified in-browser: `Disabled people` now
surfaces (6 live causes), one-question self-check, full result renders.


## Entry: `access-advocate-public-info`  (added 2026-08-04)
**Tags:** `access-not-mine` × `disability` · **confidence:** mixed · **basis:** extrapolated

The ask: show the *reality* of denied access, not only the messenger claim —
prompted by ASL missing from White House briefings. Correct per the schema: the
`pattern` field is where what-actually-happens belongs, and these two sources
are logged against that claim only.

| Source | Verified via | Verdict |
| --- | --- | --- |
| Schniedewind, E., Lindsay, R., & Snow, S. (2020). *Ask and ye shall not receive: Interpreter-related access barriers reported by Deaf users of American sign language.* Disability and Health Journal. `10.1016/j.dhjo.2020.100932` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex carries NO abstract → **abstract read via PubMed** (PMID 32576507) | **On-point for "access gets denied."** Six-year review of 108 complaints, Idaho Council for the Deaf and Hard of Hearing: 48.2% told an interpreter was not available; 28.7% given an unqualified interpreter; 18.5% promised one that never came. Per year, complaints were 1.6× more likely to be "promised but not provided" (95%CI 1.15–2.22). Rural complainants less likely to see resolution (OR 0.18). |
| Almusawi, H., Alasim, K., BinAli, S., & Alherz, M. (2021). *Disparities in health literacy during the COVID-19 pandemic between the hearing and deaf communities.* Research in Developmental Disabilities. `10.1016/j.ridd.2021.104089` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex no abstract → **read via PubMed** (PMID 34624721) | **On-point for "denied access has consequences."** 110 participants (70 hearing, 40 DHH), Kuwait/Saudi Arabia. Multivariate regression: degree of hearing loss and sign-language use both associated with LOWER COVID knowledge scores. Critically for the press-briefing case — DHH participants relied mostly on **social media**, hearing participants on **official government sources**. |

### What these sources do and do not carry
They establish the **stakes** (access is withheld routinely; withholding it
measurably degrades what people know). Neither touches the messenger asymmetry,
so `basis` stays `extrapolated` and the reader gets the exact template. Logged
this way deliberately: a source listed beside a claim it doesn't support is the
same dilution problem as an invented call number.

**Honest limits rendered to the reader:** one US state, healthcare settings, and
a 110-person survey in Kuwait and Saudi Arabia; neither studied press briefings.
Stated plainly in the caveats.

---

## Not built: invisible-disability disclosure entry (2026-08-04)

The question came up of whether research exists on invisible illness — good question, and the
answer for *evidence* purposes is **not at the bar this corpus holds.**

| Candidate | Verified | Why it was not used |
| --- | --- | --- |
| Chaudoir, S. R., & Fisher, J. D. (2010). *The disclosure processes model…* Psychological Bulletin. `10.1037/a0018193` | Crossref ✓ · agency ✓ · abstract ✓ | Abstract is explicit: "presents the disclosure processes model — **a framework**". A theoretical model, not a measured effect. |
| Lingsom, S. (2008). *Invisible impairments: Dilemmas of concealment and disclosure.* Scandinavian Journal of Disability Research. `10.1080/15017410701391567` | Crossref ✓ · agency ✓ · abstract ✓ | Abstract: "**discusses** concealment and disclosure … with an emphasis on performance, motivation and context." A discussion piece; no measured outcome. |

Both are real, registered, and would have looked authoritative in a source list.
Excluded on the same ground as Colella (2001): **theory presented as measurement
is the failure this log exists to prevent**, and the standard has to apply the
second time as well as the first.

The concern behind the question is addressed anyway, and better — in the
taxonomy rather than a citation. The self-check tag moved from `able-bodied` to
`access-not-mine` ("I'm not the one who needs this access"), which includes
people with invisible conditions instead of writing them out. That needed no
evidence claim at all.

---

## Searched and NOT built: `trans`, `unhoused`, and G4 (2026-08-04)

Three parallel research passes. All three came back empty at the bar this corpus
holds. Recorded so nobody spends the search again, and so the gaps stay visible
rather than being quietly filled later.

### `trans` — no entry

> **Cause removed from the taxonomy 2026-08-08.** The `trans` cause was dropped
> as redundant with `lgbtq`, which is the box a reader actually sees; `trans` had
> been hidden since launch and never appeared in the UI. **The research finding
> below stands and is why this section is kept rather than deleted:** nothing in
> the corpus measures anti-trans bias. The `lgbtq` entry rests on Weber &
> Dickter (2015) — straight people confronting anti-*gay* comments — plus
> extrapolation from race and gender. Folding the cause in does not fold in
> evidence, so the LGBTQIA+ copy must not be widened to promise coverage of
> bathroom bills, healthcare bans, or misgendering. Doing so would be the same
> substitution Kutlaca (2020) was rejected for, one level up.

No peer-reviewed study measures whether a cisgender person confronting anti-trans
bias is received better than a trans person raising the same thing. Searched
Crossref, OpenAlex, PubMed and Semantic Scholar across many phrasings.

- **Kutlaca, Becker & Radke (2020),** *J Experimental Social Psychology*,
  `10.1016/j.jesp.2019.103832` — registered; the right *kind* of study, but the
  stimuli are sexist and racist ads, never anti-trans bias. **Rejected:** filing a
  race/gender finding under `trans` is precisely the stretch this log exists to stop.
  Worth knowing anyway, because it complicates our own story — advantaged-group
  audiences supported allies *less* than targets, so the ally advantage is not
  unconditional. A candidate honest-limit for the entries we already ship.
- **Paine et al. (2024),** *Work and Occupations*, `10.1177/07308884241268705` —
  registered; real interview data on what visibility costs trans and nonbinary
  people at work. Qualitative, and no messenger comparison. Grounds stakes only.

### `unhoused` — no entry
No study measures a housed advocate landing better than an unhoused person
speaking for themselves, and no solid cost-of-self-advocacy paper tied to housing
status surfaced either.

- **Einstein, Palmer & Glick (2018),** *Perspectives on Politics*,
  `10.1017/s153759271800213x` — registered, real coded data on who speaks at
  housing meetings (older, male, longtime residents, homeowners; overwhelmingly
  opposed to new housing). Genuinely on-topic for *who gets heard*, but it is not
  the messenger comparison. **Partial — parked, not used.**
- **Rydberg et al. (2023),** *Justice Quarterly*, `10.1080/07418825.2023.2267633` —
  registered, and measures exactly the mechanism we want (advocates for a
  stigmatized group take a credibility hit). Population is people convicted of
  sexual offenses. **Rejected:** right mechanism, wrong population.

### G4 — stays a stated value, not a citation
Searched for evidence that community-directed work outperforms outsider-designed
work. The honest finding is that it does not cleanly hold. The most rigorous
comparison found (Ko & Song 2026, meta-analysis, `10.1186/s12889-026-27301-8`)
reports professional-led interventions with a *larger* effect on the primary
clinical outcome, lay-led winning only on consistency across contexts. Weaker
studies compare peer-led against usual care, which is a different and much
smaller claim than the line makes.

So G4 is resolved by keeping the line labelled as a value the project holds —
its current treatment — rather than by citing anything. This is a claim the
project wants to be true, which is exactly when a weak citation gets waved
through.


---

## Searched: `workers` — one usable source, and it is not the one we went looking for (2026-08-05)

First search run through the harvester rather than by hand. Two queries, 593
works, 352 with abstracts. Every judgement below is from the abstract.

**Scope, restated because it is what most candidates failed.** `workers` means
labor rights: organizing drives, union busting, retaliation against organizers,
hours capped under benefit thresholds, precarious scheduling. It is *not*
interpersonal workplace support. Bystander-intervention and coworker-civility
research is off-target here no matter how good it is, and the corpus is full of
it — that literature dominates any search containing the word "workplace".

### The gap we were trying to close

Does exposure to employer retaliation **vary by worker security**? Freeman &
Kleiner establishes that retaliation is real and measured; nothing we hold
measures whether a worker with tenure, a permanent contract, savings or
citizenship is *less exposed* than a precarious or undocumented coworker. That
differential is the claim the app would make.

**It was not found, and that gap is still open.** Nothing in 352 abstracts
measures retaliation exposure as a function of worker security.

### What was found instead — and it may matter more

- **Rho, Riordan, Ibsen, Lamare & Tapia (2022),** *Work and Occupations*,
  `10.1177/07308884221128481` — original 2020 survey, representative of Illinois
  and Michigan workers. Green OA. Three results, and the ordering matters:
  job insecurity alone is **not** significantly associated with voice; but
  insecure workers speak up *less* than secure workers as confidence in
  organized labor rises; and **insecure nonstandard workers are less likely to
  use voice than their secure counterparts.**

  That last clause is a measured security gradient in *speaking up*, which is
  the chilling-effects angle rather than the retaliation-exposure one. It is
  also, almost word for word, the claim `taxonomy.ts` already makes for the
  `workplace-seniority` axis — that you can speak up where a less secure
  colleague could not.

  **Read the honest limits before using it.** It measures who speaks, not who
  gets punished, so it cannot support "it costs you less than them" — only
  "they are less likely to say it at all". The headline effect is null; the
  gradient lives in interactions. "Voice" is general workplace voice, not union
  organizing specifically. Two states, pandemic-era, single study.

### Rejected

- **Fiorito, Gallagher, Russell & Thompson (2019),** *Labor Studies Journal*,
  `10.1177/0160449x19860908` — 2009 Young Worker Survey, real measured results
  on how precarious work shapes union-related *attitudes* (distrust, collective
  efficacy). **Rejected:** attitudes, not exposure. Adjacent to the gap, not in
  it.
- **"Winning the Battle, Losing the War?"** (2017), misclassification
  litigation — no DOI, no venue, law-review shaped. **Rejected:** litigation
  trajectories, not a security gradient.
- **Amazon production regime study** (2023), *Socius*,
  `10.1177/23780231231216286` — interviews plus survey on worker orientations.
  **Rejected:** class consciousness, not retaliation exposure.
- **German co-determination chapter** (2026), `10.1108/s0277-283320260000038004`
  — **Rejected:** a book chapter and a historical case study, not measured
  results.

### Method note worth keeping

The PubMed abstract fallback filled **zero** of 46 missing abstracts here. The
DOIs were book chapters from Cornell, Routledge and Edward Elgar. Labor
economics is largely outside PubMed, so on this cause a missing abstract will
usually stay missing and the honest label is "abstract unverified" rather than
a guess from the title.

### How much of this literature is actually reachable (2026-08-05, recounted 2026-08-08)

Measured on the labor corpus, not estimated. Of **51 works** the harvester tried
to fetch full text for:

- **15 acquired** — 15 documents (12 PDF, 2 JATS, 1 HTML), one per work
- **36 never acquired**

Of those 36 failures: **30 works were reached and refused (paywalled)** and
**20 were not in PubMed Central**. Those two figures overlap and do not
partition — 21 works were tried on more than one rung and carry more than one
status, so adding the categories double-counts. The acquired/not-acquired split
above is the one that sums.

So a little under a third of this literature is free to read. That is much worse
than the confrontation/bystander corpus, and it has the same cause as the
PubMed result above: labor economics lives in book chapters and subscription
journals.

**Two corrections to the 2026-08-05 version of this section, kept visible rather
than overwritten silently.** It reported 40 works / 10 acquired / 23 paywalled /
20 not in PMC. The works, paywalled and acquired figures had all moved by
2026-08-08 as more fetches ran. But "10 acquired" was also **wrong when
written**: the document count (15) and its format breakdown (12/2/1) are
unchanged since that day, and every successful fetch produced exactly one
document, so 15 works had already been acquired at the time. Drift explains the
other numbers; that one was a counting error.

Plan for it rather than be surprised by it. On `workers`, and probably on
`unhoused`, expect to open roughly seven of every ten papers yourself. The
pipeline's value on these causes is *finding* and *triaging* candidates and
telling you precisely what it could not reach — not handing over a stack of
readable full text.

The paywalled/not-found split is recorded per work in `fetch_log`, so this is
answerable at any time rather than a guess: `harvester status` breaks it down
by rung.

### Where this leaves the cause

`workers` stays hidden. One source that measures a real gradient in the wrong
variable is not an entry. Shipping the retaliation differential off a voice
study would be exactly the substitution this log exists to catch.

## Entry built: `secure-worker-voice` (2026-08-05)
**Tags:** `workplace-seniority` × `workers` · **confidence:** emerging · **basis:** direct

Built on Rho et al. (2022) after the harvester's `workers` run, on the narrower
claim the evidence actually supports rather than the one we went looking for.

| Source | Verified via | Verdict |
| --- | --- | --- |
| Rho, H. J., Riordan, C., Ibsen, C. L., Lamare, J. R., & Tapia, M. (2022). *Do workers speak up when feeling job insecure?* Work and Occupations. `10.1177/07308884221128481` | Crossref lookup ✓ · agency=Crossref ✓ · OpenAlex abstract ✓ (re-verified by hand, not taken from the harvester run) | **On-point for the voice gradient.** Original 2020 survey representative of Illinois and Michigan workers: "insecure nonstandard workers are less likely to use voice than their secure counterparts." |

### What this entry deliberately does NOT claim
No cost asymmetry. The study measures **who speaks, not who is punished**, so
"it costs you less than it costs them" would be unsupported — and the
retaliation-exposure gradient that claim needs was searched for across 352
abstracts and not found. Recorded in the data as `messenger_claim_basis`.

This makes it the first entry whose logic is not messenger-safety at all. The
argument is *availability*, not cost: the people most affected are least likely
to raise it, so you may be the only one in the room who will. Arguably more
actionable, and it is what the evidence says.

`basis: direct` because the gradient itself is measured for this population.
The reader-facing caveats carry every limit: the **null main effect** (job
insecurity alone did not change whether people spoke up — the gap is among
nonstandard workers), two states, pandemic-era, single survey, and general
workplace voice rather than union organizing.

Activates the dormant `workplace-seniority` tag. Causes live: 7 of 9 at the time
of writing; 7 of 8 since `trans` was removed from the taxonomy on 2026-08-08.
