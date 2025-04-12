import API from "./axiosInstance";

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const logoutUser = () => API.post("/auth/logout");
export const getUser = () => API.get("/auth/me");
