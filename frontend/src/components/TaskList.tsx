import { useState, useEffect } from "react"
import axios from 'axios'

import Task from "./Task";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function TaskList() {
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
    }, [])

    return (
        <ScrollArea className="h-[700px] w-[900px] rounded-sm p-1">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {todos.map((todo) => (
                    <Task todoEvent={todo} />
                ))}
            </ul>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}
