import { Product } from '@/features/e-commerce/domain/entities/product.entities'
import { ErrorMessage } from '../entities/error.entities'

export interface ProductRepository{
    addProduct(product: Product): Promise<void>
    getProduct(id: string): Promise<Product | ErrorMessage>
    getAllProducts(): Promise<Product[] | ErrorMessage>
    searchProducts(search: string): Promise<Product[] | ErrorMessage>
    getCategoryList(): Promise<Array<string> | ErrorMessage>
    getProductsByCategories(categories: Array<string>): Promise<Product[] | ErrorMessage>
}