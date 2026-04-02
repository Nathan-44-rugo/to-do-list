import { LoaderIcon, CheckCircle, XCircle } from "lucide-react"
import { VerifyStatus } from "../hooks/verification.hooks"

type Props = {
    reference: string
    status: VerifyStatus
    errorMessage: string | null
    isMpesa?: boolean
}

export default function VerificationModal({ reference, status, errorMessage, isMpesa }: Props) {
    if (status === 'success') {
        return (
            <div className='flex flex-col p-12 gap-3 items-center border border-green-200 rounded-2xl bg-green-50 shadow-sm'>
                <CheckCircle className='size-12 text-green-500' />
                <div className="text-lg font-semibold text-gray-900">Payment Verified!</div>
                <p className="text-sm text-gray-500 text-center">Your payment was successful. Redirecting...</p>
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div className='flex flex-col p-12 gap-3 items-center border border-red-200 rounded-2xl bg-red-50 shadow-sm'>
                <XCircle className='size-12 text-red-500' />
                <div className="text-lg font-semibold text-gray-900">Verification Failed</div>
                <p className="text-sm text-gray-600 text-center">{errorMessage}</p>
                <button onClick={() => window.location.href='/cart'} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Return to Cart</button>
            </div>
        )
    }

    return (
        <div className='flex flex-col p-12 gap-5 items-center border border-gray-300 rounded-2xl bg-white shadow-sm'>
            <LoaderIcon className='size-10 text-green-500 animate-spin' />
            <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">Waiting for Payment</div>
                <p className="text-sm text-gray-500 mt-2">
                    {isMpesa 
                        ? "Please check your phone and enter your M-Pesa PIN." 
                        : "Almost there! We're verifying your details."}
                </p>
            </div>
            <div className="text-[10px] text-gray-400 font-mono bg-gray-50 p-2 rounded">
                Ref: {reference}
            </div>
        </div>
    )
}