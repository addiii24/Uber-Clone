# 🚗 Uber Clone — Full Stack Ride Booking Application

A full-featured, real-time Uber-like ride-booking application built with a **React (Vite)** frontend and an **Express.js + MongoDB** backend. Supports live GPS tracking, socket-based real-time communication, OTP email verification for registration, and complete profile management for both users and captains.

---

## 📁 Project Structure

```
New-Project/
├── Backend/                  # Express.js REST API
│   ├── app.js                # Express app setup (CORS, routes, middleware)
│   ├── server.js             # HTTP + Socket.IO server entry point
│   ├── socket.js             # Socket.IO event handlers
│   ├── controller/           # Route handler functions
│   │   ├── user.controller.js
│   │   ├── captain.controller.js
│   │   ├── ride.controller.js
│   │   └── map.controller.js
│   ├── routes/               # API route definitions
│   │   ├── user.routes.js
│   │   ├── captain.routes.js
│   │   ├── ride.routes.js
│   │   └── map.routes.js
│   ├── models/               # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── captain.model.js
│   │   ├── ride.model.js
│   │   ├── otp.model.js      # TTL-based OTP storage (5-min expiry)
│   │   └── blacklistToken.model.js
│   ├── services/             # Business logic
│   │   ├── user.service.js
│   │   ├── captain.service.js
│   │   ├── ride.service.js
│   │   ├── map.service.js
│   │   └── otp.service.js    # Nodemailer OTP generation & verification
│   ├── middleware/
│   │   ├── userauth.middleware.js     # JWT auth for users
│   │   └── captainauth.middleware.js  # JWT auth for captains
│   └── db/
│       └── db.js             # MongoDB connection
│
└── Frontend/                 # React + Vite SPA
    └── src/
        ├── App.jsx            # Routes
        ├── Context/
        │   ├── Usercontext.jsx
        │   ├── Captaincontext.jsx
        │   └── Socketiocontext.jsx
        ├── Pages/
        │   ├── Start.jsx
        │   ├── User/
        │   │   ├── Usersignup.jsx
        │   │   ├── Userlogin.jsx
        │   │   ├── Home.jsx
        │   │   ├── Riding.jsx
        │   │   ├── UserRideHistory.jsx
        │   │   ├── Userlogout.jsx
        │   │   └── Userprotectedwrapper.jsx
        │   └── Captain/
        │       ├── Captainsignup.jsx
        │       ├── Captainlogin.jsx
        │       ├── Captainhome.jsx
        │       ├── Captainriding.jsx
        │       └── Captainlogout.jsx
        └── Components/
            ├── UserProfilePanel.jsx
            ├── CaptainProfilePanel.jsx
            ├── VehiclePanel.jsx
            ├── Confrimride.jsx
            ├── Lookingforvehicle.jsx
            ├── Waitingfordriver.jsx
            ├── Ridepopup.jsx
            ├── Confirmridepopup.jsx
            ├── Finishride.jsx
            ├── Captaindetails.jsx
            └── Livetracking.jsx
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express.js v5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **Socket.IO** | Real-time bidirectional communication |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Nodemailer** | OTP email delivery |
| **express-validator** | Request body validation |
| **cookie-parser** | Cookie-based token handling |
| **Axios** | HTTP requests to Google Maps API |
| **nodemon** | Development auto-restart |
| **dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| **React 18 + Vite** | UI framework & bundler |
| **React Router v6** | Client-side routing |
| **Axios** | API communication |
| **Socket.IO Client** | Real-time socket communication |
| **GSAP + @gsap/react** | Panel animations |
| **Google Maps JS API** | Live map, routing, geocoding |
| **Tailwind CSS** | Utility-first styling |

---

## ⚙️ Environment Variables

### Backend — `Backend/.env`
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API=your_google_maps_api_key
EMAIL_USER=zxy31852@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

### Frontend — `Frontend/.env`
```env
VITE_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repo-url>
cd New-Project
```

### 2. Start the Backend
```bash
cd Backend
npm install
npx nodemon
# Runs on http://localhost:3000
```

### 3. Start the Frontend
```bash
cd Frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 📡 API Reference

### Base URL: `http://localhost:3000/api`

---

### 👤 Users — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login and receive JWT token |
| `GET` | `/profile` | ✅ | Get authenticated user's profile |
| `POST` | `/logout` | ✅ | Logout and blacklist token |
| `PUT` | `/update-profile` | ✅ | Update name, email, mobile |
| `DELETE` | `/delete-account` | ✅ | Permanently delete account |
| `POST` | `/send-otp` | ❌ | Send 6-digit OTP to email |
| `POST` | `/verify-otp` | ❌ | Verify the OTP for email confirmation |

#### `POST /users/register`
```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john@example.com",
  "password": "secret123",
  "mobile": "9876543210"
}
```

#### `PUT /users/update-profile`
```json
{
  "firstname": "John",
  "lastname": "Smith",
  "email": "john@example.com",
  "mobile": "9876543210"
}
```

---

### 🚖 Captains — `/api/captains`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | ❌ | Register a new captain |
| `POST` | `/login` | ❌ | Login captain |
| `GET` | `/profile` | ✅ | Get captain profile |
| `POST` | `/logout` | ✅ | Logout captain |
| `PUT` | `/update-profile` | ✅ | Update personal & vehicle info |
| `DELETE` | `/delete-account` | ✅ | Delete captain account |

