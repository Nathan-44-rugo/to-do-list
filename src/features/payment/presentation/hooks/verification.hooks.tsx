'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useCartContext } from '@/features/e-commerce/presentation/hooks/cart.hooks'

export type VerifyParams = {
    sessionId?: string
    reference?: string
    mpesaRequestId?: string
}

export type VerifyStatus = 'verifying' | 'success' | 'failed'

export function useVerificationHook({ sessionId, reference, mpesaRequestId }: VerifyParams) {
    const { push } = useRouter()
    const { clearCart } = useCartContext()
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const isFinished = useRef(false)
    
    const pollCount = useRef(0)
    const stopPolling = useRef(false)

    useEffect(() => {
        if (!sessionId && !reference && !mpesaRequestId) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatus('failed')
            setErrorMessage('No payment reference found.')
            return
        }
        const verify = async () => {
            if (isFinished.current) return

            try {
                const email = localStorage.getItem('email') || ''
                const amount = localStorage.getItem('amount') || ''
                
                const cacheBuster = `&t=${Date.now()}`;
                const url = `/api/payment/mpesa/verify?requestId=${mpesaRequestId}&email=${email}&amount=${amount}${cacheBuster}`;

                const res = await fetch(url, { 
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache'
                    }
                })
                
                if (!res.ok) return 

                const data = await res.json()

                if (data.isPaid) {
                    isFinished.current = true
                    setStatus('success')
                    clearCart()
                    localStorage.removeItem('email')
                    localStorage.removeItem('amount')
                    setTimeout(() => push('/'), 5000)
                } 
                else if (data.isPending === false) {
                    isFinished.current = true
                    setStatus('failed')
                    setErrorMessage(data.gatewayStatus || "Payment was not successful.")
                }
            } catch (err) {
                console.error("Poll error:", err)
            }
        }

        const handleFailure = (msg: string) => {
            isFinished.current = true
            setStatus('failed')
            setErrorMessage(msg)
        }

        verify()

        const interval = setInterval(() => {
            pollCount.current += 1
            
            if (pollCount.current >= 40) {
                clearInterval(interval)
                if (!stopPolling.current) {
                    handleFailure("Verification timed out. If you entered your PIN, please contact support.")
                }
                return
            }

            if (!stopPolling.current) {
                verify()
            } else {
                clearInterval(interval)
            }
        }, 4000)

        return () => {
            stopPolling.current = true
            clearInterval(interval)
        }
    }, [sessionId, reference, mpesaRequestId, push, clearCart])

    return { status, errorMessage, isMpesa: !!mpesaRequestId }
}