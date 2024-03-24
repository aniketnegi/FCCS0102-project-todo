import { useState, useEffect } from "react"
import axios from 'axios'
import { Checkbox } from "./ui/checkbox";


function Task() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/todos')
            .then(function (response) {
                // handle success
                setTodos(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [])

    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {todos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                        <Checkbox
                            className="form-checkbox h-5 w-5 text-[#000] dark:text-[#fff] border-gray-300 dark:border-gray-700 rounded"
                        />
                        <span className="ml-2">{todo.title}</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">Due on: {new Date(todo.created_at).toDateString()}</div>
                </li>
            ))}
        </ul>
    )
}

export default Task
