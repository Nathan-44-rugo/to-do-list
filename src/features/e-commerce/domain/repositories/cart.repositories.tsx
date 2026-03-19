import { Cart } from '../entities/cart.entities'
import { ErrorMessage } from '../entities/error.entities'

export interface CartRepository {
    getCart(cartId: number): Promise<Cart | ErrorMessage>
    addCart(userId: number, products: Array<{ id: number; quantity: number }>): Promise<Cart | ErrorMessage>
    updateCart(cartId: number, products: Array<{ id: number; quantity: number }>): Promise<Cart | ErrorMessage>
    deleteCart(cartId: number): Promise<Cart | ErrorMessage>
}
