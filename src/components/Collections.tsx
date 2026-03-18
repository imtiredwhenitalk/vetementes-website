import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const collections = [
  {
    title: 'NOIR ESSENCE',
    subtitle: 'Капсульна колекція',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
    tag: 'Нова'
  },
  {
    title: 'URBAN DECAY',
    subtitle: 'Streetwear reimagined',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop',
    tag: 'Ексклюзив'
  },
  {
    title: 'RAW DENIM',
    subtitle: 'Японський деним',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1000&fit=crop',
    tag: 'Лімітована'
  }
]

export default function Collections() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
      <section id="collections" ref={ref} className="w-full py-28 md:py-40 lg:py-56 flex justify-center">
        <div className="w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 text-center">
      {/* Section header */}
      <motion.div
        className="mb-16 md:mb-20 lg:mb-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[var(--color-brand)] text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-5 font-medium">
          Колекції
        </p>
        <h2 className="font-[Outfit] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          СЕЗОН
          <span className="text-gradient"> SS26</span>
        </h2>
      </motion.div>

      {/* Collection grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-8 place-items-center">
        {collections.map((col, i) => (
          <motion.div
            key={col.title}
            className="group relative aspect-[2/3] rounded-2xl overflow-hidden img-zoom cursor-pointer"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            data-cursor-hover
          >
            {/* Image */}
            <img
              src={col.image}
              alt={col.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Tag */}
            <div className="absolute top-5 left-5 z-10">
              <span className="text-[11px] tracking-[0.25em] uppercase text-black bg-[var(--color-brand)] px-5 py-2 rounded-full font-semibold">
                {col.tag}
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
              <p className="text-white/60 text-xs tracking-[0.25em] uppercase mb-3">
                {col.subtitle}
              </p>
              <h3 className="font-[Outfit] text-3xl md:text-4xl font-bold tracking-wide text-white">
                {col.title}
              </h3>
              
              {/* Hover line */}
              <div className="mt-4 h-[1px] bg-white/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--color-brand)]"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.6 }}
                  style={{ width: '0%' }}
                />
                <div className="absolute inset-y-0 left-0 bg-[var(--color-brand)] w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              </div>
              
              <p className="mt-4 text-white/0 group-hover:text-white/60 text-sm transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                Дослідити →
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
}
