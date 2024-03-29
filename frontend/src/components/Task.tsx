import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

import { Trash, Pencil } from "lucide-react";

import { truncateString, eventDelete } from "@/lib/utils";

import EditDialog from "@/components/EditDialog";
import axios from "axios";

export interface todoObject {
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
    updateProgress: (val: number) => void,
}


export default function Task({ todoEvent, updateTodos, updateProgress }: TaskProps) {

    function onCheck() {
        axios.put(`http://127.0.0.1:5000/api/todo/toggle/${todoEvent.id}`).then(() => {
            // TODO: extract the following into utils.ts
            // can't figure out async await currently
            axios.get("http://127.0.0.1:5000/api/todos/checked").then((response) => {
                updateProgress(response.data.progress);
            });
            updateTodos();

        })

    }

    return (
        <li key={todoEvent.id} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
                {/* TODO: There has got to be a better way to do this */}
                {todoEvent.completed ? <Checkbox checked onClick={onCheck} /> : <Checkbox onClick={onCheck} />}

                <div className="flex flex-row items-baseline gap-2">
                    <p className="text-md text-slate-900 dark:text-white">{truncateString(todoEvent.title, 20)}</p>
                    <p className="text-md text-slate-500 dark:text-slate-400">{truncateString(todoEvent.description, 40)}</p>
                </div>

            </div>
            <div className="flex space-x-4 pr-3">
                <div className="text-gray-500 dark:text-gray-400">Due on: {new Date(todoEvent.due_date).toDateString()}</div>
                <EditDialog buttonChild={
                    <Button size="sm" variant="outline">
                        <Pencil size={16} />
                    </Button>} updateTodos={updateTodos} todoEvent={todoEvent} />
                <Button size="sm" variant="destructive" onClick={async () => {
                    await eventDelete(todoEvent.id);
                    axios.get("http://127.0.0.1:5000/api/todos/checked").then((response) => {
                        updateProgress(response.data.progress);
                    }); updateTodos();
                }
                }>
                    <Trash size={16} />
                </Button>
            </div>
        </li >

    )
}
