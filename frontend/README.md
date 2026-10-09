# FarmDirect Frontend

A React + Vite + Tailwind CSS marketplace for farmers and buyers.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown by Vite, normally `http://localhost:5173`.

## Build

```bash
npm run build
```

## Backend setup

In `../backend`, copy `.env.example` to `.env`. Set `MONGO_URI`, a long random `JWT_SECRET`, and a strong private `ADMIN_PASSWORD` with the administrator `ADMIN_EMAIL`, then run:

```bash
npm install
npm run dev
```

The application intentionally starts with no seeded products, livestock, users, or orders. Register a farmer account to create the first product listing, then register a buyer to place orders.

The first administrator account is created from `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` when the backend starts. Keep these values private. Public registration can only create buyer and farmer accounts. Administrators sign in from the regular login page and can remove platform accounts and product listings.

## Current feature gaps

- Messaging is a placeholder screen; conversations are not stored or sent.
- UPI and card checkout records a pending payment; no payment provider is connected.
- Livestock listings can be created, but farmers cannot edit or remove them in the current app.
- Farmer verification and listing reports are not implemented as workflows.
