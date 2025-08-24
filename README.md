## 🧳 Mini Job Board
## 🚀 Live App  
🔗 [mini-job-board.vercel.app](https://mini-job-board-mu-ashy.vercel.app)

A full-stack job board web application to:

- 🔍 Browse job listings  
- ➕ Add new job posts  
- 📄 View detailed job info  
- 🔑 Login using Google OAuth
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
- **Google OAuth Login**

### 🔙 Backend (ExpressJS)
- Express 5
- MongoDB + Mongoose
- express-validator
- dotenv
- cors
- nodemon (dev only)
- **Redis caching (optional)**

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

### 🔑 Google Login
- Login using Google OAuth 2.0  
- User info saved on backend  
- Works seamlessly with job posting & application features  

### ✅ Validation
- Client-side: Required fields enforced
- Server-side: Input validation + error format

### 🎨 UX Enhancements
- MUI styled form & components
- Animations with Framer Motion
- Toast notifications
- Custom loading spinner

---

## ⚡ Redis Caching & Fallback

The backend uses Redis to cache job listings and reduce DB load.  

**Key points:**
- `REDIS_URL` environment variable is optional.
- If Redis connection fails (wrong URL, unreachable server, or local dev), the API **automatically falls back to the DB**.
- Requests **will never hang** or fail due to Redis issues.
- Cache TTL is configurable via `REDIS_TTL` (default 60s).

**Example `.env` for Redis:**
  ```env
  REDIS_URL=redis://<username>:<password>@<host>:6379
  REDIS_TTL=60
  ```
  You can safely leave REDIS_URL empty in development.

### 🔁 Redis Fallback Flow
```text
           +-----------------+
           |   API Request   |
           +--------+--------+
                    |
                    v
            +-------+-------+
            |  Redis Cache  |
            +-------+-------+
                    |
           Cache Hit | Cache Miss
          -----------+-----------
          |                     |
          v                     v
  Return cached data        Fetch from DB
                             |
                             v
                      +------+------+
                      | Save to Redis |
                      +------+------+
                             |
                             v
                        Return data
```

✅ If Redis is unavailable, the API fetches directly from the database without delaying requests.

---

## 🔌 API Summary

### Jobs & Locations
| Endpoint           | Method | Description        |
|--------------------|--------|--------------------|
| `/api/jobs`        | GET    | Get all jobs       |
| `/api/jobs/:id`    | GET    | Get job by ID      |
| `/api/jobs`        | POST   | Create new job     |
| `/api/locations`   | GET    | Get all locations  |
| `/api/locations`   | POST   | Add new location   |

### Applications
| Endpoint                 | Method | Description                    |
|--------------------------|--------|--------------------------------|
| `/api/applications/apply`| POST   | Apply for a job (user only)   |
| `/api/applications/applied` | GET | Get jobs applied by logged-in user |

### Authentication
| Endpoint                 | Method | Description                       |
|--------------------------|--------|-----------------------------------|
| `/api/auth/login`        | POST   | Login with email/password         |
| `/api/auth/register`     | POST   | Register new user                 |
| `/api/auth/refresh-token`| POST   | Refresh access token              |
| `/api/auth/validate`     | GET    | Validate JWT token                |
| `/api/auth/google`       | POST   | Login/Register using Google OAuth |

```md
> All responses follow:
{
  "status": true,
  "message": "Success message",
  "data": [ ... ]
}
```

## 📂 Folder Structure
```text
mini-job-board/
├── client/                  # React frontend
│   ├── public/              # Static files like index.html, images, fonts
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── constants/       # App constants, page configs
│   │   ├── context/         # React Contexts (UserContext, AlertContext, etc.)
│   │   ├── functions/       # API calls (fetchAllJobs, createJob, etc.)
│   │   └── utils/           # Utility functions (spinner, toast config, helpers)
│   ├── package.json
│   └── .env                 # React environment variables
├── server/                  # Express backend
│   ├── config/              # Database and Redis configuration
│   ├── controllers/         # Route controllers (jobs, locations, auth, applications)
│   ├── middleware/          # Middleware (auth, validators, error handlers)
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes (jobRoutes, locationRoutes, authRoutes, applicationRoutes)
│   ├── utils/               # Helper functions (Redis cache wrapper, etc.)
│   ├── server.js            # Server entry point
│   ├── package.json
│   └── .env                 # Server environment variables
├── .gitignore
└── README.md
```

## ⚙️ Setup Instructions

## 1️⃣ Clone the Repository
```bash Copy
git clone https://github.com/aman5873/mini-job-board.git
cd mini-job-board
```

## 2️⃣ Backend Setup
```bash Copy
cd server
npm install
```

### 🔧 Server Environment Variables

Create a `.env` file inside the `/server` folder with the following content:

```env
PORT=5050                       # Port number for the backend server
MONGO_USER="<username>"          # MongoDB username
MONGO_PASS="<password>"          # MongoDB password
MONGO_DB="db"                    # MongoDB database name

# Full MongoDB connection URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/jobboard
                                

REDIS_TTL=2592000                # Redis cache TTL in seconds (30 days)
REDIS_URL="REDIS_URL"            # Redis server URL (optional, fallback to DB if not set)

CLIENT_URL=http://localhost:3000 # URL of the frontend client
JWT_SECRET="JWT_SECRET"          # Secret for signing JWT access tokens
JWT_REFRESH_SECRET="JWT_RF_SEC"  # Secret for signing JWT refresh tokens
                                
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

### 🔧 Client Environment Variables

Create a `.env` file inside the `/client` folder with the following content:

```env
# URL of the backend API
REACT_APP_API_HOST=http://localhost:5050

# Google OAuth client ID for login
REACT_APP_GOOGLE_CLIENT_ID=REACT_APP_GOOGLE_CLIENT_ID  

# Optional: Facebook App ID for login             
REACT_APP_FACEBOOK_APP_ID=REACT_APP_FACEBOOK_APP_ID   
```

#### Then start the React app : Frontend will run at http://localhost:3000
``` bash Copy
npm start
```

## 🚀 Deployment
```text
- Frontend : Vercel
- Backend  : Render.com
- Database : MongoDB Atlas
- Optional Caching : Redis (can be hosted on Redis Cloud, AWS ElastiCache, or local)
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




