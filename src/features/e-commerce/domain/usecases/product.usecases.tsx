import { ProductRepository } from "@/features/e-commerce/domain/repositories/product.repositories";
import { Product } from "../entities/product.entities";

export class AddProduct{
    constructor(private readonly repository: ProductRepository){}

    async execute(product: Product){
        return await this.repository.addProduct(product)
    }
}

export class GetProduct{
    constructor(private readonly repository: ProductRepository){}

    async execute(id: string){
        return await this.repository.getProduct(id)
    }
}

export class GetAllProducts{
    constructor(private readonly repository: ProductRepository){}

    async execute(){
        return await this.repository.getAllProducts()
    }
}

export class SearchProducts{
    constructor(private readonly repository: ProductRepository){}

    async execute(search: string){
        return await this.repository.searchProducts(search)
    }
}

export class GetCategoryList{
    constructor(private readonly repository: ProductRepository) {}

    async execute(){
        return await this.repository.getCategoryList()
    }
}

export class GetProductsByCategories{
    constructor(private readonly repository: ProductRepository){}

    async execute(categories: Array<string>){
        return await this.repository.getProductsByCategories(categories)
    }
}