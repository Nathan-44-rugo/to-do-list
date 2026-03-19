export default function FilterSkeletonCard() {
    return (
        <div className="w-100 border border-gray-400 p-5 h-full font-mono animate-pulse">
            <div className="text-xl font-semibold mb-2">Filter</div>
            <div className="text-base font-semibold mb-5">Categories</div>
            <div className="w-full">
                <div className="flex flex-col space-y-5 items-start w-full h-fit">
                    <div className="h-40 w-full space-y-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-row items-center w-full">
                                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full">
                        <div className="h-4 w-24 bg-gray-300 rounded mt-2"></div>
                        <div className="ml-auto h-4 w-24 bg-gray-300 rounded mt-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}