import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-12 space-y-4 md:space-y-8">
      <div className="flex flex-col w-full max-w-[400px] space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <form className="flex gap-2">
            <Input
              className="flex-1 min-w-0"
              placeholder="Add a new task..."
              type="text"
            />
            <Button type="submit">Add</Button>
          </form>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="task1" />
            <label className="flex-1" htmlFor="task1">
              Buy groceries
            </label>
            <Button className="w-6 h-6" size="icon" variant="outline">
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="task2" />
            <label className="flex-1" htmlFor="task2">
              Call mom
            </label>
            <Button className="w-6 h-6" size="icon" variant="outline">
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="task3" />
            <label className="flex-1" htmlFor="task3">
              Walk the dog
            </label>
            <Button className="w-6 h-6" size="icon" variant="outline">
              <TrashIcon className="w-4 h-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
