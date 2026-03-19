import { Product } from "@/features/e-commerce/domain/entities/product.entities"
import { Mapper } from "../models/mapper.model"
import { ProductDTO } from "../models/product.model"
import { ErrorMessage } from "../../domain/entities/error.entities"
import { BadRequestError, NotFoundError, ReceivedError } from "../models/error.model"

export class RemoteSource{
    private baseUrl = process.env.NEXT_PUBLIC_PRODUCT_LISTING_API

    async fetchProduct(id: string): Promise<Product | ErrorMessage>{
        try {
            const res = await fetch(`${this.baseUrl}products/${id}`)
            if (!res.ok){
                if(res.status == 404){
                    throw new NotFoundError()
                }
                else if(res.status == 400){
                    throw new BadRequestError()
                }

                throw new ReceivedError("HTTP error")
            }
            const data: ProductDTO = await res.json()
            const product = Mapper.fromJSON(data)
            return product
        } catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError){
                return {
                    name: e.name,
                    message: e.message,
                    status: e.status
                }
            }

            return {
                name: 'Unknown Error',
                message: 'HTTP request error',
            }
        }
    }

    async fetchAllProducts(): Promise<Product[] | ErrorMessage>{
        try {
            const res = await fetch(`${this.baseUrl}products/`)
            if (!res.ok){
                    if(res.status == 404){
                        throw new NotFoundError()
                    }
                    else if(res.status == 400){
                        throw new BadRequestError()
                    }

                    throw new ReceivedError("HTTP error")
                }
            const data = await res.json()
            const products = data.products.map((item: ProductDTO) => {
                return Mapper.fromJSON(item)
            })
            return products
        }catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError){
                return e as ErrorMessage
            }

            return {
                name: 'Unknown Error',
                message: 'HTTP request error',
            }
        }
    }

    async storeProduct(product: Product): Promise<void>{
        const res = await fetch(`${this.baseUrl}products/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: Mapper.toJSON(product)
        })
        console.log(res.json())
    }

    async searchProducts(search: string): Promise<Product[] | ErrorMessage>{
        try {
            const res = await fetch(`${this.baseUrl}products/search?q=${search}`)
            console.log(res)
            if (!res.ok){
                    if(res.status == 404){
                        throw new NotFoundError()
                    }
                    else if(res.status == 400){
                        throw new BadRequestError()
                    }
    
                    throw new ReceivedError("HTTP error")
            }
            const data = await res.json()
            const products = data.products.map((item: ProductDTO) => {
                return Mapper.fromJSON(item)
            })
    
            return products
        }catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError){
                return e as ErrorMessage
            }

            return {
                name: 'Unknown Error',
                message: 'HTTP request error',
            }
        }
    }

    async fetchCatergories(): Promise<Array<string> | ErrorMessage>{
        try {
            const res = await fetch(`${this.baseUrl}products/category-list`)
            if(!res.ok){
                if (res.status == 404) throw new NotFoundError()
                else if (res.status == 400) throw new BadRequestError()
                else throw new ReceivedError('HTTP error')
            }

            const data: Promise<Array<string>> = res.json()
            return data

        } catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError){
                return e as ErrorMessage
            }

            return {
                name: 'Unknown Error',
                message: 'HTTP request error',
            }
        }
    }

    async fetchProductsByCategory(categories: Array<string>): Promise<Product[] | ErrorMessage>{
        try {
            const res = Promise.all(
                categories.map(async (item) => {
                    const r = await fetch(`${this.baseUrl}products/category/${item}`)
                    if(!r.ok){
                        if (r.status == 404) throw new NotFoundError()
                        else if (r.status == 400) throw new BadRequestError()
                        else throw new ReceivedError('HTTP error')
                    }
                    return r.json()

                })
            )

            return (await res).flatMap(data =>
                data.products.map((item: ProductDTO) => Mapper.fromJSON(item))
            );
    
            
        } catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError){
                return e as ErrorMessage
            }

            return {
                name: 'Unknown Error',
                message: 'HTTP request error',
            }
        }
    }
}