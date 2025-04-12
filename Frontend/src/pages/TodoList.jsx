import React, { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";
import Navbar from "../components/Navbar";
import "../App.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"

  useEffect(() => {
    fetchTodos()
      .then(({ data }) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      console.log("Sending Request:", { task: newTask }); // Debugging Log
      const { data } = await createTodo(newTask);
      setTodos([...todos, data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
    }
  };

  const enableEdit = (todo) => {
    setEditTaskId(todo._id);
    setEditTaskValue(todo.task);
  };

  const saveEdit = async (id) => {
    if (!editTaskValue.trim()) return;

    try {
      const { data } = await updateTodo(id, { task: editTaskValue });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, task: data.task } : todo
        )
      );
      setEditTaskId(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const toggleCompletion = async (id, currentStatus) => {
    try {
      const { data } = await updateTodo(id, { completed: !currentStatus });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: data.completed } : todo
        )
      );
    } catch (err) {
      console.error("Error updating completion status:", err);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="body-img">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center py-3 px-4">
        {/* Filter Tabs */}
        <div className="flex gap-3 mb-4">
          <button
            className={`px-4 py-2 rounded-md shadow-md ${
              filter === "all" ? " bg-fuchsia-400 text-white" : "bg-[#ffffff80]"
            }`}
            onClick={() => setFilter("all")}
          >
            All Tasks
          </button>
          <button
            className={`px-4 py-2 rounded-md shadow-md ${
              filter === "completed"
                ? "bg-green-500 text-white"
                : "bg-[#ffffff80]"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-md shadow-md ${
              filter === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-[#ffffff80]"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        {/* Add New Task Form */}
        <form
          onSubmit={addTodo}
          className="bg-[#7dff8e75] shadow-md p-4 md:p-6 rounded-lg w-full max-w-lg flex flex-col gap-4 mt-3 form-shadow"
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Task"
            required
            className="p-2 border-[1px] text-black border-black rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#10cf00] text-white px-4 py-2 rounded-md hover:bg-[#0eb000] transition"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <ul className="mt-6 w-full flex flex-wrap justify-center">
          {filteredTodos.map((todo) => (
            <li
              key={todo._id}
              className="bg-[#ffffff45] shadow-lg p-4 md:p-5 rounded-lg mb-4 flex flex-col gap-2 m-2 sm:w-[300px] w-[350px] card-shadow"
            >
              {editTaskId === todo._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)}
                    className="p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => saveEdit(todo._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditTaskId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[#008e01] flex justify-end mt-[-10px] pb-1 border-b border-[#0fc200] mb-1.5">
                    {formatDate(todo.createdAt)}
                  </p>
                  <h3
                    className={`text-xl font-semibold font-[Roboto] capitalize ${
                      todo.completed
                        ? "line-through text-[#0000008b]"
                        : "text-black"
                    }`}
                  >
                    {todo.task}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        toggleCompletion(todo._id, todo.completed)
                      }
                      className="w-5 h-5 cursor-pointer border flex items-center justify-center"
                    />
                    <span className="text-black">
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => enableEdit(todo)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTodo(todo._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
