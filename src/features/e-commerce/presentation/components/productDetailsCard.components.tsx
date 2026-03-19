'use client';

import { DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Product } from "../../domain/entities/product.entities";
import { useCartContext } from '../hooks/cart.hooks';

type ProductPar = {
    product: Product
}

export default function ProductDetailsCard({ product }: ProductPar) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { addToCart } = useCartContext()

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % product.images.length
        );
    };

    const goToPrevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex - 1 + product.images.length) % product.images.length
        );
    };

    const showNavigation = product.images.length > 1;

    return (
        <div className="flex flex-row w-full h-screen m-5 mb-20 font-mono gap-5">
            
            <div className="relative w-full h-[60vh] flex items-center justify-center">
                
                <Image 
                    className="object-contain p-4 hover:opacity-75 transition-opacity border rounded-lg size-full" 
                    src={product.images[currentImageIndex]} 
                    alt={`${product.name} - Image ${currentImageIndex + 1}`} 
                    fill={true} 
                    loading='eager'
                />

                {showNavigation && (
                    <>
                        <button 
                            onClick={goToPrevImage}
                            title="Previous Image"
                            className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors z-10"
                        >
                            <ChevronLeft className="size-6 text-gray-800" />
                        </button>

                        <button 
                            onClick={goToNextImage}
                            title="Next Image"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white transition-colors z-10"
                        >
                            <ChevronRight className="size-6 text-gray-800" />
                        </button>
                    </>
                )}

                <div className="absolute bottom-4 flex space-x-2 z-10">
                    {product.images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-2 w-2 rounded-full transition-all ${
                                index === currentImageIndex 
                                    ? 'bg-gray-900 w-4' 
                                    : 'bg-gray-300 hover:bg-gray-500'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-full p-5 gap-3 h-full">
                <div className="flex flex-col gap-2"> {/* Reduced gap */}
                    <span className="text-4xl text-gray-900">{product.name}</span>
                    <span className="text-xs text-gray-900 rounded-xl w-fit px-2 py-1 border border-gray-500 bg-gray-100">
                        {product.category.slice(0,1).toUpperCase().concat(product.category.slice(1))}
                    </span>
                </div>
                
                <div>
                    {product.stock > 10 &&
                        <div className="flex flex-row items-center space-x-2">
                            <div className="size-3 bg-green-400 rounded-3xl" />
                            <span className="text-md text-gray-900">In Stock</span>
                        </div>
                    }
                    {product.stock <= 10 && product.stock > 0 && 
                        <div className="flex flex-row items-center space-x-2">
                            <div className="size-3 bg-amber-400 rounded-3xl" />
                            <span className="text-md text-gray-900">Low on Stock</span>
                        </div>
                    }
                    {product.stock === 0 && 
                        <div className="flex flex-row items-center space-x-2">
                            <div className="size-3 bg-red-400 rounded-3xl" />
                            <span className="text-md text-gray-900">Out of Stock</span>
                        </div>
                    }
                </div>

                <div className="flex flex-row space-x-2 text-2xl items-center text-gray-900">
                        <DollarSign className='size-5'/> 
                        {product.price.toFixed(2)}
                </div>

                <div className="flex flex-col gap-4 mt-4 border-t pt-4">
                    <h3 className="text-lg font-bold text-gray-700">Description</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{product.description}</p>
                    
                    <h3 className="text-lg font-bold text-gray-700">Brand</h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>

                    <h3 className="text-lg font-bold text-gray-700">Rating</h3>
                    <p className="text-sm text-gray-600">{product.rating} / 5</p>
                </div>
                
                <div className="mx-10 mt-5">
                    <button 
                        onClick={() => product.stock > 0 && addToCart(product)}
                        title='Add to Cart' 
                        disabled={product.stock === 0}
                        className={`w-full px-2 py-2 border border-gray-300 rounded-xl text-sm font-semibold transition-colors ${
                            product.stock > 0 
                                ? 'bg-white hover:bg-red-500 hover:text-white' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    )
}