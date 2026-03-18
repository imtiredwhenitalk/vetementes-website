import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { products, categories, type Product } from '../data/products'
import ProductCard from './ProductCard'
import { SlidersHorizontal } from 'lucide-react'
import { useLang } from '../context/LangContext'

interface Props {
  onProductClick: (product: Product) => void
}

export default function Products({ onProductClick }: Props) {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLang()

  const filtered = products
    .filter(p => activeCategory === 'Все' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return 0
    })

  return (
      <section id="products" ref={ref} className="w-full py-28 md:py-40 lg:py-56 relative flex justify-center">
        <div className="w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-16 text-center">
      {/* Header */}
      <motion.div
        className="mb-16 md:mb-20 lg:mb-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[var(--color-brand-light)] text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-3 sm:mb-5 font-semibold">
          {t.products.section}
        </p>
        <h2 className="font-[Sora] text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 sm:mb-4">
          {t.products.title}
        </h2>
        <p className="text-white/60 text-base sm:text-lg font-medium">
          {t.products.items(filtered.length)}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="neo-panel rounded-3xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-center gap-4 sm:gap-6 mb-10 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm tracking-[0.12em] uppercase transition-all duration-400 border ${
                activeCategory === cat
                  ? 'bg-[var(--color-brand)] text-[#04120e] border-[var(--color-brand)] font-semibold soft-ring'
                  : 'bg-transparent text-white/70 border-white/12 hover:border-[var(--color-brand)]/30 hover:text-white'
              }`}
              data-cursor-hover
            >
              {cat === 'Все' ? t.products.all : cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-center gap-3">
          <SlidersHorizontal size={16} className="text-[var(--color-brand-light)]" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-[rgba(9,14,26,0.75)] text-white/80 text-sm tracking-wider uppercase border border-white/15 rounded-full px-5 py-3 outline-none focus:border-[var(--color-brand)]/50 appearance-none cursor-pointer"
          >
            <option value="default" className="bg-[var(--color-dark)]">{t.products.sortDefault}</option>
            <option value="price-asc" className="bg-[var(--color-dark)]">{t.products.sortPriceAsc}</option>
            <option value="price-desc" className="bg-[var(--color-dark)]">{t.products.sortPriceDesc}</option>
          </select>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 justify-center w-full"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onClick={() => onProductClick(product)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <motion.p
          className="text-center text-white/30 py-20 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t.products.noItems}
        </motion.p>
      )}
      </div>
    </section>
  )
}
