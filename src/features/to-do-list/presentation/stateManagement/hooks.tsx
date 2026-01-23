'use client';

import { useState } from 'react';
import { Item } from '@/features/to-do-list/domain/entities/Item';
import { ToDoListRepositoryImpl } from '@/features/to-do-list/data/repositories/ToDoListRepository';
import { ManageItemsUseCase } from '@/features/to-do-list/domain/usecase/ManageItems';

const repo = new ToDoListRepositoryImpl();
const useCase = new ManageItemsUseCase(repo);

export function useItems() {
    const [items, setItems] = useState<Item[]>(useCase.getItems());

    const addItem = (toDo: string) => {
        useCase.addNewItem(toDo);
        setItems([... useCase.getItems()]);
    };

    const refresh = () => setItems([...useCase.getItems()]);

    const toggleItem = (item: Item) => {
        useCase.toggleItemStatus(item);
        setItems([... useCase.getItems()]);
    };

    const editItem = (id: number, newText: string) => {
        useCase.updateItemText(id, newText);
        refresh();
    };

    return {
        items,
        addItem,
        toggleItem,
        editItem
    };
}