import { ToDoListRepository } from "@/features/to-do-list/domain/repositories/ToDoListRepository";
import { Item } from "@/features/to-do-list/domain/entities/Item";

export class ManageItemsUseCase {
    constructor(private repository: ToDoListRepository) {}

    getItems(): Item[] {
        return this.repository.getAll();
    }

    addNewItem(text: string): Item {
        return this.repository.add(text);
    }

    toggleItemStatus(item: Item): Item {
        const updated = { ...item, done: !item.done };
        this.repository.update(updated);
        return updated;
    }

    updateItemText(id: number, newText: string): void {
        if (newText.trim() === '') {
            this.repository.remove(id);
        } else {
            const item = this.repository.getAll().find(i => i.id === id);
            if (item) {
                this.repository.update({ ...item, toDo: newText });
            }
        }
    }

}