import { Cart, CartItem } from '../../domain/entities/cart.entities'
import { CartDTO, CartItemDTO } from './cart.model'

export class CartMapper {
    static fromJSON(dto: CartDTO): Cart {
        return {
            id: dto.id,
            items: dto.products.map(CartMapper.itemFromJSON),
            total: dto.total,
            discountedTotal: dto.discountedTotal,
            totalProducts: dto.totalProducts,
            totalQuantity: dto.totalQuantity,
        }
    }

    static itemFromJSON(dto: CartItemDTO): CartItem {
        return {
            productId: dto.id.toString(),
            name: dto.title,
            price: dto.price,
            thumbnail: dto.thumbnail,
            quantity: dto.quantity,
            discountPercentage: dto.discountPercentage,
        }
    }
}
