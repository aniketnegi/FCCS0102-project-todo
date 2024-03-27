import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { Progress } from "@/components/ui/progress"

import TaskList from "@/components/TaskList"
import TaskInputForm from "@/components/TaskInputForm"

import { Sun, Moon } from "lucide-react"

/* To Update the TaskList everytime an action is performed
 * 1. define a `updateTodos() fn in a parent component to change a `key` set by useState hook
 * 2. pass the `key` as prop into the TaskList, and use it as a parameter in the `useEffect(()=>{}, [key])` in there to get a new list when `key` changes by calling `updateTodos()`
 * 3. pass `updateTodos()` as a prop to any component that needs to trigger a new fetch from API.
*/
import { useState } from 'react';


export default function App() {
  // cheesy contd.
  const [refreshKey, setRefreshKey] = useState(0);

  // Add a function to update the key when new todos are added
  function updateTodos() {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <>
      <Toaster richColors/>
      <Card className="flex flex-col max-w-5xl h-full w-full my-2 mx-5">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle><p className="text-5xl antialiased font-bold">TaskMaster</p></CardTitle>
            <CardDescription>Your very own task management system</CardDescription>
          </div>
          {/* TODO: Conditionally render Sun or Moon based on current theme */}
          <Button size="theme" variant="ghost"><Moon /></Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TaskInputForm updateTodos={updateTodos} />
          <TaskList refreshKey={refreshKey} updateTodos={updateTodos}/>
        </CardContent>
        <CardFooter>
          <Progress value={42} />
        </CardFooter>
      </Card>
    </>
  )
}
