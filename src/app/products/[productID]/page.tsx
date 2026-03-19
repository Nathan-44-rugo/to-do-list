import ProductDetails from "@/features/e-commerce/presentation/pages/productDetails.pages"

export default async function Page({
    params,
    }: {
    params: { productID: string }
    }){
    return(
        <ProductDetails />
    )
}