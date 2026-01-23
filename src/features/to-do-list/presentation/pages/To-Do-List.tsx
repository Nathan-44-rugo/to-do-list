'use client'
import List from "../components/List";
import TextBox from "../components/TextBox";
import { useItems } from "../stateManagement/hooks";

export default function ToDoList(){
    const { items, addItem, toggleItem, editItem} = useItems();
    return(
        <div>
            <TextBox addItem={addItem}></TextBox>
            <List items={items} toggleItem={toggleItem} toggleEdit={editItem}></List>
        </div>
        
    )
}