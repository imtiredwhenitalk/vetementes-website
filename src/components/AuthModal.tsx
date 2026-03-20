import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useLang } from '../context/LangContext'
import api from '../services/api'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
}

interface Props {
  onClose: () => void
  onAuth: (user: AuthUser) => void
}

export default function AuthModal({ onClose, onAuth }: Props) {
  const { t, lang } = useLang()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  })

  const set = (field: string, value: string) => {
    setError('')
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const fieldAnim = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
  }

  const uiText = {
    fallbackError: lang === 'uk'
      ? 'Сталася помилка. Спробуйте ще раз.'
      : lang === 'ru'
        ? 'Произошла ошибка. Попробуйте еще раз.'
        : 'Something went wrong. Please try again.',
    requiredLogin: lang === 'uk'
      ? 'Заповніть email і пароль'
      : lang === 'ru'
        ? 'Заполните email и пароль'
        : 'Please fill in email and password',
    requiredFields: lang === 'uk'
      ? 'Заповніть всі обов\'язкові поля'
      : lang === 'ru'
        ? 'Заполните все обязательные поля'
        : 'Please fill in all required fields',
    minPassword: lang === 'uk'
      ? 'Пароль має містити мінімум 6 символів'
      : lang === 'ru'
        ? 'Пароль должен содержать минимум 6 символов'
        : 'Password must be at least 6 characters',
    mismatchPassword: lang === 'uk'
      ? 'Паролі не співпадають'
      : lang === 'ru'
        ? 'Пароли не совпадают'
        : 'Passwords do not match',
    loginSubtitle: lang === 'uk'
      ? 'Увійдіть, щоб продовжити покупки'
      : lang === 'ru'
        ? 'Войдите, чтобы продолжить покупки'
        : 'Sign in to continue shopping',
    registerSubtitle: lang === 'uk'
      ? 'Створіть акаунт за хвилину'
      : lang === 'ru'
        ? 'Создайте аккаунт за минуту'
        : 'Create your account in a minute',
    passwordPlaceholder: lang === 'uk'
      ? 'Введіть пароль'
      : lang === 'ru'
        ? 'Введите пароль'
        : 'Enter password',
    signingIn: lang === 'uk'
      ? 'Виконується вхід...'
      : lang === 'ru'
        ? 'Выполняется вход...'
        : 'Signing in...',
    min6Placeholder: lang === 'uk'
      ? 'Мінімум 6 символів'
      : lang === 'ru'
        ? 'Минимум 6 символов'
        : 'At least 6 characters',
    confirmPassword: lang === 'uk'
      ? 'Підтвердіть пароль'
      : lang === 'ru'
        ? 'Подтвердите пароль'
        : 'Confirm password',
    repeatPassword: lang === 'uk'
      ? 'Повторіть пароль'
      : lang === 'ru'
        ? 'Повторите пароль'
        : 'Repeat password',
    creatingAccount: lang === 'uk'
      ? 'Створення акаунту...'
      : lang === 'ru'
        ? 'Создание аккаунта...'
        : 'Creating account...',
    phone: lang === 'uk' ? 'Телефон' : lang === 'ru' ? 'Телефон' : 'Phone',
  }

  const normalizeApiError = (e: unknown): string => {
    const fallback = uiText.fallbackError
    if (e && typeof e === 'object') {
      const err = e as { error?: string; message?: string }
      return err.error || err.message || fallback
    }
    return fallback
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password) {
      setError(uiText.requiredLogin)
      return
    }

    try {
      setLoading(true)
      const response = await api.login({
        email: form.email.trim(),
        password: form.password,
      })
      api.setToken(response.token)

      const user = response.user || {}
      onAuth({
        id: String(user.id ?? ''),
        email: String(user.email ?? form.email.trim()),
        firstName: String(user.first_name || user.firstName || ''),
        lastName: String(user.last_name || user.lastName || ''),
      })
      onClose()
    } catch (e) {
      setError(normalizeApiError(e) || t.auth.loginError)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    setError('')
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password) {
      setError(uiText.requiredFields)
      return
    }
    if (form.password.length < 6) {
      setError(uiText.minPassword)
      return
    }
    if (form.password !== form.confirmPassword) {
      setError(uiText.mismatchPassword)
      return
    }

    try {
      setLoading(true)
      const response = await api.register({
        email: form.email.trim(),
        password: form.password,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        phone: form.phone.trim() || undefined,
      })
      api.setToken(response.token)

      const user = response.user || {}
      onAuth({
        id: String(user.id ?? ''),
        email: String(user.email ?? form.email.trim()),
        firstName: String(user.first_name || user.firstName || form.firstName.trim()),
        lastName: String(user.last_name || user.lastName || form.lastName.trim()),
        phone: String(user.phone || form.phone.trim() || ''),
      })
      onClose()
    } catch (e) {
      setError(normalizeApiError(e) || t.auth.registerError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl lg:max-w-5xl bg-[var(--color-card)] border border-white/[0.12] rounded-[2.4rem] p-10 md:p-14 shadow-2xl max-h-[92vh] overflow-y-auto"
        initial={{ scale: 0.92, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 24, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      >
        <motion.div
          className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand)]/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <div className="text-center mb-8 md:mb-10">
          <motion.h1
            className="font-[Outfit] text-4xl md:text-5xl font-bold tracking-[0.14em] text-white"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            VETEMENTES
          </motion.h1>
          <p className="mt-3 text-white/55 text-base md:text-lg leading-relaxed">
            {tab === 'login'
              ? uiText.loginSubtitle
              : uiText.registerSubtitle}
          </p>
        </div>

        {/* Tabs */}
        <div className="relative flex bg-white/[0.04] rounded-2xl p-2 mb-12 md:mb-12 gap-2">
          <motion.div
            layout
            className={`absolute top-2 bottom-2 rounded-xl bg-[var(--color-brand)] ${tab === 'login' ? 'left-2 right-1/2 mr-2' : 'left-1/2 ml-2 right-2'}`}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
          />
          {(['login', 'register'] as const).map(tabId => (
            <button
              key={tabId}
              onClick={() => {
                setTab(tabId)
                setError('')
                setForm(prev => ({ ...prev, password: '', confirmPassword: '' }))
              }}
              className={`relative z-10 flex-1 py-3 rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ${
                tab === tabId
                  ? 'text-black'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {tabId === 'login' ? t.auth.loginBtn : t.auth.registerBtn}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'login' ? (
            <motion.form
              key="login"
              onSubmit={handleLogin}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-7 md:space-y-8"
            >
              <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.05 }}>
                <label className="block text-white/80 text-sm md:text-base">{t.auth.email}</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    required
                    className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl pl-12 pr-4 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.12 }}>
                <label className="block text-white/80 text-sm md:text-base">{t.auth.password}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder={uiText.passwordPlaceholder}
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    required
                    className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl pl-12 pr-12 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full h-12 md:h-14 bg-[var(--color-brand)] text-black font-semibold text-xs md:text-sm tracking-[0.05em] uppercase rounded-lg hover:bg-[var(--color-brand-light)] transition-colors disabled:opacity-60 shadow-[0_10px_28px_rgba(87,230,203,0.24)]"
              >
                {loading
                  ? uiText.signingIn
                  : t.auth.loginBtn}
              </motion.button>

              <p className="text-white/50 text-sm md:text-base text-center mt-5">
                {t.auth.noAccount}{' '}
                <button type="button" onClick={() => setTab('register')} className="text-[var(--color-brand)] hover:underline">
                  {t.auth.registerLink}
                </button>
              </p>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              onSubmit={handleRegister}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-7 md:space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.05 }}>
                  <label className="block text-white/80 text-sm md:text-base">{t.auth.firstName}</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={t.auth.firstName}
                      value={form.firstName}
                      onChange={e => set('firstName', e.target.value)}
                      required
                      className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl pl-12 pr-4 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                    />
                  </div>
                </motion.div>
                <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.08 }}>
                  <label className="block text-white/80 text-sm md:text-base">{t.auth.lastName}</label>
                  <input
                    type="text"
                    placeholder={t.auth.lastName}
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    required
                    className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl px-4 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                  />
                </motion.div>
              </div>

              <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
                <label className="block text-white/80 text-sm md:text-base">{uiText.phone}</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+380..."
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl px-4 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.12 }}>
                <label className="block text-white/80 text-sm md:text-base">{t.auth.email}</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    required
                    className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl pl-12 pr-4 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.16 }}>
                <label className="block text-white/80 text-sm md:text-base">{t.auth.password}</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder={uiText.min6Placeholder}
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                    required
                    minLength={6}
                    className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl pl-12 pr-12 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>

              <motion.div className="space-y-2.5" variants={fieldAnim} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
                <label className="block text-white/80 text-sm md:text-base">
                  {uiText.confirmPassword}
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    placeholder={uiText.repeatPassword}
                    value={form.confirmPassword}
                    onChange={e => set('confirmPassword', e.target.value)}
                    required
                    minLength={6}
                    className="block w-full h-14 bg-white/[0.05] border border-white/[0.12] rounded-xl pl-12 pr-12 text-white text-base text-center placeholder:text-center leading-normal placeholder:text-white/30 focus:outline-none focus:border-[var(--color-brand)]/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="mt-7 w-full h-[3.25rem] md:h-[3.5rem] bg-[var(--color-brand)] text-black font-semibold text-sm md:text-base tracking-[0.05em] uppercase rounded-lg hover:bg-[var(--color-brand-light)] transition-colors disabled:opacity-60 shadow-[0_10px_28px_rgba(87,230,203,0.24)]"
              >
                {loading
                  ? uiText.creatingAccount
                  : t.auth.registerBtn}
              </motion.button>

              <p className="text-white/50 text-sm md:text-base text-center mt-6">
                {t.auth.hasAccount}{' '}
                <button type="button" onClick={() => setTab('login')} className="text-[var(--color-brand)] hover:underline">
                  {t.auth.loginLink}
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-white/25 text-sm md:text-base text-center mt-8">
          {t.auth.demoHint}
        </p>
      </motion.div>
    </motion.div>
  )
}
