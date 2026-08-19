/**
 * An 8-bit envelope, drawn as whole-unit blocks on a 12x9 grid.
 *
 * Replaces the ✉️ emoji that used to sit beside the address. Emoji are rendered
 * by the platform in fixed colours nobody here chose — Apple's is a
 * white-and-blue rectangle that goes muddy on the dark theme, and it looks
 * different again on Android and Windows.
 *
 * This inherits `currentColor`, which here resolves to the paragraph's `--ink-2`
 * rather than the sage of the address beside it — deliberate, since the glyph is
 * punctuation before the link, not part of the target. Measured 6.96:1 against
 * the page in both themes, comfortably past the 3:1 a non-text graphic needs, so
 * it is legible by construction rather than by luck.
 *
 * `shapeRendering="crispEdges"` turns off antialiasing, which is what keeps the
 * blocks reading as pixels instead of as a small smudged icon. Decorative, so
 * it is hidden from screen readers: the address beside it already says what
 * this is.
 *
 * Lived inside Privacy.tsx until 2026-08-10, when About.tsx started showing the
 * address the same way. Moved rather than copied: two SVGs drifting apart is
 * exactly how the two pages stop matching.
 */
export default function MailGlyph() {
  const flap = [
    [1, 1], [2, 2], [3, 3], [4, 4], [5, 5],
    [10, 1], [9, 2], [8, 3], [7, 4], [6, 5],
  ]
  return (
    <svg
      className="mail-glyph"
      viewBox="0 0 12 9"
      width="1.2em"
      height="0.9em"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {/* Border, one unit thick on every side. */}
      <rect x="0" y="0" width="12" height="1" />
      <rect x="0" y="8" width="12" height="1" />
      <rect x="0" y="1" width="1" height="7" />
      <rect x="11" y="1" width="1" height="7" />
      {/* The flap, as a stepped V from both top corners to the middle. */}
      {flap.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  )
}
