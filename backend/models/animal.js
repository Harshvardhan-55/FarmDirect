const mongoose = require("mongoose");
module.exports = mongoose.model("Animal", new mongoose.Schema({
  name: { type: String, required: true, trim: true }, type: { type: String, required: true, trim: true }, breed: { type: String, required: true, trim: true },
  age: { type: String, required: true }, gender: { type: String, required: true }, weight: { type: String, required: true }, health: { type: String, required: true }, vaccinated: { type: Boolean, default: false },
  price: { type: Number, required: true, min: 0 }, location: { type: String, required: true, trim: true }, image: { type: String, default: "" }, description: { type: String, required: true, trim: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true }));
