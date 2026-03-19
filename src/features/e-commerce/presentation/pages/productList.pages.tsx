'use client'
import { Product } from "@/features/e-commerce/domain/entities/product.entities"
import ProductCard from "../components/productCard.components"
import ProductSkeleton from "../components/productCardSkeleton.components"
import { useProductHook } from "../hooks/productList.hooks"
import SearchBar from "../components/searchBar.components"
import FilterCard from "../components/filter.components"
import FilterSkeletonCard from "../components/filterSkeleton.components"
import { useCategoryHook } from "../hooks/filter.hooks"

export default function ProductList(){
    const { selectedCategories, products, message, loading, searchQuery, handleFilter, clearFilter, viewProduct } = useProductHook()
    const {loading: l} = useCategoryHook()
    return(
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchBar />
                <div className="flex flex-col mb-10 justify-center items-center">
                    <div className="text-3xl font-bold text-gray-900 font-mono">
                        {searchQuery ? "Search Results" : "All Products"}
                    </div>
                    <div>
                        {searchQuery && (
                            <p className="text-gray-500 font-mono mt-2">
                                Search results for <span className="text-red-500 font-semibold">&quot;{searchQuery.slice(0,1).toUpperCase().concat(searchQuery.slice(1))}&quot;</span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-row w-full">
                    {
                        l ? (
                            <FilterSkeletonCard />
                        ) : (
                            <FilterCard onFilterChange={handleFilter} onClearFilter={clearFilter} selectedCategories={selectedCategories}/>
                        )
                    }
                    
                    <div className="flex-col w-full ml-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {loading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))
                            ) : products.length > 0 && message == null ? (
                                products.map((product: Product, i: number) => (
                                    <ProductCard key={product.id ?? i} product={product} viewDetails={viewProduct}/>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center font-mono">
                                    <p className="text-xl text-gray-400">{message ? message.message : "No products found"}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}