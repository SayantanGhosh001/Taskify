import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";

const App = () => {
  return (
    <AuthProvider>
      {/* <Navbar />
      <div className="container mx-auto p-4"> */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Public Routes (Cannot be accessed if logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes (Only accessible if logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/todos" element={<TodoList />} />
        </Route>
      </Routes>
      {/* </div> */}
    </AuthProvider>
  );
};

export default App;
