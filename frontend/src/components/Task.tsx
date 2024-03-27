import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

import { Trash, Pencil } from "lucide-react";

import { truncateString, eventDelete } from "@/lib/utils";


interface todoObject {
    id: number,
    title: string,
    description: string,
    due_date: Date,
    created_at: Date,
    updated_at: Date,
    completed: Boolean
}

interface TaskProps {
    todoEvent: todoObject
    updateTodos: () => void,
}




export default function Task({ todoEvent, updateTodos }: TaskProps) {
    return (
        <li key={todoEvent.id.toString()} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
                <Checkbox />
                <span>{truncateString(todoEvent.title)}</span>
            </div>
            <div className="flex space-x-4 pr-3">
                <div className="text-gray-500 dark:text-gray-400">Due on: {new Date(todoEvent.due_date).toDateString()}</div>
                <Button size="sm" variant="outline">
                    <Pencil size={16} />
                </Button>
                <Button size="sm" variant="destructive" onClick={async () => { await eventDelete(todoEvent.id); updateTodos() }}>
                    <Trash size={16} />
                </Button>
            </div>
        </li>

    )
}
