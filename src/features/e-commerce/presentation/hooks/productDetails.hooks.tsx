import { useState, useEffect } from "react";
import { Product } from "../../domain/entities/product.entities";
import { findProduct } from "../../di/modules";
import { useParams } from "next/navigation";

export function useProductDetails(){
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState<boolean>(true)
    const params = useParams<{productID:string}>()

    useEffect(() => {
        let mounted = true

        const fetchProduct = async () => {
            setLoading(true)
            try {
                const res = await findProduct.execute(params.productID)
                if(mounted && 'id' in res && typeof res === 'object'){
                    setProduct(res)
                }
                else{
                    throw res
                }
                
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if ('message' in error) console.log(error.message)
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchProduct()
        return () => {mounted = false}
    }, [params])

    return { product, loading}
}