import { useState, useEffect } from 'react'
import { fetchCatergories } from '../../di/modules'

export function useCategoryHook(){
    const [categories, setCategories] = useState<Array<string>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [limit, setLimit] = useState(6)

    function expandCategories(){
        if (categories){
            if (limit > 6) setLimit(6)
            else setLimit(categories.length)
        }
    }

    useEffect(() => {
        let mounted = true

        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetchCatergories.execute()
                if (mounted && res && Array.isArray(res)){
                    setCategories(res.map((item: string) => item))
                }
                else throw res
        
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.log(error)
                setError(error.message)
            }finally{
                if (mounted) setLoading(false)
            }
        }

        fetchData()
        return () => { mounted = false}
    }, [])

    return { categories, error, loading, limit, expandCategories }
}