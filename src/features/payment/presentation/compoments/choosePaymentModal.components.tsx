'use client'
import { useState } from 'react'
import Image from 'next/image'
import MethodCard from './methodCard.components'
import { usePaystackPayment } from '@/features/payment/presentation/hooks/paystack.hooks'
import { useStripePayment } from '@/features/payment/presentation/hooks/stripe.hooks'
import { useMpesaPayment } from '@/features/payment/presentation/hooks/mpesa.hooks'

import paystack from '@/assets/images/paystackLogo.svg'
import stripe from '@/assets/images/stripeLogo.svg'
import mpesa from '@/assets/images/mpesaLogo.svg'

const PaystackLogo = () => <Image src={paystack} alt={'PayStackLogo'} width={150} height={150}/>
const StripeLogo = () => <Image src={stripe} alt={'StripeLogo'} width={150} height={150}/>
const MpesaLogo = () => <Image src={mpesa} alt={"Mpesa Daraja"} width={150} height={150}/>

export default function ChoosePaymentModal() {
    const [phone, setPhone] = useState('')
    const [showMpesaInput, setShowMpesaInput] = useState(false)

    const { initiate: payStackPayment, loading: payStackLoading, error: payStackError } = usePaystackPayment()
    const { initiate: stripePayment, loading: stripeLoading, error: stripeError } = useStripePayment()
    const { initiate: mpesaPayment, loading: mpesaLoading, error: mpesaError } = useMpesaPayment()

    return (
        <div className="flex flex-col gap-8 items-center font-mono p-10 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-1 text-center">
                <h2 className="text-xl font-bold text-gray-900">Choose Payment Method</h2>
                <p className="text-sm text-gray-500">Select how you&apos;d like to complete your order</p>
            </div>

            {!showMpesaInput ? (
                <div className="flex flex-row flex-wrap gap-5 justify-center">
                    <MethodCard
                        Logo={PaystackLogo}
                        name="Paystack"
                        description="Card, bank transfer, USSD & mobile money"
                        available={true}
                        loading={payStackLoading}
                        onClick={() => payStackPayment()} 
                    />
                    <MethodCard
                        Logo={StripeLogo}
                        name="Stripe"
                        description="International cards & digital wallets"
                        available={true}
                        loading={stripeLoading}
                        onClick={() => stripePayment()}
                    />
                    <MethodCard
                        Logo={MpesaLogo}
                        name="M-Pesa Daraja"
                        description="Safaricom M-Pesa mobile money"
                        available={true}
                        loading={mpesaLoading}
                        onClick={() => setShowMpesaInput(true)}
                    />
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 w-full bg-gray-50 p-6 rounded-xl border border-dashed border-green-500">
                    <MpesaLogo />
                    <div className="w-full max-w-xs">
                        <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Enter Safaricom Number</label>
                        <input 
                            type="tel" 
                            placeholder="e.g. 0712345678" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowMpesaInput(false)}
                            className="px-6 py-2 text-sm text-gray-500 hover:underline"
                        >
                            Back
                        </button>
                        <button 
                            onClick={() => mpesaPayment(phone)}
                            disabled={mpesaLoading || phone.length < 10}
                            className={`px-8 py-2 rounded-full font-bold text-white transition-all ${
                                mpesaLoading || phone.length < 10 ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            {mpesaLoading ? 'Requesting...' : 'Pay with M-Pesa'}
                        </button>
                    </div>
                </div>
            )}

            <div className="text-center">
                {(payStackError || stripeError || mpesaError) && (
                    <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-2 rounded">
                        {payStackError || stripeError || mpesaError}
                    </p>
                )}
            </div>
        </div>
    )
}