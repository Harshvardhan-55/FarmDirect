import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/api";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    unit: "kg",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      setSuccess("Product added successfully!");

      setTimeout(() => {
        navigate("/dashboard/farmer");
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page py-10">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-black">
            Add New Product
          </h1>

          <p className="mt-2 text-slate-500">
            Sell your farm products directly to buyers.
          </p>
        </div>

        <div className="card p-6 sm:p-8">

          {error && (
            <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-lg bg-green-50 p-4 text-green-600">
              {success}
            </div>
          )}

          <form
            onSubmit={submit}
            className="space-y-5"
          >

            {/* Product Name */}
            <div>
              <label className="mb-2 block font-semibold">
                Product Name
              </label>

              <input
                className="input"
                name="name"
                placeholder="Example: Wheat"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block font-semibold">
                Category
              </label>

              <select
                className="input"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select category
                </option>

                <option value="Grains">
                  Grains
                </option>

                <option value="Vegetables">
                  Vegetables
                </option>

                <option value="Fruits">
                  Fruits
                </option>

                <option value="Dairy">
                  Dairy
                </option>

                <option value="Pulses">
                  Pulses
                </option>

                <option value="Spices">
                  Spices
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block font-semibold">
                Description
              </label>

              <textarea
                className="input min-h-32"
                name="description"
                placeholder="Describe your product..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price and Quantity */}
            <div className="grid gap-5 sm:grid-cols-3">

              <div>
                <label className="mb-2 block font-semibold">
                  Price
                </label>

                <input
                  className="input"
                  type="number"
                  min="0"
                  name="price"
                  placeholder="2500"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Quantity
                </label>

                <input
                  className="input"
                  type="number"
                  min="0"
                  name="quantity"
                  placeholder="100"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold">
                  Unit
                </label>

                <select
                  className="input"
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                >
                  <option value="kg">kg</option>
                  <option value="quintal">
                    Quintal
                  </option>
                  <option value="ton">
                    Ton
                  </option>
                  <option value="piece">
                    Piece
                  </option>
                  <option value="liter">
                    Liter
                  </option>
                </select>
              </div>

            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block font-semibold">
                Location
              </label>

              <input
                className="input"
                name="location"
                placeholder="Village / City"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-2 block font-semibold">
                Product Image URL
              </label>

              <input
                className="input"
                type="url"
                name="image"
                placeholder="https://example.com/wheat.jpg"
                value={form.image}
                onChange={handleChange}
              />

              <p className="mt-2 text-xs text-slate-400">
                Image uploading can be added later.
              </p>
            </div>

            <div className="flex gap-3 pt-3">

              <button
                type="button"
                className="btn-secondary"
                onClick={() =>
                  navigate("/dashboard/farmer")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={loading}
              >
                {loading
                  ? "Adding Product..."
                  : "Add Product"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </section>
  );
}
