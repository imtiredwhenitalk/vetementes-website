import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { products } from '../data/products'
import type { Product } from '../data/products'
import { useLang } from '../context/LangContext'

interface Props {
  onClose: () => void
  onSelect: (product: Product) => void
}

export default function SmartSearch({ onClose, onSelect }: Props) {
  const { lang } = useLang()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products.slice(0, 6)
    return products
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [query])

  return (
    <motion.div
      className="fixed inset-0 z-[220] flex items-start justify-center px-4 sm:px-6 pt-24 pb-10 bg-black/60 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-3xl bg-[var(--color-card)] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, y: 14, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 10, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
      >
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-white/[0.08]">
          <Search size={18} className="text-[var(--color-brand)]" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={lang === 'uk' ? 'Пошук товарів...' : 'Search products...'}
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm sm:text-base"
          />
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <AnimatePresence initial={false}>
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                className="px-5 py-8 text-center text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {lang === 'uk' ? 'Нічого не знайдено' : 'No results found'}
              </motion.div>
            ) : (
              filtered.map((item, idx) => (
                <motion.button
                  key={item.id}
                  className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => onSelect(item)}
                >
                  <div className="w-14 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-white truncate">{item.name}</p>
                    <p className="text-xs text-white/50 mt-1 truncate">{item.category}</p>
                    <p className="text-sm text-[var(--color-brand)] font-semibold mt-1">{item.price.toLocaleString()} ₴</p>
                  </div>
                </motion.button>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}
