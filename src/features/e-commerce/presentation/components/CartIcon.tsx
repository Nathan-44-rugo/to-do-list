'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCartContext } from '@/features/e-commerce/presentation/hooks/cart.hooks'

export default function CartIcon() {
    const { totalItems } = useCartContext()

    return (
        <Link href="/cart" title="Cart" className="relative">
            <ShoppingCart className="stroke-2 stroke-red-900 hover:stroke-red-500" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center leading-none">
                    {totalItems > 99 ? '99+' : totalItems}
                </span>
            )}
        </Link>
    )
}