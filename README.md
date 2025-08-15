# SkillBridge – Peer-to-Peer Skill Sharing Platform

SkillBridge is a MERN-inspired platform (React + Express + Postgresql) that
connects **mentors** and **learners** for skill sharing, bookings, and real-time
collaboration.

---

## 🚀 Features

### **For Learners**

- Register & login securely (JWT-based authentication)
- Browse skills offered by mentors
- Book sessions with mentors
- View booking history & status

### **For Mentors**

- Register & login securely
- Create, edit, and delete skill listings
- Manage learner bookings (approve, reject)

---

## 🛠 Tech Stack

**Backend**:

- Node.js
- Express.js
- Postgresql
- JWT Authentication
- Bcrypt (password hashing)
- CORS for cross-origin requests

**Frontend**:

- React.js (CRA)
- Cookies for token & role storage
- Axios for API calls

**Other**:

- Nodemon for development
- pg for DB connection

---

## 📂 Project Structure
### Backend

```
skillBridgeBackend/
|
├── server.js # Entry point
├── database.js # SQLite3 DB connection
├── routes/ # Route handlers (auth, skills, bookings)
├── models/ # SQL table definitions
├── middleware/ # Auth middleware (JWT verify)
├── controllers/ # Request/response logic
├── .env # Environment variables
├── package.json
|
```
### Frontend 
```
SKILLBRIDGE-Frontend/
│
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── EmptyView/
│   │   ├── learner/
│   │   │   ├── BookingItem
│   │   │   ├── ConfirmBooking
│   │   │   ├── LearnerBookings
│   │   │   ├── LearnerDashboard
│   │   │   ├── LearnerHeader
│   │   │   ├── LearnerProfile
│   │   │   └── SkillItem
│   │   │
│   │   ├── Login
│   │   ├── mentor/
│   │   │   ├── BookingItem
│   │   │   ├── ConfirmBooking
│   │   │   ├── MentorBookings
│   │   │   ├── MentorDashboard
│   │   │   ├── MentorHeader
│   │   │   ├── MentorProfile
│   │   │   └── SkillManagement
│   │   ├── NotFound
│   │   ├── ProtectedRoute
│   │   ├── Signup
│   │   ├── ToasterComponent
│   │   └── withNavigation
│   │
│   ├── utils/
│   │   ├── api.js
│   │   └── auth.js
│   │
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## 📋 API Endpoints

### **Auth**

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/register` | Register new user |
| POST   | `/login`    | Login user        |

### **Skills**

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| POST   | `/skills`     | Create new skill (mentor only) |
| GET    | `/skills`     | List all skills                |
| PATCH  | `/skills/:id` | Update skill (mentor only)     |
| DELETE | `/skills/:id` | Delete skill (mentor only)     |

### **Bookings**

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/bookings`     | Book a skill session   |
| GET    | `/bookings`     | List bookings for user |
| PUT    | `/bookings/:id` | Update booking status  |

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
backend URL <https://github.com/tejamajeti/skillBridgeBackend.git>

git clone <repo_url>

cd skillBridgeBackend
```

### 2️⃣ Install dependencies

```bash
npm install i
```

### 3️⃣ Set environment variables

Create a .env file:

```ini
JWT_SECRET = your_secret_key

PORT = 5000

DATABASE_URL = database_connection_url
```

### 4️⃣ Start the server

```bash
npm run dev
```

### 4️⃣ Start Frontend

```bash
npm run start
```

## 🔒 Authentication

- JWT-based authentication

- Tokens & roles are stored in cookies

- All protected routes require Authorization: Bearer <token>

## 📌 Future Features

- Real-time mentor–learner chat (Socket.io)

- Payment integration

- Review & rating system

- Profile pictures & file uploads
