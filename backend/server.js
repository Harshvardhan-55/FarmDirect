const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/animals", require("./routes/animalRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
  res.json({
    message: "FarmDirect API is running",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    // Bootstrap the first administrator from private environment settings.
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
      const existingAdmin = await User.findOne({ email });
      if (!existingAdmin) {
        await User.create({ name: process.env.ADMIN_NAME || "FarmDirect Admin", email, password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12), role: "admin" });
        console.log("Initial FarmDirect administrator created");
      } else if (existingAdmin.role !== "admin") {
        console.warn("ADMIN_EMAIL belongs to a non-admin account; administrator was not changed");
      }
    }

    app.listen(PORT, () => {
      console.log(`FarmDirect server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
