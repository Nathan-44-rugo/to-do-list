'use client'

import type { Item as ToDo } from "@/features/to-do-list/domain/entities/Item";
import { useState, useRef, useEffect } from 'react'

interface ItemProps {
    item: ToDo;
    onToggle: (item: ToDo) => void;
    onEdit: (id: number, newText: string) => void;
}

export default function Item({ item, onToggle, onEdit}: ItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempText, setTempText] = useState(item.toDo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        onEdit(item.id, tempText);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            setTempText(item.toDo);
            setIsEditing(false);
        }
    };

    return (
        <li className="flex items-center gap-4 p-3 w-full bg-white text-black">
            <input
                type="checkbox"
                id={`check - ${item.id.toString()}`}
                name={`check - ${item.id.toString()}`}
                title=''
                checked={item.done}
                onChange={() => onToggle(item)}
                className="w-5 h-5 cursor-pointer"
            />
            {isEditing ? (
                <input
                    name={item.id.toString()}
                    ref={inputRef}
                    type="text"
                    value={tempText}
                    onChange={(e) => setTempText(e.target.value)}
                    placeholder=''
                    title=''
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="flex-1 outline-none font-mono"
                />
            ) : (
                <span
                    onDoubleClick={() => setIsEditing(true)}
                    className={`font-mono flex-1 cursor-text select-none ${
                        item.done ? "text-gray-400 line-through" : ""
                    }`}
                >
                    {item.toDo}
                </span>
            )}
        </li>
    );
}

