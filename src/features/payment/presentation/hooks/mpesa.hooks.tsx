'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartContext } from '@/features/e-commerce/presentation/hooks/cart.hooks'
import { getCookie } from '@/features/auth/lib/session.lib'
import { getCurrentUser } from '@/features/auth/di/modules'

export function useMpesaPayment() {
    const { totalPrice } = useCartContext()
    const { push } = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const initiate = async (phone: string) => {
        if (typeof phone !== 'string' || !phone) {
            setError('A valid phone number is required.')
            return
        }

        setLoading(true)
        setError(null)
        try {
            const authToken = await getCookie()
            if (!authToken) {
                setError('Please log in to proceed.')
                return
            }
            
            const user = await getCurrentUser.execute(authToken)
            if (!user) {
                setError('Invalid session.')
                return
            }

            const amountInKES = Math.floor(totalPrice - totalPrice + 1)

            const res = await fetch('/api/payment/mpesa/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: amountInKES.toString(),
                    email: user.email,
                    phone: phone
                }),
            })

            const result = await res.json()

            if (res.ok && result.status) {
                localStorage.setItem('email', user.email)
                localStorage.setItem('amount', amountInKES.toString())
                setTimeout( () => {
                        push(`/verify-payment?mpesaRequestId=${result.data.checkoutRequestId}`)
                    },
                5000)
            } else {
                setError(result.error || 'Could not initiate M-Pesa prompt.')
            }
        } catch (err) {
            console.error('M-Pesa Client Error:', err)
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return { initiate, loading, error }   
}