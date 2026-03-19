import { Product } from "../../domain/entities/product.entities";
import { ProductDTO } from "./product.model";

export class Mapper{
    static fromJSON(json: ProductDTO): Product{
        return{
                id: json.id.toString(),
                name: json.title,
                price: json.price,
                images: json.images,
                description: json.description,
                category: json.category,
                brand: json.brand,
                rating: json.rating,
                stock: json.stock,
                status: json.availabilityStatus
        }
    }

    static toJSON(product: Product): string{
        const item = {
                id: Number(product.id),
                title: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                rating: product.rating,
                stock: product.stock,
                brand: product.brand,
                images: product.images,
                availabilityStatus: product.status,
        }
        return JSON.stringify(item)
    }
}