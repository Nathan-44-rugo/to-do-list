import { NextResponse } from 'next/server'

function formatPhoneNumber(phone: string) {
    let formatted = phone.replace(/\D/g, '')
    if (formatted.startsWith('0')) formatted = '254' + formatted.slice(1)
    else if (formatted.length === 9) formatted = '254' + formatted
    return formatted
}

export async function POST(request: Request) {
    try {
        const { amount, phone } = await request.json()

        if (!amount || !phone) {
            return NextResponse.json({ error: 'Amount and phone are required' }, { status: 400 })
        }

        const formattedPhone = formatPhoneNumber(phone)
        const baseUrl = process.env.MPESA_BASE_URL
        const shortCode = process.env.MPESA_SHORTCODE!
        const passkey = process.env.MPESA_PASSKEY!
        const callbackUrl = process.env.MPESA_CALLBACK_URL

        const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64')
        const tokenRes = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: { Authorization: `Basic ${auth}` }, cache: 'no-store'
        })
        const tokenData = await tokenRes.json()
        if (!tokenRes.ok) throw new Error('Failed to get M-Pesa token')

        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
        const password = Buffer.from(shortCode + passkey + timestamp).toString('base64')

        const stkRes = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                BusinessShortCode: shortCode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: Math.floor(1),
                PartyA: formattedPhone,
                PartyB: shortCode,
                PhoneNumber: formattedPhone,
                CallBackURL: callbackUrl,
                AccountReference: "StoreCheckout",
                TransactionDesc: "Payment for cart"
            })
        })

        const mpesaData = await stkRes.json()

        if (!stkRes.ok || mpesaData.errorCode) {
            throw new Error(mpesaData.errorMessage || 'M-Pesa API error')
        }

        return NextResponse.json({
            status: true,
            data: { checkoutRequestId: mpesaData.CheckoutRequestID }
        })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('M-Pesa Initiate Error:', error.message)
        return NextResponse.json({ status: false, error: error.message }, { status: 500 })
    }
}