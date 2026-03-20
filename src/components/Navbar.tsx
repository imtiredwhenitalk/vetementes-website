import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ShoppingBag, Menu, X, Search, User, LogIn } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LangContext'
import type { AuthUser } from './AuthModal'

interface NavbarProps {
  onCartClick?: () => void
  onAuthClick?: () => void
  onAccountClick?: () => void
  onSearchClick?: () => void
  currentUser?: AuthUser | null
}

export default function Navbar({ onCartClick, onAuthClick, onAccountClick, onSearchClick, currentUser }: NavbarProps) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { toggleCart, totalItems, justAdded } = useCart()
  const { lang, setLang, t } = useLang()
  const nextLang = lang === 'uk' ? 'en' : lang === 'en' ? 'ru' : 'uk'
  const nextLangLabel = nextLang === 'uk' ? 'UA' : nextLang.toUpperCase()

  const navLinks = [
    { name: t.nav.collections, href: '#collections' },
    { name: t.nav.catalog, href: '#products' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contacts, href: '#footer' },
  ]

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4'
            : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16">
            <div className={`relative flex items-center justify-between rounded-2xl px-6 sm:px-8 md:px-10 py-4 border transition-all duration-500 ${
              scrolled
                ? 'neo-panel border-[var(--color-brand)]/25 shadow-[0_18px_40px_rgba(3,7,18,0.6)]'
                : 'bg-[rgba(9,14,26,0.62)] border-white/10 backdrop-blur-md'
            }`}>
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover-underline text-[12px] tracking-[0.18em] uppercase text-white/70 hover:text-[var(--color-brand-light)] transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a href="#" className="absolute left-1/2 -translate-x-1/2 z-10">
            <motion.h1
              className="font-[Sora] text-sm sm:text-base md:text-lg font-bold tracking-[0.28em] text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Vetementes
            </motion.h1>
          </a>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 justify-end">
            {/* Language toggle */}
            <button
              onClick={() => setLang(nextLang)}
              className="text-white/60 hover:text-white transition-colors text-xs tracking-[0.15em] uppercase font-semibold border border-white/15 hover:border-[var(--color-brand)]/50 px-2.5 py-1 rounded-lg"
              data-cursor-hover
            >
              {nextLangLabel}
            </button>

            <button
              className="hidden md:flex items-center gap-2 neo-pill rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors"
              data-cursor-hover
              onClick={() => onSearchClick?.()}
            >
              <Search size={14} />
              <span>Smart Search</span>
            </button>

            {/* Auth button */}
            {currentUser ? (
              <button
                onClick={onAccountClick}
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
                data-cursor-hover
                title={currentUser.firstName}
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--color-brand)]/16 border border-[var(--color-brand)]/35 flex items-center justify-center">
                  <span className="text-[var(--color-brand-light)] text-xs font-bold">
                    {currentUser.firstName[0].toUpperCase()}
                  </span>
                </div>
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-[var(--color-brand-light)] transition-colors text-xs tracking-[0.12em] uppercase"
                data-cursor-hover
              >
                <LogIn size={16} />
                <span>{t.nav.login}</span>
              </button>
            )}

            <button
              className="relative text-white/70 hover:text-white transition-colors w-9 h-9 rounded-xl border border-white/10 hover:border-[var(--color-brand)]/45 flex items-center justify-center"
              onClick={() => totalItems > 0 && onCartClick ? onCartClick() : toggleCart()}
              data-cursor-hover
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-2 -right-2 min-w-5 px-1 h-5 bg-[var(--color-brand)] text-[#03110d] text-[10px] font-bold rounded-full flex items-center justify-center ${
                    justAdded ? 'badge-pulse' : ''
                  }`}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <motion.div
        className={`fixed inset-0 z-40 bg-[radial-gradient(circle_at_top,rgba(87,230,203,0.18),transparent_34%),linear-gradient(180deg,#050811,#0a1020)] flex flex-col items-center justify-center gap-8 lg:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={false}
        animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            className="font-[Sora] text-3xl font-semibold tracking-[0.16em] uppercase text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: menuOpen ? 0.1 + i * 0.08 : 0, duration: 0.5 }}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </motion.a>
        ))}

        {/* Mobile auth */}
        <motion.div
          className="flex items-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: menuOpen ? 0.5 : 0 }}
        >
          {currentUser ? (
            <button
              onClick={() => { setMenuOpen(false); onAccountClick?.() }}
              className="flex items-center gap-2 text-[var(--color-brand-light)] text-base tracking-wider uppercase"
            >
              <User size={18} />
              {currentUser.firstName}
            </button>
          ) : (
            <button
              onClick={() => { setMenuOpen(false); onAuthClick?.() }}
              className="flex items-center gap-2 text-white/70 text-base tracking-wider uppercase"
            >
              <LogIn size={18} />
              {t.nav.login}
            </button>
          )}
          <span className="text-white/20">|</span>
          <button
            onClick={() => setLang(nextLang)}
            className="text-white/60 text-sm tracking-[0.2em] uppercase"
          >
            {nextLangLabel}
          </button>
        </motion.div>
      </motion.div>
    </>
  )
}
