import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { eventDelete, convertTZ } from "@/lib/utils"
import axios from 'axios'

import TextInput from "./TextInput"
import DateInput from "./DateInput"

interface TaskInputFormProps {
  updateTodos: () => void;
}


const FormSchema = z.object({
  task: z.string().min(1, {
    message: "Todo event can't be empty!",
  }),
  description: z.string(),
  dueDate: z.date()
  // TODO: dueTime: z.time() ?????
})

export default function TaskInputForm({ updateTodos }: TaskInputFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      task: "",
      description: "",
      dueDate: new Date(),
    },
  })

  /* !!! TODO
   * Somehow due date is not showing
  */
  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios.post('http://127.0.0.1:5000/api/todo/create', {
      "title": data.task,
      "description": data.description,
      "dueDate": data.dueDate.getTime(),
    })
      .then((response) => {
        console.log(response.data);
        updateTodos();
        toast.success("Task Created", {
          description: `Due on: ${convertTZ(response.data.due_date, "Asia/Kolkata").toDateString()}`,
          action: {
            label: "Undo",
            onClick: async () => {
              try {
                eventDelete(response.data.id);
                updateTodos();
              } catch (error) {
                console.error("Error deleting event:", error);
              }
            },
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12">
        <div className="flex flex-row col-span-10 gap-4">
          <TextInput form={form} name="task" label='Task' mandatory={true} placeholder="Add a new task" />
          <TextInput form={form} name="description" label='Description' mandatory={false} placeholder="Add a task description" />
          <DateInput form={form} name="dueDate" label='Due Date' mandatory={false} placeholder="Pick a Due Date" />
        </div>
        {/* TODO: This might be off by a pixel or half >:((( */}
        <div className="flex justify-center content-center pt-8">
          <Button type="submit" className="col-span-2 px-[82px] mr-4">Add Task</Button>
        </div>
      </form>
    </Form>
  )
}
