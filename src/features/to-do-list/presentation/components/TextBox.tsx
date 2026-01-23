'use client'
import {ChangeEvent, FormEvent, useState} from 'react';

interface TextBoxProps {
    addItem: (toDo: string) => void;
}

export default function TextBox({addItem}: TextBoxProps){
    const [inputValue, setInputValue] = useState('')
    
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        setInputValue(event.target.value)
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        addItem(inputValue)
        setInputValue('');
    }
    
    return(
        <form onSubmit={handleSubmit} className="flex justify-center items-center m-2">
            <label htmlFor="item" className="m-5 font-semibold font-mono self-center">Enter an item</label>
            <input onChange={handleInputChange}  type='text' value={inputValue} id="item" name="item" className="w-100 m-5 font-mono p-2 pl-5 border-[1.5px] rounded-4xl"></input>
            <button disabled={!inputValue} type="submit" className="self-center font-mono w-25 h-10 p-2 border-[1.5px] rounded-4xl enabled:bg-white enabled:hover:bg-[#fffff0] enabled:text-[#000000] disabled:bg-[#DADADA] disabled:text-[#AAAAAA]">Submit</button>
        </form>
    )
}