import Link from 'next/link'
import localFont from 'next/font/local'
import { House, ShoppingBag, ShoppingCart, User } from 'lucide-react'

const headerFont = localFont({
    src: [{
        path: '../../assets/fonts/nuku1.ttf',
        weight: '400',
        style: 'semibold',
    }]
})
export default function Header(){
    return(
        <div className="flex flex-1 bg-gray-100 p-10 items-center max-h-fit">
            <Link href='/' className={`text-4xl text-red-800 ml-5 tracking-widest ${headerFont.className}`}>Karimasu</Link>
            <div className='flex flex-row ml-auto space-x-5'>
                <Link href='/' title='Home'><House className="stroke-2 stroke-red-900 hover:stroke-red-500"/></Link>
                <Link href='/products' title='Products'><ShoppingBag className="stroke-2 stroke-red-900 hover:stroke-red-500"/></Link>
                <Link href='/cart' title='Products'><ShoppingCart className="stroke-2 stroke-red-900 hover:stroke-red-500"/></Link>
                <Link href='/profile' title="Profile"><User className="stroke-2 stroke-red-900 hover:stroke-red-500"/></Link>
            </div>
        </div>
    )
}
