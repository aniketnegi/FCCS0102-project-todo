import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import TaskList from "@/components/TaskList"
import TaskInputForm from "@/components/TaskInputForm"

import { Toaster } from "sonner"

import { useEffect, useState } from 'react';

import { ThemeProvider } from "./components/theme-provider"
import { ModeToggle } from "./components/ModeToggle"
import axios from "axios"


export default function App() {


  /* To Update the TaskList everytime an action is performed
   * 1. define a `updateTodos() fn in a parent component to change a `key` set by useState hook
   * 2. pass the `key` as prop into the TaskList, and use it as a parameter in the `useEffect(()=>{}, [key])` in there to get a new list when `key` changes by calling `updateTodos()`
   * 3. pass `updateTodos()` as a prop to any component that needs to trigger a new fetch from API.
  */
  const [refreshKey, setRefreshKey] = useState(0);

  // Add a function to update the key when new todos are added
  function updateTodos() {
    setRefreshKey((refreshKey) => refreshKey + 1);
  };

  // progress bar
  const [progress, setProgress] = useState(0);
  function updateProgress(val: number) {
    const timer = setTimeout(() => setProgress(val), 100)
    return () => clearTimeout(timer)
  }
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/todos/checked")
      .then((response) => {
        updateProgress(response.data.progress);
      })
      .catch((error) => {
        console.error("Failed to fetch progress:", error);
      });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster richColors />
      <Card className="flex flex-col max-w-5xl h-min w-full mt-5 mx-5">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle><p className="text-5xl antialiased font-bold">TaskMaster</p></CardTitle>
            <CardDescription>Your very own task management system</CardDescription>
          </div>
          <ModeToggle />
        </CardHeader>
        <CardContent className="grid gap-3">
          <TaskInputForm updateTodos={updateTodos} updateProgress={updateProgress} />
          <TaskList refreshKey={refreshKey} updateTodos={updateTodos} updateProgress={updateProgress} />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-md text-neutral-700 dark:text-neutral-300 mb-2">
            Progress: {progress}%
          </p>
          <Progress value={progress} />
        </CardFooter>
      </Card>
    </ThemeProvider>
  )
}
