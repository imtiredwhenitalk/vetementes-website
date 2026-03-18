import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-24 md:pt-28">
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1900&h=1200&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_25%,rgba(87,230,203,0.24),transparent_36%),radial-gradient(circle_at_90%_20%,rgba(255,139,116,0.2),transparent_34%),linear-gradient(160deg,rgba(4,8,18,0.84),rgba(8,13,25,0.92))]" />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 min-h-[calc(100vh-6rem)] flex items-center"
        style={{ y: textY, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 w-full items-end">
          <div className="lg:col-span-12 text-left">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              <span className="neo-pill text-[11px] sm:text-xs tracking-[0.4em] uppercase text-[var(--color-brand-light)] px-5 py-2 rounded-full inline-flex items-center gap-2">
                Mode Commerce 2026
              </span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                className="font-[Sora] text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8.4rem] font-extrabold tracking-tight leading-[0.88] text-white"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.6 }}
              >
                NEXT-GEN
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-1 sm:mt-2">
              <motion.h1
                className="font-[Sora] text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8.4rem] font-extrabold tracking-tight leading-[0.88] text-gradient"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 2.8 }}
              >
                FASHION STORE
              </motion.h1>
            </div>

            <motion.p
              className="mt-6 sm:mt-8 text-white/75 text-sm sm:text-base md:text-lg max-w-2xl tracking-wide leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
            >
              Магазин нового покоління: адаптивний UX, ultra-fast checkout, smart-пошук та
              картки товарів, що реагують на ваш стиль в реальному часі.
            </motion.p>

            <motion.div
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.4 }}
            >
              <a
                href="#products"
                className="magnetic-btn group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 border border-[var(--color-brand)]/40 text-white text-xs tracking-[0.2em] uppercase overflow-hidden rounded-full"
                data-cursor-hover
              >
                <span className="relative z-10 group-hover:text-[#05110f] transition-colors duration-500">
                  Перейти до каталогу
                </span>
              </a>

              <a
                href="#collections"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-white/18 text-white/80 hover:text-white text-xs uppercase tracking-[0.16em] transition-colors"
                data-cursor-hover
              >
                Дивитись колекції
              </a>
            </motion.div>
          </div>

        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 0.8 }}
      >
        <span className="text-white/35 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-[var(--color-brand-light)]" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
      >
        <p className="text-white/15 text-[10px] tracking-[0.5em] uppercase -rotate-90 origin-center whitespace-nowrap">
          Vetementes - EST. 2026
        </p>
      </motion.div>

      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
      >
        <p className="text-white/15 text-[10px] tracking-[0.5em] uppercase rotate-90 origin-center whitespace-nowrap">
          MOTION COMMERCE - SS26
        </p>
      </motion.div>
    </section>
  )
}
