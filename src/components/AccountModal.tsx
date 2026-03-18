import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Package, LogOut, ShoppingBag, Phone, User as UserIcon, Save } from 'lucide-react'
import { useLang } from '../context/LangContext'
import api from '../services/api'
import type { AuthUser } from './AuthModal'

export interface SavedOrder {
  id: string
  date: string
  items: Array<{ name: string; size: string; color: string; quantity: number; price: number }>
  total: number
  shipping: number
}

export function getOrderHistory(userId: string): SavedOrder[] {
  try {
    return JSON.parse(localStorage.getItem(`vt_orders_${userId}`) || '[]')
  } catch {
    return []
  }
}

export function saveOrder(userId: string, order: SavedOrder) {
  const existing = getOrderHistory(userId)
  localStorage.setItem(`vt_orders_${userId}`, JSON.stringify([order, ...existing]))
}

interface Props {
  user: AuthUser
  onClose: () => void
  onLogout: () => void
}

export default function AccountModal({ user, onClose, onLogout }: Props) {
  const { t } = useLang()
  const orders = getOrderHistory(user.id)
  const [profile, setProfile] = useState({
    first_name: user.firstName || '',
    last_name: user.lastName || '',
    phone: user.phone || '',
    email: user.email,
  })
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.getCurrentUser()
        setProfile(prev => ({
          ...prev,
          first_name: res.first_name ?? prev.first_name,
          last_name: res.last_name ?? prev.last_name,
          phone: res.phone ?? prev.phone,
          email: res.email ?? prev.email,
        }))
      } catch (e) {
        console.warn('Profile load failed', e)
      }
    }
    loadProfile()
  }, [])

  const saveProfile = async () => {
    try {
      setSaving(true)
      setSaveMessage('')
      await api.updateProfile({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
      })
      setSaveMessage(t.account?.saved || 'Збережено')
    } catch (e: any) {
      setSaveMessage(e?.error || 'Помилка збереження')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-5xl bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-white/[0.02] border border-white/[0.08] rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-brand)]/15 to-transparent pointer-events-none" />

        <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 pt-7 pb-5 relative z-10">
          <div className="space-y-1">
            <p className="text-white/50 text-[11px] tracking-[0.24em] uppercase">{t.account.title}</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/80 font-semibold">
                {(profile.first_name || user.firstName || 'V').slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h2 className="font-[Outfit] text-2xl md:text-3xl font-bold tracking-tight">{t.account.hello}, {profile.first_name || user.firstName}!</h2>
                <p className="text-white/50 text-sm">{profile.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 sm:px-8 md:px-10 pb-4 space-y-7 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-7">
            <div className="lg:col-span-7 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-7 md:p-8 backdrop-blur">
              <div className="flex items-center gap-2 mb-6">
                <UserIcon size={16} className="text-[var(--color-brand)]" />
                <h3 className="text-sm tracking-[0.22em] uppercase text-white/60">Профіль</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="space-y-2 text-left text-white/60 text-xs tracking-[0.18em] uppercase">
                  <span>Ім'я</span>
                  <input
                    className="w-full rounded-xl bg-white/[0.05] border border-white/[0.1] px-4 py-3 text-white text-sm focus:border-[var(--color-brand)]/70 outline-none"
                    value={profile.first_name}
                    onChange={e => setProfile(p => ({ ...p, first_name: e.target.value }))}
                  />
                </label>
                <label className="space-y-2 text-left text-white/60 text-xs tracking-[0.18em] uppercase">
                  <span>Прізвище</span>
                  <input
                    className="w-full rounded-xl bg-white/[0.05] border border-white/[0.1] px-4 py-3 text-white text-sm focus:border-[var(--color-brand)]/70 outline-none"
                    value={profile.last_name}
                    onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))}
                  />
                </label>
                <label className="space-y-2 text-left text-white/60 text-xs tracking-[0.18em] uppercase">
                  <span>Телефон</span>
                  <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/[0.1] px-3 py-2.5">
                    <Phone size={14} className="text-white/40" />
                    <input
                      className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none"
                      value={profile.phone}
                      onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+380..."
                    />
                  </div>
                </label>
                <label className="space-y-2 text-left text-white/60 text-xs tracking-[0.18em] uppercase">
                  <span>Email</span>
                  <input
                    className="w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-white text-sm opacity-70 cursor-not-allowed"
                    value={profile.email}
                    disabled
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--color-brand)] text-[#05110f] text-sm font-semibold tracking-[0.14em] uppercase hover:brightness-110 transition disabled:opacity-60"
                >
                  <Save size={14} /> {saving ? 'Збереження...' : 'Зберегти'}
                </button>
                {saveMessage && <span className="text-white/60 text-sm">{saveMessage}</span>}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-7 md:p-8 backdrop-blur">
              <div className="flex items-center gap-2 mb-6">
                <Package size={16} className="text-[var(--color-brand)]" />
                <h3 className="text-sm tracking-[0.22em] uppercase text-white/60">{t.account.ordersTitle}</h3>
              </div>

              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <ShoppingBag size={26} className="text-white/18" />
                  </div>
                  <p className="text-white/70 text-sm font-medium">{t.account.noOrders}</p>
                  <p className="text-white/40 text-xs max-w-xs">{t.account.noOrdersHint}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {orders.map((order, idx) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-white font-semibold text-sm tracking-wide">
                            {t.account.orderNum} #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-white/45 text-xs mt-0.5">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] px-3 py-1 rounded-full bg-green-500/12 text-green-300 border border-green-500/20">
                            {t.account.statusCompleted}
                          </span>
                          <p className="text-[var(--color-brand)] font-semibold text-sm mt-1.5">
                            {order.total.toLocaleString()} ₴
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5 border-t border-white/[0.05] pt-3">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between text-xs text-white/60">
                            <span className="truncate max-w-[200px]">
                              {item.name} × {item.quantity}
                              <span className="text-white/30 ml-1">({item.size}, {item.color})</span>
                            </span>
                            <span className="ml-3 flex-shrink-0">
                              {(item.price * item.quantity).toLocaleString()} ₴
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 md:px-10 py-6 border-t border-white/[0.06] bg-white/[0.02]">
          <button
            onClick={() => { onLogout(); onClose() }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/[0.08] text-white/70 hover:text-white hover:border-white/20 transition-all text-sm tracking-[0.12em] uppercase"
          >
            <LogOut size={15} />
            {t.account.logout}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
