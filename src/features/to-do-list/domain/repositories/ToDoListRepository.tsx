import { Item } from "@/features/to-do-list/domain/entities/Item";

export interface ToDoListRepository {
    getAll(): Item[];
    add(toDo: string): Item;
    update(item: Item): void;
    remove(id: number): void;
}