import { useState, useEffect } from "react"
import axios from 'axios'

import Task from "./Task";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


export interface todoObject {
    id: number,
    title: string,
    description: string,
    due_date: Date,
    created_at: Date,
    updated_at: Date,
    completed: boolean
}

interface TaskListProps {
    refreshKey: number,
    updateTodos: () => void,
    updateProgress: (val: number) => void,
}

export default function TaskList({ refreshKey, updateTodos, updateProgress }: TaskListProps) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/todos')
            .then(function (response) {
                // handle success
                setTodos(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [refreshKey])

    return (
        <ScrollArea className="h-content max-h-[730px] w-full border rounded-md px-4 mb-0">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {todos.map((todo: todoObject) => (
                    <li key={todo.id} className="flex items-center justify-between py-3">
                        <Task todoEvent={todo} updateTodos={updateTodos} updateProgress={updateProgress} />
                    </li>
                ))}
            </ul>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}
