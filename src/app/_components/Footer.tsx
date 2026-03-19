import Link from "next/link"
import localFont from 'next/font/local'

const headerFont = localFont({
    src: [{
        path: '../../assets/fonts/nuku1.ttf',
        weight: '400',
        style: 'semibold',
    }]
})

export default function Footer(){
    return(
        <div className="grid bg-black max-h-fit">
            <div className="flex flex-1 p-10 items-start max-h-fit">
                <Link href='/' className={`text-4xl text-white ml-5 tracking-widest ${headerFont.className}`}>Karimasu</Link>
                <div className='flex flex-col ml-auto space-x-10 text-base text-white font-semibold font-mono'>
                    <span className="mb-5 text-xl">Quick Links</span>
                    <Link href='/' className="hover:text-red-500">Home</Link>
                    <Link href='/products' className="hover:text-red-500">Products</Link>
                    <Link href='/cart' className="hover:text-red-500">Cart</Link>
                    <Link href='/profile' className="hover:text-red-500">Profile</Link>
                </div>
            </div>
            <div className="flex justify-center mb-5 max-h-fit">
                <span className="font-mono text-white">Created by Nathan Githinji Rugo</span>
            </div>
        </div>
    )
}