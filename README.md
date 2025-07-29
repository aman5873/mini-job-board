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
```

# 📂 Folder Structure
```json
mini-job-board/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── functions/   # API functions (fetchAllJobs, etc.)
│   │   ├── pages/       # Pages like Home, AddJob, JobDetails
│   │   └── utils/       # Spinner, Toast configs
│   ├── package.json
│   └── .env             # React client environment
├── server/              # Express backend
│   ├── config/          # MongoDB connection setup
│   ├── controllers/     # Job & Location controllers
│   ├── middleware/      # Validators
│   ├── models/          # Mongoose schemas
│   ├── routes/          # jobRoutes, locationRoutes
│   ├── server.js        # Entry point
│   ├── package.json
│   └── .env             # Server environment
├── .gitignore
└── README.md
```


# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository
```bash Copy
git clone https://github.com/your-username/mini-job-board.git
cd mini-job-board
```

## 2️⃣ Backend Setup
```bash Copy
cd server
npm install
```

#### Create a .env file inside the /server folder:
```bash Copy
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobboard
PORT=5000
```
#### Then start the backend server : Server will run at http://localhost:5000 
```bash Copy
npm run dev
```

## 3️⃣ Frontend Setup
```bash Copy
cd ../client
npm install
```

#### Then start the React app : Frontend will run at http://localhost:3000
``` bash Copy
npm start
```

# 🚀 Deployment
``` bash
Frontend : Vercel / Netlify
Backend  : Render.com / Railway
Database : MongoDB Atlas
```

# 📄 License
This project is licensed under the MIT License.


## 🙋‍♂️ Author

### 👨‍💻 Aman Chauhan

💼 Full Stack Developer  
🚀 Passionate about building intuitive UIs and scalable backend systems  
📬 Reach out for collaborations, suggestions, or contributions!

---

🔗 **Connect with me:**

- 🌐 [Portfolio](https://portfolio-abcb2.web.app/)  
- 💼 [LinkedIn](https://www.linkedin.com/in/iaman07)  
- ✉️ Email: chauhanaman4002@gmail.com  

> 🤝 Feel free to fork this repo, open issues, or send pull requests.  
> Contributions are always welcome and appreciated!

---




