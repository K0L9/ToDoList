import { Category } from "../models/category";
import { Task } from "../models/task";

export class SeedData{

    static categories: Category[] = [
        {id: 1, title: "Planing"},
        {id: 2, title: "Programming"},
        {id: 3, title: "Tests"},
        {id: 4, title: "QA"},
        {id: 5, title: "Deploy"},
    ]

    static tasks: Task[] = [
        {
            id: 1,
            title: "Make coffe",
            isCompleted: true,
            category: SeedData.categories[0],
            date: new Date()
        },
        {
            id: 2,
            title: "Play games",
            isCompleted: false,
            category: SeedData.categories[0],
            date: new Date()
        },
        {
            id: 3,
            title: "Pull new changes from git",
            isCompleted: true,
            category: SeedData.categories[1],
            date: new Date()
        },
        {
            id: 4,
            title: "Create Selenium test",
            isCompleted: true,
            category: SeedData.categories[2],
            date: new Date()
        },
        {
            id: 5,
            title: "Run Selenium test",
            isCompleted: true,
            category: SeedData.categories[3],
            date: new Date()
        },
        {
            id: 6,
            title: "Deploy project",
            isCompleted: false,
            category: SeedData.categories[4],
            date: new Date()
        },
        {
            id: 7,
            title: "Go to party",
            isCompleted: true,
            category: SeedData.categories[0],
            date: new Date()
        },
    ]
}