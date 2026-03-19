import { ChangeEvent } from "react";
import { useCategoryHook } from "../hooks/filter.hooks";
import FilterSkeletonCard from "./filterSkeleton.components";

interface FilterCardProps {
    onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClearFilter: () => void;
    selectedCategories: Array<string>
}

export default function FilterCard({ onFilterChange, onClearFilter, selectedCategories }: FilterCardProps) {
    const { categories, error, loading, limit, expandCategories } = useCategoryHook()
    

    return (
        <>
            {loading ? (
                <FilterSkeletonCard />
            ) : error ? (
                <div className="w-100 border border-gray-400 p-5 h-full text-gray-900 font-mono">
                    <div className="text-xl font-semibold mb-2">Filter</div>
                    <div className="text-base font-semibold mb-5">Categories</div>
                    <div className="w-full"></div>
                    <div className="text-sm text-gray-600">{error}</div>
                </div>
            ) : categories ? (
                <div className="w-100 border border-gray-400 p-5 h-full text-gray-900 font-mono">
                    <div className="text-xl font-semibold mb-2">Filter</div>
                    <div className="text-base font-semibold mb-5">Categories</div>
                    <div className="w-full"></div>
                    <div className="flex flex-col space-y-5 items-start">
                        <div className="h-40 overflow-auto">
                            {categories.slice(0, limit).map((item, i) => (
                                <div key={i} className="flex flex-row items-center">
                                    <input 
                                        title={item} 
                                        onChange={onFilterChange} 
                                        type='checkbox' 
                                        className="text-sm text-gray-600 border border-gray-600 rounded-xs" 
                                        id={`${item}${i}`}
                                        value={item}
                                        checked={selectedCategories.includes(item)}
                                    />
                                    <label htmlFor={`${item}${i}`} className="ml-2 xl:mr-10">{item.slice(0,1).toUpperCase().concat(item.slice(1))}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex w-full">
                            <button className="font-mono font-semibold text-sm text-white p-2 bg-red-900 rounded-lg hover:bg-red-400 transition-colors" onClick={expandCategories}>
                                {limit > 6 ? "Show Less" : "Show More"}
                            </button>
                            <button className="ml-auto font-mono font-semibold text-gray-900 hover:text-red-400 transition-colors" onClick={onClearFilter}>
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <FilterSkeletonCard />
            )}
        </>
    );
}