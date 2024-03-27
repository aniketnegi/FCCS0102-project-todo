import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import axios from "axios";

import { toast } from "sonner";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function truncateString(input: string, maxLength: number = 60): string {
  const ellipsis = '...';
  if (input.length <= maxLength) {
    return input;
  } else {
    return input.substring(0, maxLength) + ellipsis;
  }
}

// delete an event with id <id>
export function eventDelete(id: number) {
  axios.delete(`http://127.0.0.1:5000/api/todo/${id}`)
    .then(() => {
      // handle success
      toast.info("Task Deleted!", {
      });
    })
    .catch((error) => {
      // handle error
      console.log(error);
    })
}



export function convertTZ(date: Date, tzString: string): Date {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}
