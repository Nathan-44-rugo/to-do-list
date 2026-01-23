import Link from 'next/link'
export default function Header(){
    return(
        <div className="flex bg-[#fffff0] p-10">
            <Link href='/' className="text-4xl font-bold font-mono text-black">To Do List</Link>
        </div>
    )
}