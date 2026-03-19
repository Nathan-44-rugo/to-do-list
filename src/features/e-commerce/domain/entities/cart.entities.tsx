export type CartItem = {
    productId: string
    name: string
    price: number
    thumbnail: string
    quantity: number
    discountPercentage: number
}

export type Cart = {
    id?: number
    items: CartItem[]
    total: number
    discountedTotal: number
    totalProducts: number
    totalQuantity: number
}
