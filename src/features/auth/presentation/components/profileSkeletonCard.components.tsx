export default function ProfileCardSkeleton(){
    return(
        <div className="flex justify-center items-start min-h-screen w-full p-4 bg-gray-50 font-sans">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl mt-10 overflow-hidden border border-gray-200 animate-pulse">
                <div className="p-6 border-b border-gray-100 text-center bg-gray-50">
                    <div className="mx-auto mb-3 w-32 h-32 rounded-full bg-gray-300 shadow-md ring-2 ring-gray-400" />
                    
                    <div className="h-8 bg-gray-300 w-3/5 mx-auto rounded mb-1"/>
                    <div className="h-4 bg-gray-200 w-2/5 mx-auto rounded"/>
                </div>
                <div className="p-6 flex flex-col gap-3">
                    <div className="h-4 bg-gray-200 w-1/3 rounded mb-2"/>
                    <div className="h-10 bg-gray-100 rounded-lg"/>
                    <div className="h-10 bg-gray-100 rounded-lg"/>
                    <div className="h-10 bg-gray-100 rounded-lg"/>
                    <div className="h-10 bg-gray-100 rounded-lg"/>
                </div>
                <div className="p-6 pt-0">
                    <div className='w-full h-10 bg-gray-300 rounded-lg'/> {/* Button Placeholder */}
                </div>
            </div>
        </div>
    )
}