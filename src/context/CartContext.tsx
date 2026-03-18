import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (product: Product, size: string, color: string) => void
  removeItem: (productId: number, size: string, color: string) => void
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  justAdded: boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children, onItemAdded }: { children: ReactNode; onItemAdded?: () => void }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const onItemAddedRef = useRef(onItemAdded)
  onItemAddedRef.current = onItemAdded

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), [])

  const addItem = useCallback((product: Product, size: string, color: string) => {
    setItems(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.size === size && item.color === color
      )
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1, size, color }]
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 600)
    // Navigate to checkout instead of opening sidebar
    if (onItemAddedRef.current) {
      onItemAddedRef.current()
    }
  }, [])

  const removeItem = useCallback((productId: number, size: string, color: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.size === size && item.color === color)
    ))
  }, [])

  const updateQuantity = useCallback((productId: number, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, color)
      return
    }
    setItems(prev => prev.map(item =>
      item.product.id === productId && item.size === size && item.color === color
        ? { ...item, quantity }
        : item
    ))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, isOpen, openCart, closeCart, toggleCart,
      addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice, justAdded
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
