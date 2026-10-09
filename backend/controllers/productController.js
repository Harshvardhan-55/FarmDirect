const mongoose = require("mongoose");
const Product = require("../models/product");
const fields = ["name", "category", "description", "price", "quantity", "unit", "location", "image", "organic", "harvestDate"];
const validId = (id) => mongoose.Types.ObjectId.isValid(id);
const sanitize = (body) => Object.fromEntries(fields.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));

exports.list = async (_req, res) => {
  try { res.json({ products: await Product.find().populate("farmer", "name").sort({ createdAt: -1 }) }); }
  catch { res.status(500).json({ message: "Could not load products" }); }
};
exports.getOne = async (req, res) => {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Product not found" });
  const product = await Product.findById(req.params.id).populate("farmer", "name");
  return product ? res.json({ product }) : res.status(404).json({ message: "Product not found" });
};
exports.mine = async (req, res) => res.json({ products: await Product.find({ farmer: req.user.id }).sort({ createdAt: -1 }) });
exports.create = async (req, res) => {
  try { const product = await Product.create({ ...sanitize(req.body), farmer: req.user.id }); res.status(201).json({ product }); }
  catch (error) { res.status(400).json({ message: error.message }); }
};
exports.update = async (req, res) => {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Product not found" });
  const product = await Product.findOneAndUpdate({ _id: req.params.id, farmer: req.user.id }, sanitize(req.body), { new: true, runValidators: true });
  return product ? res.json({ product }) : res.status(404).json({ message: "Product not found or not owned by you" });
};
exports.remove = async (req, res) => {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Product not found" });
  const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user.id });
  return product ? res.json({ message: "Product removed" }) : res.status(404).json({ message: "Product not found or not owned by you" });
};
exports.adminList = async (_req, res) => {
  try { res.json({ products: await Product.find().populate("farmer", "name email").sort({ createdAt: -1 }) }); }
  catch { res.status(500).json({ message: "Could not load products" }); }
};
exports.adminRemove = async (req, res) => {
  if (!validId(req.params.id)) return res.status(404).json({ message: "Product not found" });
  const product = await Product.findByIdAndDelete(req.params.id);
  return product ? res.json({ message: "Product removed" }) : res.status(404).json({ message: "Product not found" });
};
