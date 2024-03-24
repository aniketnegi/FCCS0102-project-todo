import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import TaskInputForm from "@/components/TaskInputForm"
import { Toaster } from "./components/ui/toaster"
import DueDateInput from "./components/DueDateInput"

export default function App() {
  return (
    <>
    <Toaster />
      <div className="px-96 py-72">
          <Card>
            <CardHeader>
              <CardTitle>TaskMaster</CardTitle>
              <CardDescription>Add, complete, and delete tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <TaskInputForm />
                <DueDateInput />
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <input
                      className="form-checkbox h-5 w-5 text-[#000] dark:text-[#fff] border-gray-300 dark:border-gray-700 rounded"
                      type="checkbox"
                    />
                    <span className="ml-2 line-through">Task 1</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Due on: March 25, 2024</div>
                </li>
                <li className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <input
                      className="form-checkbox h-5 w-5 text-[#000] dark:text-[#fff] border-gray-300 dark:border-gray-700 rounded"
                      type="checkbox"
                    />
                    <span className="ml-2">Task 2</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Due on: March 26, 2024</div>
                </li>
                <li className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <input
                      className="form-checkbox h-5 w-5 text-[#000] dark:text-[#fff] border-gray-300 dark:border-gray-700 rounded"
                      type="checkbox"
                    />
                    <span className="ml-2">Task 3</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Due on: March 27, 2024</div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Add Task</Button>
            </CardFooter>
          </Card>
      </div>

      <div className="absolute top-4 right-4">
        <Button size="sm">Theme</Button>
      </div>
    </>
  )
}
