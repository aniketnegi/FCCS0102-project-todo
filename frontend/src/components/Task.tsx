import { useState, useEffect } from "react"
import axios from 'axios'


function Task() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/todos')
        .then(function (response) {
          // handle success
          console.log(response);
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
    )
}

export default Task
