# FarmDirect

FarmDirect is a web marketplace that connects farmers directly with buyers. Farmers can list products and livestock, while buyers can browse listings and place orders.

## Features

- Buyer and farmer registration and login
- Farmer profiles and directories
- Product listings with stock management
- Livestock listings
- Shopping cart and order placement
- Order views for buyers, farmers, and administrators
- Administrator tools for managing users and products

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens

## Requirements

- Node.js and npm
- A MongoDB database, local or hosted

## Run locally

### 1. Configure the backend

In a terminal, go to the backend folder and create your local environment file from the example:

```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend/.env` and set these values:

- `PORT` — backend port; defaults to `5000`
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — a long, random secret used to sign login tokens
- `ADMIN_NAME` — initial administrator's name
- `ADMIN_EMAIL` — initial administrator's email
- `ADMIN_PASSWORD` — initial administrator's password

Keep `backend/.env` private. Never commit it or share its values.

Install dependencies and start the backend:

```powershell
npm install
npm run dev
```

The API runs at `http://localhost:5000`. The backend connects to MongoDB when it starts. If the configured admin email does not already belong to an account, the backend creates the initial administrator account from the environment settings.

### 2. Start the frontend

Open a second terminal from the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints in the terminal. It is normally `http://localhost:5173`.

The frontend currently sends API requests to `http://localhost:5000/api`.

## Build the frontend

From the `frontend` folder, run:

```powershell
npm run build
```

Vite writes the production build to `frontend/dist/`. This generated folder does not need to be committed.

## Getting started in the app

Register a farmer account to create product or livestock listings. Register a buyer account to browse listings and place an order. Public registration supports buyer and farmer accounts; the initial administrator is configured through the backend environment variables.

## Current limitations

- Messaging is a placeholder; conversations are not stored or sent.
- UPI and card payments are not connected to a payment provider. Those orders remain pending; cash on delivery is also available.
- Livestock listings can be created, but the current app does not provide farmer editing or removal.
- Farmer verification and listing reports are not implemented as workflows.

## Repository contents

- `backend/` — Express API, MongoDB models, routes, and authentication
- `frontend/` — React application
- `backend/.env.example` — environment variable template with placeholder values
- `backend/.env` — local settings; keep this file out of Git