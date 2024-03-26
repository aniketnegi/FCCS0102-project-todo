import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

import { Trash, Pencil } from "lucide-react";

import { truncateString } from "@/lib/utils";

interface todoObject {
    id: Number,
    title: string,
    due_date: Date,
    created_at: Date,
    updated_at: Date,
    completed: Boolean
}

interface TaskProps {
    todoEvent: todoObject
}

export default function Task({ todoEvent }: TaskProps) {
    return (
        <li key={todoEvent.id.toString()} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
                <Checkbox />
                <span>{truncateString(todoEvent.title)}</span>
            </div>
            <div className="flex space-x-4 pr-3">
                <div className="text-gray-500 dark:text-gray-400">Due on: {new Date(todoEvent.due_date).toDateString()}</div>
                <Button size="sm" variant="ghost">
                    <Pencil size={16} />
                </Button>
                <Button size="sm" variant="ghost">
                    <Trash size={16} />
                </Button>
            </div>
        </li>

    )
}
