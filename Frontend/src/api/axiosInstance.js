import axios from "axios";

const API = axios.create({
  baseURL: "https://taskify-gd8g.onrender.com/api", // dynamic URL
  withCredentials: true, // send cookies
});

export default API;




