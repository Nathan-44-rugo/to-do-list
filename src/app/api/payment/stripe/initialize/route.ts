'use server'

import Stripe from 'stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const secretKey = process.env.STRIPE_TEST_SECRET
    const stripe = new Stripe(secretKey!)
    try {
        console.log('Payment API Request Received')
    
        const { email, amount } = await request.json()

        if (!email || !amount) {
            return NextResponse.json({ error: 'Email and amount are required' }, { status: 400 })
        }

        const origin = request.headers.get('origin') || 'http://localhost:3000'

        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            payment_method_types: ['card', 'paypal'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Karimasu Store Checkout',
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${origin}/verify-payment?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cart`,
        });

        if (session.url) {
            return NextResponse.json({ 
                status: true, 
                data: { authorization_url: session.url } 
            })
        }

        throw new Error('Failed to create Stripe session')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Stripe Server Error:', error.message)
        return NextResponse.json(
            { status: false, error: error.message || 'Internal Server Error' }, 
            { status: 500 }
        )
    }
}
