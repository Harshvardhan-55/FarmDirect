const router = require("express").Router(); const Animal = require("../models/animal"); const { requireAuth, requireRole } = require("../middleware/authMiddleware");
router.get("/", async (_req, res) => res.json({ animals: await Animal.find().populate("farmer", "name").sort({ createdAt: -1 }) }));
router.get("/:id", async (req, res) => { const animal = await Animal.findById(req.params.id).populate("farmer", "name").catch(() => null); return animal ? res.json({ animal }) : res.status(404).json({ message: "Animal not found" }); });
router.post("/", requireAuth, requireRole("farmer"), async (req, res) => { try { const animal = await Animal.create({ ...req.body, farmer: req.user.id }); res.status(201).json({ animal }); } catch (e) { res.status(400).json({ message: e.message }); } });
module.exports = router;
