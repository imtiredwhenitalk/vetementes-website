import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { LangProvider } from './context/LangContext'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Collections from './components/Collections'
import Products from './components/Products'
import About from './components/About'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import ProductModal from './components/ProductModal'
import Checkout from './components/Checkout'
import AuthModal from './components/AuthModal'
import AccountModal from './components/AccountModal'
import SmartSearch from './components/SmartSearch'
import api from './services/api'
import type { Product } from './data/products'
import type { AuthUser } from './components/AuthModal'

export type Page = 'home' | 'checkout'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [page, setPage] = useState<Page>('home')
  const [direction, setDirection] = useState<1 | -1>(1)
  const [showAuth, setShowAuth] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      return JSON.parse(localStorage.getItem('vt_current_user') || 'null')
    } catch {
      return null
    }
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  const handleAuth = useCallback((user: AuthUser) => {
    setCurrentUser(user)
    localStorage.setItem('vt_current_user', JSON.stringify(user))
  }, [])

  const handleLogout = useCallback(() => {
    setCurrentUser(null)
    localStorage.removeItem('vt_current_user')
    api.setToken(null)
  }, [])

  const goToCheckout = useCallback(() => {
    setSelectedProduct(null)
    setDirection(1)
    setPage('checkout')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goHome = useCallback(() => {
    setDirection(-1)
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const pageVariants = {
    initial: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? 48 : -48 }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? -48 : 48 }),
  }

  return (
    <LangProvider>
      <CartProvider onItemAdded={goToCheckout}>
        <div className="noise aurora-bg w-full min-h-screen relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[var(--color-brand)]/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-[28%] -right-28 h-96 w-96 rounded-full bg-[var(--color-accent)]/16 blur-[130px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--color-brand-light)]/10 blur-[120px]" />

          <CustomCursor />
          
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!loading && page === 'home' && (
              <motion.div
                key="home"
                className="w-full"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Navbar
                  onCartClick={goToCheckout}
                  onAuthClick={() => setShowAuth(true)}
                  onAccountClick={() => setShowAccount(true)}
                  onSearchClick={() => setShowSearch(true)}
                  currentUser={currentUser}
                />
                <Hero />
                <Marquee />
                <Collections />
                <Products onProductClick={setSelectedProduct} />
                <About />
                <Newsletter />
                <Footer />
                <CartSidebar onCheckout={goToCheckout} />
                
                <AnimatePresence>
                  {selectedProduct && (
                    <ProductModal
                      product={selectedProduct}
                      onClose={() => setSelectedProduct(null)}
                      onCheckout={goToCheckout}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {!loading && page === 'checkout' && (
              <motion.div
                key="checkout"
                className="w-full"
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Navbar
                  onCartClick={goToCheckout}
                  onAuthClick={() => setShowAuth(true)}
                  onAccountClick={() => setShowAccount(true)}
                  onSearchClick={() => setShowSearch(true)}
                  currentUser={currentUser}
                />
                <Checkout onBack={goHome} userId={currentUser?.id} />
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auth modal */}
          <AnimatePresence>
            {showAuth && (
              <AuthModal
                key="auth"
                onClose={() => setShowAuth(false)}
                onAuth={handleAuth}
              />
            )}
          </AnimatePresence>

          {/* Account modal */}
          <AnimatePresence>
            {showAccount && currentUser && (
              <AccountModal
                key="account"
                user={currentUser}
                onClose={() => setShowAccount(false)}
                onLogout={handleLogout}
              />
            )}
          </AnimatePresence>

          {/* Smart search */}
          <AnimatePresence>
            {showSearch && (
              <SmartSearch
                key="smart-search"
                onClose={() => setShowSearch(false)}
                onSelect={p => { setSelectedProduct(p); setShowSearch(false) }}
              />
            )}
          </AnimatePresence>
        </div>
      </CartProvider>
    </LangProvider>
  )
}
