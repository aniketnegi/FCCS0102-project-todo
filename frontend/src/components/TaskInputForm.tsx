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
  description: z.string(),
  dueDate: z.date()
  // dueTime: z.time() ?????
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
      .then(function (response) {
        updateTodos();
        console.log(response);
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
        <div className="flex flex-row col-span-2 gap-4">
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task<span className="text-red-400">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Add a new task" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Add a task description" {...field} />
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
        </div>
        <Button type="submit" className="col-span-1">Add Task</Button>
      </form>
    </Form>
  )
}
