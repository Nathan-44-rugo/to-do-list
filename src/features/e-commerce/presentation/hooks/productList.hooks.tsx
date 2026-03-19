'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Product } from '@/features/e-commerce/domain/entities/product.entities'
import { listAllProducts, searchForProducts, fetchProductsByCategory } from "../../di/modules";
import { ErrorMessage } from '../../domain/entities/error.entities';

export function useProductHook() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState<ErrorMessage | null>(null)
    const [selectedCategories, setSelectedCategories] = useState<Array<string>>([])
    
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace, push } = useRouter()

    const searchQuery = searchParams.get('q') || ''

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('q', term)
        } else {
            params.delete('q')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    function handleFilter(e: ChangeEvent<HTMLInputElement>){
        const category = e.currentTarget.value
        if (searchQuery) {
            replace(pathname);
        }

        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(item => item !== category)
            } else {
                return [...prev, category]
            }
        })
    }

    function clearFilter(){
        setSelectedCategories([])
    }

    function viewProduct(id: string){
        push(`${pathname}/${id}`)
    }

    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            setLoading(true)
            setMessage(null)
            try {
                let res;
                if (selectedCategories.length > 0) {
                    res = await fetchProductsByCategory.execute(selectedCategories)
                } 
                else if (searchQuery) {
                    res = await searchForProducts.execute(searchQuery)
                } 
                else {
                    res = await listAllProducts.execute()
                }

                if (mounted) {
                    if (Array.isArray(res)) {
                        setProducts(res)
                    } else {
                        throw res
                    }
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (mounted) {
                    setMessage({
                        name: error.name || "Error",
                        status: error.status || 500,
                        message: error.message || "An unexpected error occurred"
                    })
                }
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchData()
        return () => { mounted = false }
    }, [searchQuery, selectedCategories])

    return { products, message, loading, searchQuery, selectedCategories, handleSearch, handleFilter, clearFilter, viewProduct} 
}