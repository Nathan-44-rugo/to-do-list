// app/verify-payment/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import VerificationModal from "../compoments/verificationModal.components"
import { useVerificationHook } from "../hooks/verification.hooks"

export default function VerificationPage() {
    const searchParams = useSearchParams()
    
    const sessionId = searchParams.get('session_id')
    const reference = searchParams.get('reference')
    const mpesaRequestId = searchParams.get('mpesaRequestId')

    const { status, errorMessage } = useVerificationHook({ 
        sessionId: sessionId ?? undefined, 
        reference: reference ?? undefined, 
        mpesaRequestId: mpesaRequestId ?? undefined 
    })
    
    const displayReference = mpesaRequestId || reference || sessionId || '...'

    return (
        <div className="flex flex-col min-h-screen w-full justify-center items-center bg-gray-50">
            <VerificationModal 
                reference={displayReference} 
                status={status} 
                errorMessage={errorMessage} 
                isMpesa={!!mpesaRequestId}
            />
        </div>
    )
}