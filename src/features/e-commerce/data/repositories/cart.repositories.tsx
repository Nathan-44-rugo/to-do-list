import { Cart } from '../../domain/entities/cart.entities'
import { ErrorMessage } from '../../domain/entities/error.entities'
import { CartRepository } from '../../domain/repositories/cart.repositories'
import { CartDataSource } from '../datasource/cart.datasource'

export class CartRepositoryImpl implements CartRepository {
    constructor(private dataSource: CartDataSource) {}

    async getCart(cartId: number): Promise<Cart | ErrorMessage> {
        return this.dataSource.fetchCart(cartId)
    }

    async addCart(
        userId: number,
        products: Array<{ id: number; quantity: number }>
    ): Promise<Cart | ErrorMessage> {
        return this.dataSource.createCart(userId, products)
    }

    async updateCart(
        cartId: number,
        products: Array<{ id: number; quantity: number }>
    ): Promise<Cart | ErrorMessage> {
        return this.dataSource.modifyCart(cartId, products)
    }

    async deleteCart(cartId: number): Promise<Cart | ErrorMessage> {
        return this.dataSource.removeCart(cartId)
    }
}
