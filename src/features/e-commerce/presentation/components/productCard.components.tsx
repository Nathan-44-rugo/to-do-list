'use client'
import Image from 'next/image'
import { Product } from "@/features/e-commerce/domain/entities/product.entities";
import { DollarSign } from 'lucide-react';
import { useCartContext } from '../hooks/cart.hooks';

type Params = {
    product: Product
    viewDetails: (id: string) => void
}
export default function ProductCard({product, viewDetails}: Params){
    const { addToCart } = useCartContext()
    return(
        <div className="flex flex-col h-full border border-gray-400 font-mono hover:shadow-xl transition-shadow duration-200">
            <div className='relative w-full h-70 flex bg-gray-100 overflow-hidden'>
                <Image className="z-0 object-contain p-4 hover:opacity-75 transition-opacity" src={product.images[0]} alt={product.name} fill={true} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading='eager'/>
            </div>
            <div className='flex flex-col flex-1 p-5 gap-4'>
                <div className='grid grid-rows-1'>
                    <span onClick={()=>viewDetails(product.id)} className='w-full text-base text-black font-medium line-clamp-2 min-h-12 hover:text-red-500 hover:cursor-pointer'>{product.name}</span>
                    <span className='text-xs text-gray-500 font-light mt-1'>{product.category.slice(0,1).toUpperCase().concat(product.category.slice(1))}</span>
                </div>
                <div className='mt-auto flex flex-col gap-5'>
                    <div className='flex flex-row items-center'>
                        <DollarSign className='size-3'/>
                        <div className='text-base text-black'>{product.price}</div>
                    </div>
                    <div className='flex w-full space-x-3 h-fit'>
                        <button
                            onClick={() => addToCart(product)}
                            title='Add to Cart'
                            className='w-full px-2 py-2 border border-gray-300 rounded-xl text-xs text-gray-900 font-semibold bg-white hover:bg-red-500 hover:text-white transition-colors'
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
