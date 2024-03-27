import { useState, useEffect } from "react"
import axios from 'axios'

import Task from "./Task";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TaskListProps {
    refreshKey: number,
    updateTodos: () => void,
}

export default function TaskList({ refreshKey, updateTodos }: TaskListProps) {
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
        <ScrollArea className="h-[700px] w-full rounded-sm p-1">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {todos.map((todo) => (
                    <Task todoEvent={todo} updateTodos={updateTodos} />
                ))}
            </ul>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}
