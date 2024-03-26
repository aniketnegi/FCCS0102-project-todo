import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import { CalendarIcon } from "lucide-react"

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import axios from 'axios'

// cheesy way to re-render <Task> on submit
interface TaskInputFormProps {
  updateTodos: () => void;
}


const FormSchema = z.object({
  task: z.string().min(1, {
    message: "Todo event can't be empty!",
  }),
  dueDate: z.date()
  // dueTime: z.time() ?????
})

export default function TaskInputForm({ updateTodos }: TaskInputFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      task: "",
      dueDate: new Date(),
    },
  })

  /* !!! TODO
   * Somehow due date is not showind
  */
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = {
      task:data.task, 
      dueDate: data.dueDate.setDate(data.dueDate.getDate() + 1),
    };
    axios.post('http://127.0.0.1:5000/api/todo/create', {
      "todo": data.task,
      "due_date": data.dueDate,
    })
      .then(function (response) {
        updateTodos();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    toast.success(`Created: ${data.task}`,
      {
        description: (
          <span className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-white">Due on: {response.dueDate.toString()}</p>
          </span>
        ),
      });


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="task"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task<span className="text-red-400">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Add a new task." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="grid grid-flow-row auto-rows-max h-auto pt-1.5">
              <FormLabel className="mb-1">Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit" className="col-span-2">Add Task</Button>
      </form>
    </Form>
  )
}
