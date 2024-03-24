import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import TaskInputForm from "@/components/TaskInputForm"
import { Toaster } from "./components/ui/sonner"
import { Progress } from "./components/ui/progress"
import Task from "./components/Task"

// cheesy way of updating Task component (re-render) every time new todo is added
import React, { useState } from 'react';


export default function App() {
  // cheesy contd.
  const [todosKey, setTodosKey] = useState(0);

    // Add a function to update the key when new todos are added
    const updateTodos = () => {
        setTodosKey((prevKey) => prevKey + 1);
    };
  return (
    <>
    <Toaster />
      <div className="flex justify-center items-center h-screen">
          <Card >
            <CardHeader>
              <CardTitle>TaskMaster</CardTitle>
              <CardDescription>Your very own task management system</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <TaskInputForm updateTodos={updateTodos}/>
                <Task key={todosKey}/>
            </CardContent>
            <CardFooter>
              <Progress value={42} />
            </CardFooter>
          </Card>
      </div>

      <div className="absolute top-4 right-4">
        <Button size="sm">Theme</Button>
      </div>
    </>
  )
}
