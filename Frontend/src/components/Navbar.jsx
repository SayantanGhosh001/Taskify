import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  // console.log("User:", user);

  return (
    <nav className="bg-[#0000009c] p-4 text-white flex justify-between">
      <h1 className="text-2xl font-bold font-[roboto] agbalumo-regular">
        Taskify
      </h1>
      <div className="flex">
        {user ? (
          <>
            {useEffect(() => {
              console.log("User:", user);
            }, [])}
            <span className="sm:mr-4 capitalize mr-2 text-center">
              Welcome, {user.name.split(" ")[0]}
            </span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="mr-4 text-base font-semibold hover:border-b-2"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="mr-4 text-base font-semibold hover:border-b-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mr-2 text-base font-semibold hover:border-b-2"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
