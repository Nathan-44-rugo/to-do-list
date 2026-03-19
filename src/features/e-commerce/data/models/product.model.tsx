export type ProductDTO = {
    id: number,
    title: string
    description: string
    category: string,
    price: number,
    rating: number,
    stock: number,
    brand: string,
    images: Array<string>,
    availabilityStatus: string,
}