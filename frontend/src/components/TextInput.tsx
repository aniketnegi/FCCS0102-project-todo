import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


interface TextInputProps {
    form: any; // TODO: don't leave this retarded thing in here
    name: string
    label: string,
    mandatory: boolean,
    placeholder: string
}

export default function TextInput({ form, name, label, mandatory, placeholder }: TextInputProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}{mandatory && <span className="text-red-400">*</span>}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}

        />)
}
