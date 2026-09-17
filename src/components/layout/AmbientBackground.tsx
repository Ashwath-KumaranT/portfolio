/**
 * The purple/blue ambient field the dark cards sit on.
 *
 * The glow is painted with radial gradients rather than blurred elements on
 * purpose: a `filter: blur(140px)` on three fixed, full-screen layers is one of
 * the most expensive things a page can ask a compositor for, and it produced
 * visible repaint artifacts while scrolling. A radial gradient is already soft,
 * costs nothing to composite, and looks the same.
 *
 * Fixed and pointer-events-none, so it never participates in layout or hit
 * testing. Motion is transform-only and the global reduced-motion rule parks it.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(125%_90%_at_50%_0%,var(--canvas-deep),var(--canvas)_62%)]" />

      <div
        className="ambient-a absolute -top-[28rem] -left-[22rem] h-[62rem] w-[62rem] will-change-transform"
        style={{ backgroundImage: 'radial-gradient(closest-side, var(--ambient-1), transparent 72%)' }}
      />
      <div
        className="ambient-b absolute top-[18%] -right-[24rem] h-[58rem] w-[58rem] will-change-transform"
        style={{ backgroundImage: 'radial-gradient(closest-side, var(--ambient-2), transparent 72%)' }}
      />
      <div
        className="ambient-c absolute -bottom-[26rem] left-[22%] h-[52rem] w-[52rem] will-change-transform"
        style={{ backgroundImage: 'radial-gradient(closest-side, var(--ambient-3), transparent 74%)' }}
      />

      <div className="ambient-noise absolute inset-0 opacity-[0.03] dark:opacity-[0.045]" />
    </div>
  )
}