#### `POST /captains/register`
```json
{
  "fullname": { "firstname": "Jane", "lastname": "Driver" },
  "email": "jane@example.com",
  "password": "secret123",
  "mobile": "9876543210",
  "vehicle": {
    "color": "Black",
    "plate": "DL 01 AB 1234",
    "capacity": 4,
    "vehicletype": "car"
  }
}
```

#### `PUT /captains/update-profile`
```json
{
  "firstname": "Jane",
  "lastname": "Driver",
  "email": "jane@example.com",
  "mobile": "9876543210",
  "vehicleColor": "White",
  "vehiclePlate": "DL 01 AB 1234",
  "vehicleCapacity": 4,
  "vehicleType": "car"
}
```

---

### 🚕 Rides — `/api/ride`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/create` | User ✅ | Create a new ride request |
| `GET` | `/get-fare` | User ✅ | Calculate fare for a route |
| `POST` | `/confirm` | Captain ✅ | Captain confirms a ride |
| `GET` | `/start-ride` | Captain ✅ | Start ride (OTP verified) |
| `POST` | `/end-ride` | Captain ✅ | End the ride |
| `GET` | `/history` | User ✅ | Get user's ride history |

#### `POST /ride/create`
```json
{
  "pickup": "Connaught Place, New Delhi",
  "destination": "IGI Airport, New Delhi",
  "vehicleType": "car"
}
```

#### `GET /ride/get-fare`
```
?pickup=Connaught+Place&destination=IGI+Airport
```

#### `GET /ride/start-ride`
```
?rideId=<ride_id>&otp=<4-digit-otp>
```

---

### 🗺️ Maps — `/api/map`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/get-coordinates` | User ✅ | Convert address → lat/lng |
| `GET` | `/get-distance-time` | User ✅ | Distance & duration between two places |
| `GET` | `/get-suggestions` | User ✅ | Autocomplete address suggestions |

#### `GET /map/get-suggestions`
```
?input=Connaught
```

---

## 🔌 Socket.IO Events

### Client → Server
| Event | Payload | Description |
|---|---|---|
| `join` | `{ userId, userType }` | Register socket with user/captain ID |
| `update-location-captain` | `{ userId, location: { ltd, lng } }` | Captain broadcasts live GPS location |

### Server → Client
| Event | Payload | Description |
|---|---|---|
| `new-ride` | Ride object | Sent to nearby captains when a ride is created |
| `ride-confirmed` | Ride object with captain | Sent to user when captain accepts |
| `ride-started` | Ride object | Sent to user when OTP is verified |
| `captain-location` | `{ location: { ltd, lng } }` | Captain's live location sent to user |
| `ride-ended` | Ride object | Sent to user when ride is finished |

---

## 🔐 Authentication

- **Users**: JWT stored in an `HttpOnly` cookie and `localStorage` (`token`)
- **Captains**: JWT stored in `localStorage` (`captain-token`)
- **Token Blacklisting**: Logged-out / deleted-account tokens are stored in `blacklistToken` collection and rejected on future requests
- **OTP Expiry**: OTPs are stored in MongoDB with a **5-minute TTL index** and deleted on successful verification

---

## 📱 Frontend Routes

| Path | Component | Auth | Description |
|---|---|---|---|
| `/` | `Start` | ❌ | Landing page |
| `/login` | `Userlogin` | ❌ | User login |
| `/signup` | `Usersignup` | ❌ | User registration with OTP |
| `/home` | `Home` | ✅ User | Ride booking home |
| `/riding` | `Riding` | ✅ User | Active ride tracking screen |
| `/user/rides` | `UserRideHistory` | ✅ User | User ride history |
| `/user/logout` | `Userlogout` | ✅ User | Logout redirect |
| `/captain-signup` | `Captainsignup` | ❌ | Captain registration with OTP |
| `/captain-login` | `Captainlogin` | ❌ | Captain login |
| `/captain-home` | `Captainhome` | ✅ Captain | Captain dashboard |
| `/captain-riding` | `Captainriding` | ✅ Captain | Active ride management |
| `/captain-logout` | `Captainlogout` | ✅ Captain | Logout redirect |

---

## ✨ Key Features

### 🧑 User Features
- **Email OTP Verification** during registration
- **Live ride booking** with vehicle type selection (Car, Auto, Bike)
- **Real-time captain tracking** on an interactive Google Map
- **Live ETA** calculated dynamically from captain's GPS position
- **Ride History** — view all past rides with captain details and fare
- **Profile Panel** — view/edit name, email, mobile; logout; delete account

### 🚖 Captain Features
- **Email OTP Verification** during registration
- **Real-time ride requests** via Socket.IO push notifications
- **OTP-based ride start** (passenger shows OTP, captain enters it)
- **Live location broadcasting** to users every 10 seconds
- **Ride completion** with distance/earnings tracking
- **Profile Panel** — view/edit personal & vehicle info; logout; delete account

### 🔒 Security
- HttpOnly cookie + localStorage dual token strategy
- Token blacklisting on logout/account deletion
- MongoDB TTL-based OTP expiry (5 minutes)
- Express Validator for all input sanitization
- Passwords hashed with bcryptjs (10 salt rounds)

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss proposed changes.

---

## 📄 License

This project is for educational/portfolio purposes.
