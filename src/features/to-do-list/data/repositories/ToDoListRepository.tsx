// src/features/todo/data/repositories/item_repository_impl.ts
import { Item } from "@/features/to-do-list/domain/entities/Item";
import { ToDoListRepository } from "@/features/to-do-list/domain/repositories/ToDoListRepository";
import { ItemModel } from "../models/Item";
import { ListSource } from "@/features/to-do-list/data/dataSources/local/list"

const list = new ListSource()

export class ToDoListRepositoryImpl implements ToDoListRepository {
    private todoList: Item[]

    constructor(){
        this.todoList = list.fetchList().map(i => ItemModel.fromJson(i))
    }

    getAll(): Item[] {
        return [...this.todoList];
    }

    add(toDo: string): Item {
        const newItem = new ItemModel(Date.now(), toDo, false);
        this.todoList.push(newItem);
        return newItem;
    }

    update(item: Item): void {
        const index = this.todoList.findIndex(i => i.id === item.id);
        if (index !== -1) this.todoList[index] = item;
    }

    remove(id: number): void {
        this.todoList = this.todoList.filter(i => i.id !== id);
    }

}