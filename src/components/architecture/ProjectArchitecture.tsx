import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import type { ArchitectureLayer } from '../../data/projects'
import { revealViewport } from '../../lib/motion'

/**
 * Per-project architecture diagram.
 *
 * Rendered from data as labelled layers rather than as an image, so it stays
 * readable at any width — the layers sit side by side on desktop and stack
 * into a single vertical flow on a phone, with the arrows switching direction
 * to match.
 */
export function ProjectArchitecture({ layers, note }: { layers: ArchitectureLayer[]; note: string }) {
  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        className="flex flex-col gap-3 lg:flex-row lg:items-stretch"
      >
        {layers.map((layer, layerIndex) => (
          <div key={layer.id} className="flex flex-col gap-3 lg:flex-1 lg:flex-row lg:items-stretch">
            <div className="flex flex-1 flex-col gap-2 rounded-2xl border border-line bg-surface-sunken/70 p-4">
              <p className="text-xs font-semibold tracking-wide text-accent-soft uppercase">{layer.title}</p>
              <ul className="flex flex-col gap-2">
                {layer.nodes.map((node) => (
                  <motion.li
                    key={node.id}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="rounded-xl border border-line bg-surface px-3 py-2.5"
                  >
                    <p className="text-sm font-medium text-content">{node.label}</p>
                    <p className="text-[0.75rem] leading-snug text-content-muted">{node.detail}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {layerIndex < layers.length - 1 && (
              <span className="flex items-center justify-center text-content-faint" aria-hidden="true">
                <ArrowDown className="h-4 w-4 lg:hidden" />
                <ArrowRight className="hidden h-4 w-4 lg:block" />
              </span>
            )}
          </div>
        ))}
      </motion.div>

      <p className="rounded-xl border border-line bg-chip p-3 text-[0.8rem] leading-relaxed text-content-muted">
        {note}
      </p>
    </div>
  )
}
