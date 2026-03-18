import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { number: '50K+', label: 'Задоволених клієнтів' },
  { number: '120+', label: 'Країн доставки' },
  { number: '2024', label: 'Рік заснування' },
  { number: '100%', label: 'Якість матеріалів' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
     <section id="about" ref={ref} className="w-full py-28 md:py-40 lg:py-56 relative overflow-hidden flex justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[var(--color-brand)] rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[var(--color-brand)] rounded-full blur-[128px]" />
      </div>

      <div className="w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 relative z-10 text-center">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24 lg:mb-32 w-full flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[var(--color-brand)] text-sm sm:text-base tracking-[0.5em] uppercase mb-6 font-semibold">
            Про бренд
          </p>
          <h2 className="font-[Outfit] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-full leading-[1.05] text-center">
            МИ СТВОРЮЄМО
            <span className="text-gradient"> МАЙБУТНЄ</span> МОДИ
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 md:gap-20 lg:gap-24 xl:gap-28 mb-20 md:mb-28 items-center justify-items-center text-center lg:text-left">
          {/* Left - Image (зменшуємо до 2 колонок з 5) */}
          <motion.div
            className="lg:col-span-2 relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=700&h=900&fit=crop"
              alt="Vetementes atelier"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-darker)]/60 to-transparent" />
          </motion.div>

          {/* Right - Text (збільшуємо до 3 колонок з 5) */}
          <motion.div
            className="lg:col-span-3 flex flex-col justify-center text-center lg:text-left lg:pl-4 xl:pl-8"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
              <span className="text-white font-semibold text-xl md:text-2xl lg:text-3xl">Vetementes</span> — це більше, ніж бренд одягу. 
              Це рух, що переосмислює межі сучасної моди. Заснований у Києві у 2024 році, 
              Vetementes поєднує деконструктивізм, вуличну естетику та преміальну якість.
            </p>
            <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
              Ми використовуємо лише найкращі матеріали — японський денім, 
              італійську вовну, органічну бавовну — щоб кожна річ не просто виглядала, 
              а відчувалася по-особливому.
            </p>
            <p className="text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed mb-12">
              Наша місія — дати кожному інструмент самовираження через одяг. 
              Без правил. Без обмежень. Тільки ти і твій стиль.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-8">
              {['Sustainability', 'Innovation', 'Quality', 'Culture'].map((value, i) => (
                <motion.div
                  key={value}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="w-12 h-[2px] bg-[var(--color-brand)] mb-4 group-hover:w-16 transition-all duration-500" />
                  <p className="text-white text-base md:text-lg font-medium tracking-wide">{value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 justify-items-center text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center py-8 border-t border-white/[0.06]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            >
              <p className="font-[Outfit] text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.number}
              </p>
              <p className="text-white/40 text-xs tracking-[0.15em] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
