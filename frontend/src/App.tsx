import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { Progress } from "@/components/ui/progress"

import TaskList from "@/components/TaskList"
import TaskInputForm from "@/components/TaskInputForm"

import { Sun, Moon } from "lucide-react"

// cheesy way of updating Task component (re-render) every time new todo is added
// import React, { useState } from 'react';


export default function App() {
  // cheesy contd.
  // const [todosKey, setTodosKey] = useState(0);

  // Add a function to update the key when new todos are added
  // const updateTodos = () => {
  //     setTodosKey((prevKey) => prevKey + 1);
  // };
  return (
    <>
      <Toaster />
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
            <TaskInputForm updateTodos={() => { }} />
            <TaskList />
          </CardContent>
          <CardFooter>
            <Progress value={42} />
          </CardFooter>
        </Card>
    </>
  )
}
