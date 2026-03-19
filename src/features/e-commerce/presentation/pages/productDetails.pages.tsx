'use client'
import ProductDetailsCard from "../components/productDetailsCard.components";
import ProductDetailsCardSkeleton from "../components/productDetailsCardSkeleton.components";
import { useProductDetails } from "../hooks/productDetails.hooks";

export default function ProductDetails(){
    const { product, loading } = useProductDetails()
    
    if (loading) {
        return <ProductDetailsCardSkeleton />
    }
    
    if (!product) {
        return <div>Error: Product data is unavailable.</div>
    }

    return <ProductDetailsCard product={product}/>
}