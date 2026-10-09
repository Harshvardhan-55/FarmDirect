const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Please sign in to continue" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("role");
    if (!user) return res.status(401).json({ message: "Your account is no longer available. Please sign in again." });
    req.user = { id: String(user._id), role: user.role };
    return next();
  }
  catch { return res.status(401).json({ message: "Your session has expired. Please sign in again." }); }
};

exports.requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user.role) ? next() : res.status(403).json({ message: "You do not have permission for this action" });
