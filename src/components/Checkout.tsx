import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Trash2, Minus, Plus, CreditCard, Truck, Shield, Check, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { saveOrder } from './AccountModal'

interface Props {
  onBack: () => void
  userId?: string
}

export default function Checkout({ onBack, userId }: Props) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart()
  const [step, setStep] = useState<'info' | 'done'>('info')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    zip: '',
    payment: 'card' as 'card' | 'cash',
    comment: '',
  })

  const shipping = totalPrice > 500 ? 0 : 25
  const finalTotal = totalPrice + shipping

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const uid = userId || 'guest'
    saveOrder(uid, {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: items.map(item => ({
        name: item.product.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: finalTotal,
      shipping,
    })
    setStep('done')
    clearCart()
  }

  if (step === 'done') {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center max-w-lg mx-auto flex flex-col items-center">
          <motion.div
            className="w-28 h-28 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 260, delay: 0.1 }}
          >
            <Check size={48} className="text-green-400" />
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: 'easeOut' }}
          >
            <h2 className="font-[Outfit] text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Замовлення прийнято!
            </h2>
            <p className="text-white/50 text-lg sm:text-xl mb-8 leading-relaxed max-w-xl">
              Дякуємо за покупку! Ми зв'яжемося з вами для підтвердження замовлення.
            </p>
            <motion.button
              onClick={onBack}
              className="px-12 py-5 bg-brand text-black text-base tracking-[0.15em] uppercase font-semibold rounded-2xl hover:bg-brand-light transition-colors"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.4 }}
              whileTap={{ scale: 0.97 }}
            >
              Повернутися на головну
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="w-full min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl w-full mx-auto px-6 sm:px-8 md:px-12">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-3 text-white/50 hover:text-white transition-colors mb-10 group mx-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          data-cursor-hover
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-base tracking-[0.12em] uppercase">Назад до каталогу</span>
        </motion.button>

        <motion.h1
          className="font-[Outfit] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-10 sm:mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Оформлення <span className="text-gradient">замовлення</span>
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Package size={56} className="text-white/15 mx-auto mb-8" />
            <p className="text-white/40 text-xl mb-8">Кошик порожній</p>
            <button
              onClick={onBack}
              className="px-10 py-4 bg-brand text-black text-base tracking-[0.15em] uppercase font-semibold rounded-xl hover:bg-brand-light transition-colors"
            >
              До каталогу
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-stretch">
              <div className="flex-1 max-w-[680px] w-full mx-auto space-y-8 order-1 xl:order-0">
                {/* Contact info */}
                <div className="bg-card border border-white/6 rounded-2xl p-5 sm:p-7 md:p-10 space-y-5 sm:space-y-7">
                  <h3 className="font-[Outfit] text-xl sm:text-2xl font-semibold flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center">
                      <span className="text-brand text-sm sm:text-base font-bold">1</span>
                    </div>
                    Контактні дані
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <InputField
                      label="Ім'я"
                      value={form.firstName}
                      onChange={v => handleChange('firstName', v)}
                      required
                    />
                    <InputField
                      label="Прізвище"
                      value={form.lastName}
                      onChange={v => handleChange('lastName', v)}
                      required
                    />
                    <InputField
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={v => handleChange('email', v)}
                      required
                    />
                    <InputField
                      label="Телефон"
                      type="tel"
                      value={form.phone}
                      onChange={v => handleChange('phone', v)}
                      placeholder="+380"
                      required
                    />
                  </div>
                </div>

                {/* Delivery */}
                <div className="bg-card border border-white/6 rounded-2xl p-5 sm:p-7 md:p-10 space-y-5 sm:space-y-7">
                  <h3 className="font-[Outfit] text-xl sm:text-2xl font-semibold flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center">
                      <span className="text-brand text-sm sm:text-base font-bold">2</span>
                    </div>
                    Доставка
                  </h3>

                  <div className="space-y-4 sm:space-y-6">
                    <InputField
                      label="Місто"
                      value={form.city}
                      onChange={v => handleChange('city', v)}
                      required
                    />
                    <InputField
                      label="Адреса"
                      value={form.address}
                      onChange={v => handleChange('address', v)}
                      placeholder="Вулиця, будинок, квартира"
                      required
                    />
                    <InputField
                      label="Поштовий індекс"
                      value={form.zip}
                      onChange={v => handleChange('zip', v)}
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card border border-white/6 rounded-2xl p-5 sm:p-7 md:p-10 space-y-5 sm:space-y-7">
                  <h3 className="font-[Outfit] text-xl sm:text-2xl font-semibold flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center">
                      <span className="text-brand text-sm sm:text-base font-bold">3</span>
                    </div>
                    Оплата
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                    <button
                      type="button"
                      onClick={() => handleChange('payment', 'card')}
                      className={`p-4 sm:p-6 rounded-xl border transition-all duration-300 text-left ${
                        form.payment === 'card'
                          ? 'border-brand bg-brand/5'
                          : 'border-white/8 hover:border-white/20'
                      }`}
                    >
                      <CreditCard size={24} className={form.payment === 'card' ? 'text-brand' : 'text-white/40'} />
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold">Карткою онлайн</p>
                      <p className="text-sm text-white/30 mt-1">Visa, Mastercard</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('payment', 'cash')}
                      className={`p-4 sm:p-6 rounded-xl border transition-all duration-300 text-left ${
                        form.payment === 'cash'
                          ? 'border-brand bg-brand/5'
                          : 'border-white/8 hover:border-white/20'
                      }`}
                    >
                      <Truck size={24} className={form.payment === 'cash' ? 'text-brand' : 'text-white/40'} />
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base font-semibold">Накладений платіж</p>
                      <p className="text-sm text-white/30 mt-1">Оплата при отриманні</p>
                    </button>
                  </div>
                </div>

                {/* Comment */}
                <div className="bg-card border border-white/6 rounded-2xl p-5 sm:p-7 md:p-10 space-y-4 sm:space-y-6">
                  <h3 className="font-[Outfit] text-xl font-semibold">Коментар до замовлення</h3>
                  <textarea
                    value={form.comment}
                    onChange={e => handleChange('comment', e.target.value)}
                    placeholder="Додаткові побажання..."
                    rows={3}
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base text-white placeholder-white/25 outline-none focus:border-brand/40 transition-colors resize-none"
                  />
                </div>
              </div>

              <motion.div
                className="w-full max-w-[420px] mx-auto xl:mx-0 order-2 xl:order-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-card border border-white/6 rounded-2xl p-5 sm:p-6 md:p-7 shadow-2xl">
                  <h3 className="font-[Outfit] text-2xl font-semibold mb-6 text-center">
                    Ваше замовлення ({totalItems})
                  </h3>

                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 mb-6">
                    <AnimatePresence>
                      {items.map(item => (
                        <motion.div
                          key={`${item.product.id}-${item.size}-${item.color}`}
                          className="flex gap-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          layout
                        >
                          <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold truncate">{item.product.name}</h4>
                            <p className="text-xs text-white/40 mt-1">{item.size} / {item.color}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1 border border-white/10 rounded-lg">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white rounded transition-colors"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-sm w-6 text-center font-medium">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white rounded transition-colors"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-base font-bold text-[var(--color-brand)]">
                                  {(item.product.price * item.quantity).toLocaleString()} ₴
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeItem(item.product.id, item.size, item.color)}
                                  className="text-white/20 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="h-px bg-white/[0.06] mb-5" />

                  <div className="space-y-3 mb-5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Товари ({totalItems})</span>
                      <span className="font-medium">{totalPrice.toLocaleString()} ₴</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Доставка</span>
                      <span className="font-medium">{shipping === 0 ? <span className="text-green-400">Безкоштовно</span> : `${shipping} ₴`}</span>
                    </div>
                    {totalPrice > 500 && (
                      <p className="text-xs text-green-400/70">Безкоштовна доставка від $500</p>
                    )}
                  </div>

                  <div className="h-px bg-white/[0.06] mb-5" />

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Разом</span>
                    <span className="font-[Outfit] text-2xl font-bold text-[var(--color-brand)]">{finalTotal.toLocaleString()} ₴</span>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-brand text-black text-sm sm:text-base tracking-[0.15em] uppercase font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-brand-light transition-colors"
                    whileTap={{ scale: 0.97 }}
                    data-cursor-hover
                  >
                    Оформити замовлення
                  </motion.button>

                  <div className="flex items-center justify-center gap-4 mt-6 text-white/25 text-xs">
                    <div className="flex items-center gap-2">
                      <Shield size={14} />
                      <span>Безпечна оплата</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={14} />
                      <span>Швидка доставка</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  )
}

/* Reusable input component */
function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm tracking-[0.1em] uppercase text-white/50 mb-3 font-medium">
        {label} {required && <span className="text-[var(--color-brand)]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-white/25 outline-none focus:border-[var(--color-brand)]/40 transition-colors"
      />
    </div>
  )
}
