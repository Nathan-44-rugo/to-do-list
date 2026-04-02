/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"

export interface TransactionResponse {
    status: boolean;
    message: string;
    data: TransactionData;
}

export interface TransactionData {
    id: number;
    domain: string;
    status: 'success' | 'failed' | 'ongoing' | 'reversed';
    reference: string;
    receipt_number: string | null;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string; // ISO 8601 Date
    created_at: string; // ISO 8601 Date
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    log: TransactionLog;
    fees: number;
    fees_split: any;
    authorization: TransactionAuthorization;
    customer: TransactionCustomer;
    plan: any;
    split: Record<string, any>;
    order_id: string | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: any;
    source: any;
    fees_breakdown: any;
    connect: any;
    transaction_date: string;
    plan_object: Record<string, any>;
    subaccount: Record<string, any>;
}

export interface TransactionLog {
    start_time: number;
    time_spent: number;
    attempts: number;
    errors: number;
    success: boolean;
    mobile: boolean;
    input: any[];
    history: Array<{
        type: string;
        message: string;
        time: number;
    }>;
}

export interface TransactionAuthorization {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string | null;
    account_name: string | null;
    mobile_money_number?: string;
    receiver_bank_account_number?: string | null;
    receiver_bank?: string | null;
}

export interface TransactionCustomer {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email: string;
    customer_code: string;
    phone: string | null;
    metadata: any;
    risk_action: string;
    international_format_phone: string | null;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const transactionReference = searchParams.get('reference')

    if (!transactionReference) {
        return NextResponse.json({ error: 'Missing reference parameter' }, { status: 400 })
    }

    const baseUrl = process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co'
    const secretKey = process.env.PAYSTACK_TEST_SECRET

    try {
        const res = await fetch(`${baseUrl}/transaction/verify/${transactionReference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${secretKey}`,
                'Content-Type': 'application/json'
            }
        })

        const responseBody: TransactionResponse = await res.json()

        if (!res.ok || !responseBody.status) {
            console.log('Failed response from PayStack:', res.status, responseBody)
            return NextResponse.json(
                { error: 'Failed verify from PayStack', details: responseBody },
                { status: res.status }
            )
        }
        
        const paystackData = responseBody.data;

        return NextResponse.json({
            isPaid: paystackData.status === 'success',
            email: paystackData.customer.email,
            amount: paystackData.amount,
            gatewayStatus: paystackData.status
        })

    } catch (error: any) {
        console.log('Transaction Verification Error: ', error)
        return NextResponse.json({ error: 'Internal Server Issue' }, { status: 500 })
    } finally {
        console.log('PayStack Verification Process Complete')
    }
}