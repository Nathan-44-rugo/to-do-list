'use client'

import Link from 'next/link'
import { ShoppingCart, DollarSign } from 'lucide-react'
import { useCartContext } from '../hooks/cart.hooks'
import CartItemCard from '../components/cartItem.components'

export default function CartPage() {
    const { items, totalItems, totalPrice, clearCart } = useCartContext()

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono gap-4">
                <ShoppingCart className="size-16 stroke-gray-300" strokeWidth={1} />
                <p className="text-xl text-gray-400">Your cart is empty</p>
                <Link
                    href="/products"
                    className="px-6 py-2 bg-red-800 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 font-mono">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <span className="text-sm text-gray-500">
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col gap-3 flex-1">
                    {items.map(item => (
                        <CartItemCard key={item.productId} item={item} />
                    ))}
                    <button
                        onClick={clearCart}
                        className="mt-2 text-sm text-red-500 hover:text-red-700 self-start underline underline-offset-2 transition-colors"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="lg:w-72 shrink-0">
                    <div className="border border-gray-200 rounded-lg p-6 flex flex-col gap-4 sticky top-8">
                        <h2 className="text-base font-semibold text-gray-900">Order Summary</h2>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                            <div className="flex items-center">
                                <DollarSign className="size-3" />
                                <span>{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>

                        <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">
                            <span>Total</span>
                            <div className="flex items-center">
                                <DollarSign className="size-3" />
                                <span>{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            href="/choose-payment"
                            className="w-full py-3 bg-red-800 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors text-center block"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            href="/products"
                            className="text-center text-xs text-gray-500 hover:text-red-500 transition-colors underline underline-offset-2"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
