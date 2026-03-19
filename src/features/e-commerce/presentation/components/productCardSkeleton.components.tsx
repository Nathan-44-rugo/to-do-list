export default function ProductSkeleton() {
    return (
        <div className="flex flex-col h-full border border-gray-200 p-5 animate-pulse bg-white">
            
            {/* Image Placeholder */}
            <div className="relative w-full h-70 bg-gray-200 mb-4"></div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 p-5 gap-4">
                
                {/* Title Line (Longer) */}
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                
                {/* Category Line (Shorter) */}
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                {/* Bottom Section (Price + Button) pushed to bottom */}
                <div className="mt-auto pt-4 flex flex-col gap-3">
                    {/* Price */}
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    
                    {/* Button */}
                    <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
                </div>
            </div>
        </div>
    )
}