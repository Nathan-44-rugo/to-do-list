'use client'
import { Item as ToDo } from "@/features/to-do-list/domain/entities/Item"
import Item from './Item'

interface ListProps{
    items: ToDo[],
    toggleItem: (item: ToDo) => void,
    toggleEdit: (id: number, newText: string) => void
}

export default function List({items, toggleItem, toggleEdit}: ListProps){
    return(
        <ul className="p-3 flex-col border-[1.5px] border-[#AAAAAA] min-h-auto rounded-xl">
            {items.map((todo, idx) => (
                <Item key={idx} item={todo} onToggle={toggleItem} onEdit={toggleEdit}/>
            ))}
            {items.length === 0 && (
                <li className="p-4 font-mono text-center text-gray-500">No items in list</li>
            )}
        </ul>
    )
}