## 🧳 Mini Job Board
## 🚀 Live App  
🔗 [mini-job-board.vercel.app](https://mini-job-board-mu-ashy.vercel.app)

A full-stack job board web application to:

- 🔍 Browse job listings  
- ➕ Add new job posts  
- 📄 View detailed job info  

---



## 📦 Tech Stack

### 🖥️ Frontend (ReactJS)
- React 19 + React Router v6
- MUI (Material UI)
- Framer Motion
- React Select
- React Toastify
- Axios
- Lodash.debounce

### 🔙 Backend (ExpressJS)
- Express 5
- MongoDB + Mongoose
- express-validator
- dotenv
- cors
- nodemon (dev only)

---

## 🧠 Features

### 👀 Job Board
- View jobs in a responsive grid
- Search by title (debounced)
- Filter by location (dropdown)
- Click job to view full details

### 📝 Job Form
- Add new job with validation
- Locations auto-saved (no duplicates)

### ✅ Validation
- Client-side: Required fields enforced
- Server-side: Input validation + error format

### 🎨 UX Enhancements
- MUI styled form & components
- Animations with Framer Motion
- Toast notifications
- Custom loading spinner

---

## 🔌 API Summary

| Endpoint           | Method | Description        |
|--------------------|--------|--------------------|
| `/api/jobs`        | GET    | Get all jobs       |
| `/api/jobs/:id`    | GET    | Get job by ID      |
| `/api/jobs`        | POST   | Create new job     |
| `/api/locations`   | GET    | Get all locations  |
| `/api/locations`   | POST   | Add new location   |

```md
> All responses follow:
{
  "status": true,
  "message": "Success message",
  "data": [ ... ]
}
```

## 📂 Folder Structure
```md
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


## ⚙️ Setup Instructions

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
PORT=5050
```
#### Then start the backend server : Server will run at http://localhost:5050 
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

## 🚀 Deployment
``` md
Frontend : Vercel
Backend  : Render.com
Database : MongoDB Atlas
```

## 📄 License
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




