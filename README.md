# 📝 Taskify

Taskify is a **full-stack To-Do application** built using the **MERN stack** (MongoDB, Express.js, React, Node.js).  
It allows users to **register, log in, and manage their daily tasks efficiently** with full **authentication and authorization**.  

---

## 🚀 Features

### 🔐 Authentication
- User **registration and login** with **JWT authentication**.
- **Secure cookie-based session management**.
- Automatic **token expiration and redirection** handling.

### 🧾 Task Management
- Add, update, delete, and mark tasks as complete/incomplete.
- Fetch all user-specific tasks dynamically from the backend.
- Real-time task updates using API calls.

### ⚙️ Frontend
- Built with **React** and **Vite** for fast performance.
- **Protected routes** ensure authenticated navigation.
- Uses **React Router** for routing and **Axios** for API communication.
- Clean and modern UI with **Tailwind CSS**.

### 🧠 Backend
- Built using **Node.js** and **Express.js**.
- **MongoDB** as the database with **Mongoose** ODM.
- **JWT & bcrypt** for secure authentication.
- **Zod validation** for input validation.
- Organized folder structure with separate routes, controllers, and models.

---

---

## ⚡ Tech Stack

**Frontend:** React, Vite, Axios, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT, bcrypt  
**Validation:** Zod  
**Environment Management:** dotenv  

---

## 🧩 Environment Variables

### Backend `.env`
```bash
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```
### Frontend `.env`
VITE_API_BASE_URL=http://localhost:8000/api

## 🏗️ Project Structure

