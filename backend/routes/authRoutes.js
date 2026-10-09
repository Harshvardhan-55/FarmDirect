const express = require("express");

const {
  register,
  login,
  getFarmers,
  getFarmerById,
  deleteAccount,
  adminUsers,
  adminDeleteUser,
} = require("../controllers/authController");
const { requireAuth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.delete("/me", requireAuth, deleteAccount);
router.get("/admin/users", requireAuth, requireRole("admin"), adminUsers);
router.delete("/admin/users/:id", requireAuth, requireRole("admin"), adminDeleteUser);

router.get("/farmers", getFarmers);

router.get("/farmers/:id", getFarmerById);

module.exports = router;
