'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2, DollarSign } from 'lucide-react'
import { CartItem } from '../../domain/entities/cart.entities'
import { useCartContext } from '../hooks/cart.hooks'

export default function CartItemCard({ item }: { item: CartItem }) {
    const { updateQuantity, removeFromCart } = useCartContext()

    return (
        <div className="flex flex-row items-center gap-4 p-4 border border-gray-200 rounded-lg font-mono">
            <div className="relative w-20 h-20 shrink-0 bg-gray-100 overflow-hidden rounded-md">
                <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    sizes="80px"
                    style={{ objectFit: 'contain' }}
                    className="p-1"
                />
            </div>

            <div className="flex flex-col flex-1 gap-1 min-w-0">
                <span className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</span>
                <div className="flex items-center text-xs text-gray-500">
                    <DollarSign className="size-3" />
                    <span>{item.price.toFixed(2)} each</span>
                </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    title="Decrease quantity"
                    className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                    <Minus className="size-3" />
                </button>
                <span className="text-sm w-6 text-center font-semibold">{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    title="Increase quantity"
                    className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                    <Plus className="size-3" />
                </button>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center text-sm font-semibold text-gray-900">
                    <DollarSign className="size-3" />
                    <span>{(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button
                    onClick={() => removeFromCart(item.productId)}
                    title="Remove item"
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                    <Trash2 className="size-4" />
                </button>
            </div>
        </div>
    )
}
