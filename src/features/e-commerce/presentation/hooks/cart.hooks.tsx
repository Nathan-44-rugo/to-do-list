'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product } from '../../domain/entities/product.entities'
import { CartItem } from '../../domain/entities/cart.entities'
import { createCart, modifyCart } from '../../di/cart.modules'

type CartContextType = {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

const cartCookieKey = process.env.NEXT_PUBLIC_CART_COOKIE_KEY ?? 'karimasu-cart'
const cookieMaxAge = 60 * 60 * 24 * 7 // 7 days

function readCartCookie(): CartItem[] {
    const match = document.cookie.match(
        new RegExp('(?:^|; )' + cartCookieKey + '=([^;]*)')
    )
    if (!match) return []
    try {
        return JSON.parse(decodeURIComponent(match[1]))
    } catch {
        return []
    }
}

function writeCartCookie(items: CartItem[]) {
    document.cookie = `${cartCookieKey}=${encodeURIComponent(
        JSON.stringify(items)
    )}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(readCartCookie())
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (!isHydrated) return
        writeCartCookie(items)
    }, [items, isHydrated])

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(item => item.productId === product.id)
            if (existing) {
                return prev.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    thumbnail: product.images[0],
                    quantity: 1,
                    discountPercentage: 0,
                },
            ]
        })
        createCart.execute(1, [{ id: Number(product.id), quantity: 1 }]).catch(console.error)
    }

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.productId !== productId))
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        setItems(prev =>
            prev.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            )
        )
        modifyCart.execute(1, [{ id: Number(productId), quantity }]).catch(console.error)
    }

    const clearCart = () => {
        writeCartCookie([])  // clear cookie immediately
        setItems([])
    }

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCartContext must be used within a CartProvider')
    return context
}
