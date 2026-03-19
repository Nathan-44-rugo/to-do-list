import { Cart } from '../../domain/entities/cart.entities'
import { ErrorMessage } from '../../domain/entities/error.entities'
import { BadRequestError, NotFoundError, ReceivedError } from '../models/error.model'
import { CartMapper } from '../models/cart.mapper'
import { CartDTO } from '../models/cart.model'

export class CartDataSource {
    private baseUrl = process.env.NEXT_PUBLIC_PRODUCT_LISTING_API

    async fetchCart(cartId: number): Promise<Cart | ErrorMessage> {
        try {
            const res = await fetch(`${this.baseUrl}carts/${cartId}`)
            if (!res.ok) {
                if (res.status === 404) throw new NotFoundError()
                else if (res.status === 400) throw new BadRequestError()
                throw new ReceivedError('HTTP error')
            }
            const data: CartDTO = await res.json()
            return CartMapper.fromJSON(data)
        } catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError) {
                return { name: e.name, message: e.message, status: e.status }
            }
            return { name: 'Unknown Error', message: 'HTTP request error' }
        }
    }

    async createCart(
        userId: number,
        products: Array<{ id: number; quantity: number }>
    ): Promise<Cart | ErrorMessage> {
        try {
            const res = await fetch(`${this.baseUrl}carts/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, products }),
            })
            if (!res.ok) {
                if (res.status === 404) throw new NotFoundError()
                else if (res.status === 400) throw new BadRequestError()
                throw new ReceivedError('HTTP error')
            }
            const data: CartDTO = await res.json()
            return CartMapper.fromJSON(data)
        } catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError) {
                return { name: e.name, message: e.message, status: e.status }
            }
            return { name: 'Unknown Error', message: 'HTTP request error' }
        }
    }

    async modifyCart(
        cartId: number,
        products: Array<{ id: number; quantity: number }>
    ): Promise<Cart | ErrorMessage> {
        try {
            const res = await fetch(`${this.baseUrl}carts/${cartId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ merge: true, products }),
            })
            if (!res.ok) {
                if (res.status === 404) throw new NotFoundError()
                else if (res.status === 400) throw new BadRequestError()
                throw new ReceivedError('HTTP error')
            }
            const data: CartDTO = await res.json()
            return CartMapper.fromJSON(data)
        } catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError) {
                return { name: e.name, message: e.message, status: e.status }
            }
            return { name: 'Unknown Error', message: 'HTTP request error' }
        }
    }

    async removeCart(cartId: number): Promise<Cart | ErrorMessage> {
        try {
            const res = await fetch(`${this.baseUrl}carts/${cartId}`, {
                method: 'DELETE',
            })
            if (!res.ok) {
                if (res.status === 404) throw new NotFoundError()
                else if (res.status === 400) throw new BadRequestError()
                throw new ReceivedError('HTTP error')
            }
            const data: CartDTO = await res.json()
            return CartMapper.fromJSON(data)
        } catch (e) {
            if (e instanceof NotFoundError || e instanceof BadRequestError) {
                return { name: e.name, message: e.message, status: e.status }
            }
            return { name: 'Unknown Error', message: 'HTTP request error' }
        }
    }
}
