import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET!)

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const session_id = searchParams.get('session_id')

    if (!session_id) {
        return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id)
        
        return NextResponse.json({
            isPaid: session.payment_status === 'paid',
            email: session.customer_details?.email || session.customer_email,
            amount: session.amount_total,
            gatewayStatus: session.payment_status
        })
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Stripe Verification Error:', error)
        return NextResponse.json({ error: 'Failed to verify session' }, { status: 500 })
    }
}