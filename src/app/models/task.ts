import { Category } from "./category";

export class Task{
    id: number;
    title: string;
    isCompleted: boolean;
    category?: Category;
    date?: Date;

    constructor(id: number, title : string, isCompleted: boolean, category: Category, date: Date) {
        this.id = id;
        this.title = title;
        this.isCompleted = isCompleted;
        this.category = category;
        this.date = date;  
    }

}