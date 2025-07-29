# 🧳 Mini Job Board

A full-stack mini job board web application where users can:

- 🔍 View available job listings
- ➕ Add new jobs via form
- 📄 View job details

---

## 📦 Tech Stack

**Frontend:**
- ReactJS (with MUI & Framer Motion)
- React Router
- Axios

**Backend:**
- Node.js + Express.js
- MongoDB (with Mongoose)
- Input Validation (server + client)
- REST API Architecture

---

## 🌐 Live Demo

> **URL:** [https://your-deployed-url.com](https://your-deployed-url.com)  
> **API:** MongoDB Atlas + Render (or local MongoDB)

---

## 🛠 Features

### 🎯 Core Features

- View all jobs in a clean, responsive grid UI
- Search jobs by title (debounced)
- Filter jobs by location (React-Select)
- View detailed job info
- Add new job with full form
- Locations stored in DB (no duplicates)

### ✅ Validation

- **Client-side**: All inputs required
- **Server-side**: API validation + proper error response format

### 🧃 UX Enhancements

- MUI Input Fields
- Toast Notifications via `react-toastify`
- Loading Spinner using custom component
- Animations via Framer Motion

---

## 🧪 API Endpoints

### 🔹 Jobs

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | `/api/jobs`      | Fetch all jobs         |
| GET    | `/api/jobs/:id`  | Fetch single job       |
| POST   | `/api/jobs`      | Create a new job       |

### 🔹 Locations

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| GET    | `/api/locations`    | Get all locations       |
| POST   | `/api/locations`    | Add a new location      |

> All API responses follow the format:

```json
{
  "status": true,
  "message": "Jobs fetched",
  "data": [ ... ]
}


### 📂 Folder Structure
bash
Copy
Edit
mini-job-board/
├── client/          # React frontend
├── server/          # Express backend
├── .gitignore
└── README.md
⚙️ Setup Instructions
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/mini-job-board.git
cd mini-job-board
2. Backend Setup
bash
Copy
Edit
cd server
npm install
Create a .env file in /server:

env
Copy
Edit
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobboard
PORT=5000
Start server:

bash
Copy
Edit
npm run dev
3. Frontend Setup
bash
Copy
Edit
cd ../client
npm install
npm start
🚀 Deployment
Frontend: Vercel / Netlify

Backend: Render.com / Railway

DB: MongoDB Atlas (IP whitelist: 0.0.0.0/0 for development)

📄 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Aman Chauhan