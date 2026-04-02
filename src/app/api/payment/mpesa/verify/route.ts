import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic' 

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const requestId = searchParams.get('requestId')
    if (!requestId) return NextResponse.json({ error: 'Missing requestId' }, { status: 400 })

    const baseUrl = process.env.MPESA_BASE_URL!
    const shortCode = process.env.MPESA_SHORTCODE!
    const passkey = process.env.MPESA_PASSKEY!

    try {
        const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64')
        
        const tokenRes = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: { Authorization: `Basic ${auth}` },
            cache: 'no-store' 
        })
        const tokenData = await tokenRes.json()

        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
        const password = Buffer.from(shortCode + passkey + timestamp).toString('base64')

        const queryRes = await fetch(`${baseUrl}/mpesa/stkpushquery/v1/query`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${tokenData.access_token}`, 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                BusinessShortCode: shortCode, Password: password, Timestamp: timestamp, CheckoutRequestID: requestId
            }),
            cache: 'no-store'
        })

        const mpesaData = await queryRes.json()

        const isPaid = mpesaData.ResultCode === "0" || mpesaData.ResultCode === 0;
        const isDefinitiveFailure = 
            mpesaData.ResultCode !== undefined && 
            mpesaData.ResultCode !== null &&
            mpesaData.ResultCode.toString() !== "0" && 
            mpesaData.ResultCode.toString() !== "103";

        const isPending = !isPaid && !isDefinitiveFailure;
        
        return NextResponse.json(
            {
                isPaid,
                isPending,
                gatewayStatus: isPaid ? "Success" : (isDefinitiveFailure ? mpesaData.ResultDesc : "Waiting for PIN")
            },
            {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }
        )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ isPaid: false, isPending: true }, { headers: { 'Cache-Control': 'no-store' }})
    }
}