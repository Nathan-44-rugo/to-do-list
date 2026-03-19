import { Product } from "@/features/e-commerce/domain/entities/product.entities";
import { ErrorMessage } from "@/features/e-commerce/domain/entities/error.entities";
import { ProductRepository } from "@/features/e-commerce/domain/repositories/product.repositories";
import { RemoteSource } from "../datasource/remote.datasource";

export class ProductRepositoryImpl implements ProductRepository{
    constructor(private dataSource: RemoteSource){}

    async addProduct(product: Product): Promise<void> {
        this.dataSource.storeProduct(product)
    }

    async getProduct(id: string): Promise<Product | ErrorMessage> {
        return this.dataSource.fetchProduct(id)
    }

    async getAllProducts(): Promise<Product[] | ErrorMessage> {
        return this.dataSource.fetchAllProducts()
    }

    async searchProducts(search: string): Promise<Product[] | ErrorMessage> {
        return this.dataSource.searchProducts(search)
    }

    async getCategoryList(): Promise<Array<string> | ErrorMessage> {
        return this.dataSource.fetchCatergories()
    }

    async getProductsByCategories(categories: Array<string>): Promise<Product[] | ErrorMessage> {
        return this.dataSource.fetchProductsByCategory(categories)
    }
}