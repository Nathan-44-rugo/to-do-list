export type CartItemDTO = {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    discountPercentage: number
    discountedTotal: number
    thumbnail: string
}

export type CartDTO = {
    id: number
    products: CartItemDTO[]
    total: number
    discountedTotal: number
    userId: number
    totalProducts: number
    totalQuantity: number
}
