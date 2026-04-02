'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartContext } from '@/features/e-commerce/presentation/hooks/cart.hooks'
import { getCookie } from '@/features/auth/lib/session.lib'
import { getCurrentUser } from '@/features/auth/di/modules'

export function useStripePayment(){
    const { totalPrice } = useCartContext()
    const { push } = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getUserDetails = async () => {
        const authToken = await getCookie()
        if (!authToken) return null
        try {
            const res = await getCurrentUser.execute(authToken)
            if (res) return { email: res.email, name: res.firstName }
            throw new Error('Invalid token')
        } catch (err) {
            console.error(err)
            return null
        }
    }

    const initiate = async () => {
        setLoading(true)
        setError(null)
        try {
            const user = await getUserDetails()
            if (!user) {
                setError('Please log in to proceed with payment.')
                return
            }

            const amount = Math.floor(totalPrice * 100) 

            const res = await fetch('/api/payment/stripe/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    amount: amount,
                    email: user.email 
                }),
            })

            const result = await res.json()

            if (res.ok && result.status) {
                localStorage.setItem('email', user.email)
                localStorage.setItem('amount', amount.toString())
                
                push(result.data.authorization_url)
            } else {
                setError(result.error || 'Could not initialize payment. Please try again.')
            }
        } catch (err) {
            console.error('Stripe Client Error:', err)
            setError('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return { initiate, loading, error }   
}