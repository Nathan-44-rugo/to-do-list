import { NextResponse } from "next/server"

interface PayStackResponse {
    status: boolean,
    message: string,
    data: {
        authorization_url: string,
        access_code: string,
        reference: string
    }
}

export async function POST(request: Request){
    const baseUrl = process.env.PAYSTACK_BASE_URL
    const secretKey = process.env.PAYSTACK_TEST_SECRET
    const origin = request.headers.get('origin') || 'http://localhost:3000'

    try {
        console.log('Payment API Request Received')
        const {email, amount } = await request.json()
        const res = await fetch(`${baseUrl}/transaction/initialize`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                amount: parseInt(amount),
                callback_url: `${origin}/verify-payment`,
                currency: 'KES',
                channels: ['mobile_money', 'card', 'apple_pay']
            })
        })

        const data: PayStackResponse = await res.json()

        if (!res.ok) {
            console.log('Paystack Error Response:', res.status, data)
            return NextResponse.json(
                { error: 'Failed response from Paystack', details: data },
                { status: res.status }
            )
        }

        console.log('Payment Initialization Result', data)
        return NextResponse.json(data)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('Paystack API Error: ', error)
        return NextResponse.json({ error: 'Internal Server Issue' }, { status: 500 })
    } finally {
        console.log('Paystack API Request Processed')
    }
}
