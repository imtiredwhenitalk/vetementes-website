import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Instagram, Twitter, Youtube, MapPin, Mail, Phone } from 'lucide-react'

const footerLinks = {
  'Магазин': ['Новинки', 'Бестселери', 'Sale', 'Колекції', 'Подарункові картки'],
  'Допомога': ['Доставка', 'Повернення', 'Розміри', 'FAQ', 'Контакти'],
  'Компанія': ['Про нас', 'Кар\'єра', 'Преса', 'Sustainability', 'Партнери'],
}

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer
      id="footer"
      ref={ref}
        className="w-full relative overflow-hidden border-t border-white/6 bg-linear-to-b from-white/2 via-transparent to-white/2 py-28 md:py-40 lg:py-56"
    >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 md:gap-20 mb-24 md:mb-32">
          {/* Brand */}
          <motion.div
            className="lg:col-span-2 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[Sora] text-3xl md:text-4xl font-bold tracking-[0.2em] text-white mb-6">
              Vetementes
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
              Motion-first fashion commerce з Києва для всього світу.
              Переосмислюємо digital shopping з 2026.
            </p>

            {/* Contact */}
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex lg:flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors text-sm">
                <MapPin size={16} /> Київ, Україна
              </div>
              <div className="inline-flex lg:flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors text-sm">
                <Mail size={16} /> hello@vetementes.com
              </div>
              <div className="inline-flex lg:flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors text-sm">
                <Phone size={16} /> +380 (XX) XXX-XX-XX
              </div>
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], groupIndex) => (
            <motion.div
              key={title}
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + groupIndex * 0.1 }}
            >
              <h4 className="text-xs tracking-[0.2em] uppercase text-white/70 font-semibold mb-6">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white hover:text-brand transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Socials & payment */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/70 font-semibold mb-6">
              Слідкуй за нами
            </h4>
            <div className="flex gap-4 mb-10 justify-center lg:justify-start">
              {socials.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-white/40 hover:text-brand hover:border-brand/30 transition-all duration-300"
                  data-cursor-hover
                  title={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <h4 className="text-xs tracking-[0.2em] uppercase text-white/70 font-semibold mb-5">
              Оплата
            </h4>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {['Visa', 'MC', 'AMEX', 'Apple Pay'].map(method => (
                <span
                  key={method}
                  className="text-[11px] text-white/40 tracking-wider px-4 py-2 border border-white/8 rounded-lg hover:border-white/20 transition-colors"
                >
                  {method}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 my-12 md:my-16" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
          <p className="text-white/40 text-xs tracking-wider">
            © 2026 Vetementes. Всі права захищені.
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['Конфіденційність', 'Умови', 'Cookies'].map(link => (
              <a
                key={link}
                href="#"
                className="text-white/40 hover:text-white/60 transition-colors text-xs tracking-wider"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Watermark */}
        <motion.div
          className="mt-20 md:mt-28 overflow-hidden flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="font-[Sora] text-7xl md:text-8xl font-bold tracking-widest text-white/3 text-center leading-none select-none whitespace-nowrap">
            Vetementes
          </h2>
        </motion.div>
      </div>
    </footer>
  )
}
