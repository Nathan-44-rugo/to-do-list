import { CartRepository } from '../repositories/cart.repositories'

export class GetCart {
    constructor(private readonly repository: CartRepository) {}

    async execute(cartId: number) {
        return await this.repository.getCart(cartId)
    }
}

export class AddCart {
    constructor(private readonly repository: CartRepository) {}

    async execute(userId: number, products: Array<{ id: number; quantity: number }>) {
        return await this.repository.addCart(userId, products)
    }
}

export class UpdateCart {
    constructor(private readonly repository: CartRepository) {}

    async execute(cartId: number, products: Array<{ id: number; quantity: number }>) {
        return await this.repository.updateCart(cartId, products)
    }
}

export class DeleteCart {
    constructor(private readonly repository: CartRepository) {}

    async execute(cartId: number) {
        return await this.repository.deleteCart(cartId)
    }
}
