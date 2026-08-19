/**
 * Citation verifier for the no-fabrication gate (PRINCIPLES.md #1).
 *
 *   node scripts/verify-citation.mjs 10.1177/0149206305277800 [...more DOIs]
 *
 * For each DOI it runs the three checks the verification log requires:
 *   1. Crossref lookup  — title/authors/year/venue actually match the DOI
 *   2. Crossref agency  — the DOI is genuinely registered, not fabricated
 *   3. OpenAlex abstract — the real abstract, so a claim's DIRECTION can be
 *      checked rather than assumed from a promising title
 *
 * Step 3 is the one that matters most: a title can suggest a finding the paper
 * refutes. Nothing here decides whether a source is on-point — a person reads
 * the abstract and makes that call. This only removes the manual fetching.
 */
const MAILTO = 'quietriot@lilyweb.dev'
const dois = process.argv.slice(2)

if (dois.length === 0) {
  console.error('usage: node scripts/verify-citation.mjs <doi> [doi...]')
  process.exit(1)
}

const get = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': `quietriot (mailto:${MAILTO})` } })
  return { ok: r.ok, status: r.status, body: r.ok ? await r.json() : null }
}

/** OpenAlex ships abstracts as an inverted index; rebuild reading order. */
const deinvert = (idx) => {
  if (!idx) return null
  const words = []
  for (const [word, positions] of Object.entries(idx)) {
    for (const p of positions) words[p] = word
  }
  return words.join(' ').replace(/\s+/g, ' ').trim()
}

for (const doi of dois) {
  console.log('\n' + '='.repeat(72))
  console.log('DOI:', doi)

  const work = await get(`https://api.crossref.org/works/${doi}?mailto=${MAILTO}`)
  if (!work.ok) {
    console.log(`  ✗ Crossref lookup FAILED (HTTP ${work.status}) — DOI may not exist`)
    continue
  }
  const m = work.body.message
  const authors = (m.author || [])
    .map((a) => `${a.family ?? ''}${a.given ? ', ' + a.given : ''}`)
    .join('; ')
  console.log('  ✓ Crossref lookup')
  console.log('     title  :', (m.title || ['?'])[0])
  console.log('     authors:', authors || '(none listed)')
  console.log('     year   :', (m.issued?.['date-parts'] || [[null]])[0][0])
  console.log('     venue  :', (m['container-title'] || ['?'])[0])
  console.log('     type   :', m.type)

  const agency = await get(`https://api.crossref.org/works/${doi}/agency?mailto=${MAILTO}`)
  const ag = agency.body?.message?.agency?.label ?? agency.body?.message?.agency?.id
  console.log(ag ? `  ✓ Registered with: ${ag}` : `  ✗ agency check failed (HTTP ${agency.status})`)

  const oa = await get(`https://api.openalex.org/works/doi:${doi}?mailto=${MAILTO}`)
  if (!oa.ok) {
    console.log(`  ~ OpenAlex: no record (HTTP ${oa.status}) — abstract must be read manually`)
    continue
  }
  const abstract = deinvert(oa.body.abstract_inverted_index)
  if (!abstract) {
    console.log('  ~ OpenAlex record exists but carries NO abstract — read manually before use')
  } else {
    console.log('  ✓ OpenAlex abstract:')
    console.log(abstract.replace(/(.{92})/g, '$1\n').split('\n').map((l) => '     ' + l).join('\n'))
  }
}
console.log('\n' + '='.repeat(72))
console.log('Fetching only. Whether a source supports the claim is a human call.')
