import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import axios from 'axios'

import { ReactNode, useState } from "react"

import TextInput from "./TextInput"
import DateInput from "./DateInput"

import { todoObject } from "./Task"

interface EditDialogProps {
    buttonChild: ReactNode;
    updateTodos: () => void,
    todoEvent: todoObject,
}


const FormSchema = z.object({
    task: z.string().min(1, {
        message: "Todo event can't be empty!",
    }),
    description: z.string(),
    dueDate: z.date()
    // TODO: dueTime: z.time() ?????
})

export default function EditDialog({ buttonChild, updateTodos, todoEvent }: EditDialogProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            task: todoEvent.title,
            description: todoEvent.description,
            dueDate: new Date(todoEvent.due_date),
        },
    })

    /* !!! DONE
     * Somehow due date is not showing
    */
    function onSubmit(data: z.infer<typeof FormSchema>) {
        axios.put(`http://127.0.0.1:5000/api/todo/${todoEvent.id}`, {
            "title": data.task,
            "description": data.description,
            "dueDate": data.dueDate.getTime(),
        })
            .then((response) => {

                toast.success("Task Updated!", {
                });
                updateTodos();
            })
            .catch(function (error) {
                console.log(error);
            });



    }

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                {buttonChild}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                        Make changes to your Task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                        <div className="flex flex-col gap-4 mb-5">
                            <TextInput form={form} name="task" label='Task' mandatory={false} placeholder="Add a new task" />
                            <TextInput form={form} name="description" label='Description' mandatory={false} placeholder="Add a task description" />
                            <DateInput form={form} name="dueDate" label='Due Date' mandatory={false} placeholder="Pick a Due Date" />
                        </div>
                        {/* TODO: This might be off by a pixel or half >:((( */}
                        <Button type="submit" className="justify-self-end" onClick={() => { onSubmit; setDialogOpen(false) }}>Save changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
