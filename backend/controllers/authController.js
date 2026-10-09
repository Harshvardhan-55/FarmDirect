const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      // Public sign-up must never grant administrative privileges.
      role: req.body.role === "farmer" ? "farmer" : "buyer",
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password))) {
      return res.status(401).json({ message: "Enter your password to delete your account" });
    }
    await Product.deleteMany({ farmer: user._id });
    await Order.deleteMany({ buyer: user._id });
    // Retain historical order snapshots while removing the deleted farmer's references.
    await Order.updateMany({ "items.farmer": user._id }, { $pull: { items: { farmer: user._id } } });
    await user.deleteOne();
    return res.json({ message: "Account deleted" });
  } catch (error) {
    console.error("DELETE ACCOUNT ERROR:", error);
    return res.status(500).json({ message: "Could not delete account" });
  }
};

const adminUsers = async (_req, res) => {
  const users = await User.find({ role: { $in: ["buyer", "farmer"] } }).select("-password").sort({ createdAt: -1 });
  res.json({ users });
};

const adminDeleteUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ message: "User not found" });
  if (String(req.params.id) === String(req.user.id)) return res.status(400).json({ message: "You cannot remove your own admin account here" });
  const user = await User.findOne({ _id: req.params.id, role: { $in: ["buyer", "farmer"] } });
  if (!user) return res.status(404).json({ message: "User not found" });
  await Product.deleteMany({ farmer: user._id });
  await Order.deleteMany({ buyer: user._id });
  await Order.updateMany({ "items.farmer": user._id }, { $pull: { items: { farmer: user._id } } });
  await user.deleteOne();
  res.json({ message: "User removed" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

const getFarmers = async (req, res) => {
  try {
    const farmers = await User.find({
      role: "farmer",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.json({
      farmers,
    });
  } catch (error) {
    console.error("GET FARMERS ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};



const getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("GET FARMER ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid farmer ID",
      });
    }

    const farmer = await User.findOne({
      _id: id,
      role: "farmer",
    }).select("-password");

    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    return res.status(200).json({
      farmer,
    });
  } catch (error) {
    console.error("GET FARMER ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  register,
  login,
  getFarmers,
  getFarmerById,
  deleteAccount,
  adminUsers,
  adminDeleteUser,
};
