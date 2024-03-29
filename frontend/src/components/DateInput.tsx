import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button"

import { CalendarIcon } from "lucide-react"

import { format, isBefore, startOfDay } from "date-fns"
import { cn } from "@/lib/utils"

interface DateInputProps {
    form: any; // TODO: don't leave this retarded thing in here
    name: string
    label: string,
    mandatory: boolean,
    placeholder: string
}

export default function DateInput({ form, name, label, mandatory, placeholder }: DateInputProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}{mandatory && <span className="text-red-400">*</span>}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>{placeholder}</span>
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
                                    // TODO: TimeZone bs is causing the dates issue!!
                                    isBefore(startOfDay(date), startOfDay(new Date()))
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </FormItem>
            )}
        />

    )
}
