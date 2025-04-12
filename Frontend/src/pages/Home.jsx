import { Link } from "react-router-dom";
import "../App.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="text-center body">
      <Navbar />
      <div className=" font-extrabold text-black mt-16 agbalumo-regular">
        <p className="sm:text-6xl txt-border text-4xl">
          Welcome to the Taskify
        </p>
        <p className="sm:text-3xl tracking-normal mt-5 text-2xl ">
          Where tasks meet momentum, and productivity
          <br /> flows effortlessly.
        </p>
      </div>
      <div className="mt-5 text-xl font-bold">
        <Link
          to="/login"
          className="text-[#ffffffdd] font-serif hover:underline"
        >
          Login to continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
