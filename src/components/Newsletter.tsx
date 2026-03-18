import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section ref={ref} className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden flex justify-center">
      {/* Background accents */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand/4 to-transparent" />
      <div className="absolute -left-20 top-10 w-64 h-64 bg-brand/8 blur-3xl" />
      <div className="absolute -right-24 bottom-4 w-72 h-72 bg-white/5 blur-3xl" />

      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        <motion.div
          className="w-full max-w-6xl mx-auto bg-white/3 border border-white/8 rounded-[28px] px-6 sm:px-10 md:px-14 lg:px-16 py-8 sm:py-10 md:py-12 shadow-[0_30px_120px_rgba(0,0,0,0.4)] text-center backdrop-blur flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand text-[11px] tracking-[0.32em] uppercase mb-6">
            Будь в курсі
          </div>

          <h2 className="font-[Outfit] text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.05] text-center">
            ПРИЄДНУЙСЯ ДО <span className="text-gradient">КОЛА</span>
          </h2>
          <p className="text-white/65 text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-3xl mx-auto text-center leading-relaxed">
            Отримуй ранній доступ до нових колекцій, ексклюзивні знижки та запрошення на закриті івенти.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto md:translate-x-4">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 bg-white/5 border border-white/12 rounded-2xl text-white text-sm sm:text-base text-center placeholder:text-white/35 outline-none focus:border-brand/50 transition-all duration-300"
                required
              />
              <motion.button
                type="submit"
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-500 shadow-lg shadow-(--color-brand)/20 shrink-0 ${
                  submitted
                    ? 'bg-green-500'
                    : 'bg-brand hover:bg-brand-light'
                }`}
                whileTap={{ scale: 0.9 }}
                data-cursor-hover
              >
                {submitted ? (
                  <Check size={12} className="text-white" />
                ) : (
                  <Send size={10} className="text-black" />
                )}
              </motion.button>
            </div>
            {submitted && (
              <motion.p
                className="text-green-400 text-xs mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Дякуємо! Ви підписані на наші новини ✦
              </motion.p>
            )}
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7 mt-8 md:mt-10">
            {['Безпечна оплата', 'Безкоштовна доставка', 'Повернення 30 днів'].map(badge => (
              <span key={badge} className="text-white/40 text-xs tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand rounded-full" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
