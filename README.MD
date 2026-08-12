# surplus-food-resQ

FoodResQ is a full-stack platform that helps restaurants, caterers, and event organizers donate surplus food to NGOs, reducing food waste and improving access to food.

## Overview

A significant amount of surplus food from restaurants can go to waste even when it is still suitable for consumption. Surplus Food Rescue provides a platform where restaurants can list their available surplus food and NGOs can claim, collect, and complete those donations.

The application implements role-based authentication and a complete donation lifecycle from creation to completion.

## Features

### Restaurant
* Register and login
* Create food donations
* View own donations
* Edit and delete donations
* Track donation status

### NGO
* Register and login
* View available donations
* Claim donations
* Mark donations as picked up
* Complete donations

### Authentication & Authorization
* JWT-based authentication
* Password hashing with bcrypt
* Role-based access control
* Restaurants can manage only their own donations
* Only the NGO that claimed a donation can pick it up or complete it

## Donation Lifecycle

```text
AVAILABLE → CLAIMED → PICKED_UP → COMPLETED
```

## Tech Stack

* Frontend: React, TypeScript, Vite
* Backend: Node.js, Express.js, TypeScript
* Database: PostgreSQL
* ORM: Prisma
* Authentication: JWT, bcrypt
* API: REST API
* Version Control: Git, GitHub

## Project Structure
```
surplus-food-resQ/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   └── prisma/
│
├── frontend/
│   └── src/
│       ├── pages/
│       ├── services/
│       └── components/
│
└── README.md
```
## Getting Started

### Prerequisites
* Node.js, npm, PostgreSQL
### Installation
Clone the repository:
```bash
git clone <REPOSITORY_URL>
cd surplus-food-resQ
```
### Backend Setup
``` 
cd backend
npm install
Create a `.env` file inside `backend` directory:
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-secret-key"
PORT=5000
Run database migrations: `npx prisma migrate dev`
Start backend server: `npm run dev`.
The backend will run on: `http://localhost:5000`
```
### Frontend Setup
```
cd frontend
npm install
npm run dev
The frontend will run on: `http://localhost:5173`
```
### Run the application
Make sure PostgreSQL, the backend server, and the frontend server are running.
Then open: `http://localhost:5173`








