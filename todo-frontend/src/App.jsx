import { useEffect, useState } from 'react'
import { TodoProvider } from './context/ToDoContext'
import { TodoForm, TodoItem } from './components'
import API from "./api/todoApi";

function App() {

  const [todos, setTodos] = useState([])

  const getTodos = async () => {

    try {

      const response =
        await API.get("/tasks");

      setTodos(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  const addTodo = async (todo) => {

    try {

      await API.post("/tasks", todo);

      getTodos();

    } catch (error) {

      console.log(error);

    }
  };

  const updateTodo = async (id, todo) => {

    try {

      await API.put(`/tasks/${id}`, todo);

      getTodos();

    } catch (error) {

      console.log(error);

    }
  };

  const deleteTodo = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      getTodos();

    } catch (error) {

      console.log(error);

    }
  };

  const toggleComplete = async (id) => {

    const selectedTodo =
      todos.find((todo) => todo._id === id);

    try {

      await API.patch(
        `/tasks/${id}/status`,
        {
          completed:
            !selectedTodo.completed,
        }
      );

      getTodos();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

  getTodos();

}, []);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className='bg-[#172842] min-h-screen py-8'>
        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
          <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manage Your ToDos</h1>
          <div className='mb-4'>
            {/* Todo from goes here */}
            <TodoForm />
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {/* Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div key={todo._id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
