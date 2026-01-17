Overview

GigFlow is a full-stack freelance marketplace where:

Clients can post gigs and hire freelancers

Freelancers can bid on gigs

Clients can view bids and hire a freelancer

Freelancers receive real-time notifications when hired

Tech Stack
Frontend

React

Redux Toolkit

React Router

Tailwind CSS

Axios

Socket.io-client

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Socket.io

Features Implemented
Authentication

User registration (Client / Freelancer)

Login with JWT

Role-based access control

Gigs

Create Gig (Client)

View all gigs

View own gigs

Bidding

Freelancers can submit bids

Clients can view bids on their gigs

Client can hire only one freelancer per gig

Hiring Flow

Hiring a freelancer automatically:

Marks the gig as assigned

Rejects other bids

Sends real-time notification to hired freelancer

Real-Time Notifications

Freelancer dashboard shows:

"You have been hired for [Project Name]!"

No page refresh required (Socket.io)

Folder Structure (Important)
frontend/
 ├─ src/
 │  ├─ components/
 │  ├─ pages/
 │  ├─ redux/
 │  │   └─ slices/
 │  ├─ api/
 │  └─ socket.js

backend/
 ├─ controllers/
 ├─ routes/
 ├─ models/
 ├─ socket/
 ├─ middleware/
 └─ server.js

Environment Variables
.env.example (MANDATORY)

Create this file in both frontend and backend

Backend .env.example
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

Frontend .env.example
VITE_API_URL=http://localhost:5000/api


⚠️ Do NOT upload real secrets
Only placeholders.

How to Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Demo Credentials (Optional but Recommended)
Client
Email: client@test.com
Password: 123456

Freelancer
Email: freelancer@test.com
Password: 123456

Hiring Flow (Step-by-Step)

Client logs in

Client creates a gig

Freelancer logs in

Freelancer places a bid

Client views bids

Client clicks Hire

Freelancer instantly receives notification:

"You have been hired for [Gig Title]"

Known Limitations

No payment integration

No chat system

UI optimized for functionality over design

Future Improvements

Payments (Stripe)

Chat between client & freelancer

Email notifications

Profile ratings