import { COPY } from '../data/taxonomy'
import { availableCauses } from '../lib/match'

interface CausePickerProps {
  onSelect: (causeId: string) => void
  onBack: () => void
}

export default function CausePicker({ onSelect, onBack }: CausePickerProps) {
  const causes = availableCauses()

  return (
    <div className="stack">
      <button type="button" className="btn-link" onClick={onBack}>
        ← Back
      </button>

      <h1 className="heading">{COPY.causePicker.heading}</h1>
      <p className="invitation">{COPY.causePicker.invitation}</p>

      <div className="cause-grid">
        {/* Label only, since 2026-08-09. The cards used to carry a one-line
            blurb, and the immigrants blurb carried a superscript link out to
            the government's detention statistics. Both are gone: the blurbs
            asked a reader to absorb seven descriptions before choosing, and
            the outbound link sent someone to a .gov domain from a page they
            may be nervous about visiting at all.

            Both fields were removed from taxonomy.ts entirely on 2026-08-09;
            what each cause covers is a comment beside it now. The detention
            statistic and its source are preserved in
            EVIDENCE-VERIFICATION-LOG.md. Restoring either here means revisiting
            the outbound-link decision first. */}
        {causes.map((cause) => (
          <button
            key={cause.id}
            type="button"
            className="cause-card"
            onClick={() => onSelect(cause.id)}
          >
            <span className="cause-label">{cause.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
