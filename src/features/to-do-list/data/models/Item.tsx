import { Item } from '@/features/to-do-list/domain/entities/Item'

export class ItemModel implements Item {
    constructor(
        public id: number,
        public toDo: string,
        public done: boolean
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromJson(json: any): ItemModel {
        return new ItemModel(json.id, json.toDo, json.done);
    }
}


