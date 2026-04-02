import ChoosePaymentModal from '../compoments/choosePaymentModal.components'

export default function ChoosePayment() {
    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <div className="border border-gray-200 rounded-2xl shadow-sm bg-white">
                <ChoosePaymentModal />
            </div>
        </div>
    )
}
