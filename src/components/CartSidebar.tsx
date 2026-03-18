import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartSidebar({ onCheckout }: { onCheckout: () => void }) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[90] w-full sm:max-w-md bg-[var(--color-dark)] border-l border-white/[0.06] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[var(--color-brand)]" />
                <h3 className="font-[Outfit] text-lg font-semibold tracking-wide">
                  Кошик
                </h3>
                <span className="text-xs text-white/40">
                  ({totalItems})
                </span>
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-white/30 hover:text-red-400 transition-colors text-xs tracking-wider uppercase"
                  >
                    Очистити
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
                  aria-label="Закрити кошик"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
                  <div className="w-20 h-20 rounded-full bg-white/[0.03] flex items-center justify-center">
                    <ShoppingBag size={32} className="text-white/15" />
                  </div>
                  <p className="text-white/30 text-sm">Кошик порожній</p>
                  <button
                    onClick={closeCart}
                    className="text-[var(--color-brand)] text-sm hover-underline"
                  >
                    Назад до каталогу
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-4 px-6 py-4 border-b border-white/[0.04]"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      {/* Image */}
                      <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-[Outfit] text-sm font-medium text-white truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-white/30 text-xs mt-1">
                          {item.size} / {item.color}
                        </p>
                        <p className="text-[var(--color-brand)] font-semibold text-sm mt-2">
                          ${item.product.price * item.quantity}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1 border border-white/10 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/[0.06] space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">Підсумок</span>
                  <span className="font-[Outfit] text-xl font-bold text-white">
                    ${totalPrice}
                  </span>
                </div>
                <p className="text-white/20 text-xs">
                  Доставка розраховується при оформленні
                </p>

                {/* Checkout button */}
                <motion.button
                  className="w-full py-4 bg-[var(--color-brand)] text-black text-sm tracking-[0.15em] uppercase font-semibold rounded-2xl flex items-center justify-center gap-3 hover:bg-[var(--color-brand-light)] transition-colors"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { closeCart(); onCheckout(); }}
                  data-cursor-hover
                >
                  Оформити замовлення
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
