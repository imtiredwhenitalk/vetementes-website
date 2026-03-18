import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
  index: number
  onClick: () => void
}

export default function ProductCard({ product, index, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setLiked] = useState(false)
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, product.sizes[Math.floor(product.sizes.length / 2)], product.colors[0].name)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group card-glow neo-panel rounded-3xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-cursor-hover
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Main image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          loading="lazy"
        />
        {/* Hover image */}
        <motion.img
          src={product.hoverImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 1.05 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`text-[11px] tracking-[0.15em] uppercase font-bold px-3.5 py-1.5 rounded-full border ${
              product.isSale
                ? 'bg-red-500/90 text-white border-red-400/50'
                : product.isNew
                  ? 'bg-[var(--color-brand)] text-[#02130e] border-[var(--color-brand-light)]/40'
                  : 'bg-white/90 text-black border-white/80'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Like button */}
        <motion.button
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-black/40 border border-white/15 backdrop-blur-sm flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation()
            setLiked(!liked)
          }}
          whileTap={{ scale: 0.85 }}
          animate={{ opacity: isHovered || liked ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            size={16}
            className={liked ? 'fill-red-500 text-red-500' : 'text-white'}
          />
        </motion.button>

        {/* Quick add button */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 sm:py-2.5 bg-[var(--color-brand)] text-[#03120e] text-[11px] tracking-[0.15em] uppercase font-semibold rounded-xl flex items-center justify-center gap-1.5 hover:bg-[var(--color-brand-light)] transition-colors duration-300"
          >
            <ShoppingBag size={12} />
            В кошик
          </button>
        </motion.div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info */}
        <div className="p-7 sm:p-9 md:p-11 pb-9 sm:pb-11">
          <div className="mb-4 sm:mb-6">
          <p className="text-[var(--color-brand-light)] text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-2 font-semibold opacity-90">
            {product.category}
          </p>
          <h3 className="font-[Sora] text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-[var(--color-brand-light)] transition-colors duration-300 leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>
          <p className="text-white/62 text-sm sm:text-base leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

          <div className="mt-7 sm:mt-8 px-2 sm:px-4 flex items-center justify-between gap-6 sm:gap-8">
          <div className="flex items-center gap-2 flex-wrap">
            {product.colors.map(color => (
              <div
                key={color.name}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white/20 hover:border-[var(--color-brand-light)] hover:scale-110 transition-all duration-200 cursor-pointer shadow-lg"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[var(--color-brand-light)] font-bold text-base sm:text-lg md:text-xl">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-white/30 text-xs sm:text-sm line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
