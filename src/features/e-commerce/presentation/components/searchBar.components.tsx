'use client'
import { Search } from "lucide-react";
import { useProductHook } from "../hooks/productList.hooks";
import { useState } from "react";

export default function SearchBar() {
    const { searchQuery, handleSearch } = useProductHook()
    const [localTerm, setLocalTerm] = useState(searchQuery)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch(localTerm)
    }

    return (
        <form onSubmit={onSubmit} className="flex w-full justify-center mb-15">
            <div className="flex border border-gray-400 rounded-md p-2 w-full max-w-md items-center bg-white">
                <Search className="stroke-gray-400 size-5 ml-2 mr-3" />
                <input
                    className="border-none focus:outline-none h-fit w-full font-mono text-base"
                    placeholder="Search for product"
                    value={localTerm}
                    onChange={(e) => setLocalTerm(e.target.value)}
                />
            </div>
            <button 
                type="submit"
                className="w-fit py-1 px-5 text-center ml-1 rounded-md border border-gray-400 font-mono text-base hover:bg-red-400 hover:text-white transition-colors"
            >
                Search
            </button>
        </form>
    )
}