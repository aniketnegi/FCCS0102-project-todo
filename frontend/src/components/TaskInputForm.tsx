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
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  task: z.string().min(1, {
    message: "Todo event can't be empty!",
  }),
  dueDate: z.date()
  // dueTime: z.time() ?????
})

export default function TaskInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      task: "",
      dueDate: new Date(),
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Added Todo Event!",
      description: (
        <span className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-white">Task: {JSON.stringify(data, null, 2)}</p>
        </span>
      ),
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task</FormLabel>
                <FormControl>
                  <Input placeholder="Add a new task." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  )
}
