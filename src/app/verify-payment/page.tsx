import VerificationPage from '@/features/payment/presentation/pages/verification.page'

type PageProps = {
    searchParams: Promise<{
        session_id?: string
        reference?: string
        CheckoutRequestID?: string
    }>
}

export default async function VerifyPaymentRoute({ searchParams }: PageProps) {
    const params = await searchParams

    return (
        <VerificationPage 
            sessionId={params.session_id} 
            reference={params.reference} 
            mpesaRequestId={params.CheckoutRequestID}
        />
    )
}