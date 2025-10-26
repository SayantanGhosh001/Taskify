import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // dynamic URL
  withCredentials: true, // send cookies
});

export default API;


