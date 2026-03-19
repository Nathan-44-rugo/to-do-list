export default function ProductDetailsCardSkeleton(){
    return(
        <div className="w-full h-screen m-5 animate-pulse flex flex-row gap-5">
            <div className="relative w-full h-[60vh] bg-gray-300 rounded-lg"> 
            </div>
            
            <div className="flex flex-col w-full p-5 gap-3 h-full">
                <div className="space-y-4">
                    <div className="h-10 bg-gray-300 w-3/4 rounded"/>
                    <div className="h-4 bg-gray-200 w-1/4 rounded"/>
                </div>
                <div className="h-5 bg-gray-300 w-1/3 rounded"/>
                
                <div className="h-8 bg-gray-300 w-1/6 rounded mt-4"/>
                
                <div className="h-10 bg-gray-300 rounded-xl mt-10"/>
            </div>
        </div>
    )
}