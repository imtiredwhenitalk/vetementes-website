import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Check } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
  onClose: () => void
  onCheckout: () => void
}

export default function ProductModal({ product, onClose, onCheckout }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const { addItem } = useCart()

  const images = [product.image, product.hoverImage]

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor.name)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full sm:max-w-6xl md:max-w-7xl max-h-[92vh] sm:max-h-[90vh] bg-[var(--color-card)] border border-white/[0.06] sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col md:flex-row"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors"
          data-cursor-hover
        >
          <X size={18} />
        </button>

        {/* Images */}
        <div className="md:w-1/2 relative flex-shrink-0">
          <div className="aspect-[4/3] sm:aspect-[3/4] overflow-hidden">
            <motion.img
              key={activeImage}
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Image switcher */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  activeImage === i ? 'bg-[var(--color-brand)]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className={`text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full ${
                product.isSale
                  ? 'bg-red-500 text-white'
                  : 'bg-[var(--color-brand)] text-black'
              }`}>
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-8 sm:p-12 md:p-16 overflow-y-auto flex flex-col">
          <div className="flex-1">
            {/* Category */}
            <p className="text-[var(--color-brand)] text-xs tracking-[0.3em] uppercase mb-3">
              {product.category}
            </p>
            
            {/* Name */}
            <h2 className="font-[Outfit] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 sm:mb-4">
              {product.name}
            </h2>
            
            {/* Price */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <span className="text-lg font-bold text-[var(--color-brand)]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-white/30 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              {product.description}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-white/[0.06] mb-6" />

            {/* Color selection */}
            <div className="mb-6">
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
                Колір: <span className="text-white/70 font-medium">{selectedColor.name}</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-300 shadow-lg hover:scale-110 ${
                      selectedColor.name === color.name
                        ? 'border-[var(--color-brand)] scale-110 ring-2 ring-[var(--color-brand)]/30'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-[0.2em] uppercase text-white/40">
                  Розмір: <span className="text-white/70">{selectedSize}</span>
                </p>
                <button
                  onClick={() => setShowGuide(true)}
                  className="text-[var(--color-brand)] text-xs hover-underline hidden sm:inline"
                >
                  Гід по розмірах
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-full sm:w-auto min-w-[40px] sm:min-w-[48px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 border ${
                      selectedSize === size
                        ? 'bg-[var(--color-brand)] text-black border-[var(--color-brand)] font-semibold'
                        : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'
                    }`}
                    data-cursor-hover
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div className="space-y-4 pt-4 border-t border-white/[0.06]">
            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-xs tracking-[0.2em] uppercase text-white/40">Кількість</span>
              <div className="flex items-center gap-1 border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <motion.button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-2xl text-xs tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2.5 transition-all duration-500 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-[var(--color-brand)] text-black hover:bg-[var(--color-brand-light)]'
              }`}
              whileTap={{ scale: 0.97 }}
              data-cursor-hover
            >
              {added ? (
                <>
                  <Check size={16} />
                  Додано в кошик
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Додати в кошик • ${product.price * quantity}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showGuide && (
          <motion.div
            className="absolute inset-0 z-[120] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowGuide(false)} />
            <motion.div
              className="relative z-10 w-full max-w-lg bg-[var(--color-card)] border border-white/[0.08] rounded-2xl shadow-2xl p-6 sm:p-8"
              initial={{ scale: 0.9, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 10, opacity: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 260 }}
            >
              <button
                onClick={() => setShowGuide(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/12 transition-colors"
                aria-label="Закрити гід розмірів"
              >
                <X size={16} />
              </button>
              <h3 className="font-[Outfit] text-xl sm:text-2xl font-semibold text-white mb-3">
                Гід по розмірах
              </h3>
              <p className="text-white/60 text-sm mb-5">
                Підійде стандартній європейській сітці. Обирайте звичний розмір або звіртесь з таблицею нижче.
              </p>

              <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm text-white/80">
                <div className="col-span-1 text-white/40 uppercase tracking-[0.18em]">Розмір</div>
                <div className="col-span-2 text-white/40 uppercase tracking-[0.18em]">Обхват грудей / талії (см)</div>
                {product.sizes.map(size => (
                  <div className="contents" key={size}>
                    <div className="py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      {size}
                    </div>
                    <div className="py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      86–94 / 70–82
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-white/50 text-xs mt-4">
                Порада: якщо ви між двома розмірами — для оверсайзу беріть більший, для приталеного — менший.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
