import API from "./axiosInstance";

export const fetchTodos = () => API.get("/todos");
export const createTodo = (task) => API.post("/todos", { task });
export const updateTodo = (id, updatedTask) =>
  API.put(`/todos/${id}`, updatedTask );  
export const deleteTodo = (id) => API.delete(`/todos/${id}`);

