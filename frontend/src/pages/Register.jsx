import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await registerUser(form);

      // Save user + JWT token
      login(data);

      // Redirect according to role
      if (data.user.role === "farmer") {
        navigate("/dashboard/farmer");
      } else {
        navigate("/dashboard/buyer");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page flex min-h-[75vh] items-center justify-center py-12">

      <div className="card w-full max-w-md p-7 sm:p-9">

        {/* Logo */}
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-farm-100 text-farm-700">
          <Sprout />
        </div>

        <h1 className="mt-5 text-center text-3xl font-black">
          Create your account
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          Join FarmDirect today.
        </p>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={submit}
          className="mt-7 space-y-4"
        >

          {/* Name */}
          <input
            className="input"
            type="text"
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          {/* Email */}
          <input
            className="input"
            type="email"
            required
            placeholder="Email address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          {/* Password */}
          <input
            className="input"
            type="password"
            required
            minLength={6}
            placeholder="Password (minimum 6 characters)"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          {/* Account type */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Account type
            </label>

            <select
              className="input"
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
                })
              }
            >
              <option value="buyer">
                Buyer
              </option>

              <option value="farmer">
                Farmer
              </option>
            </select>
          </div>

          {/* Submit */}
          <button
            className="btn-primary w-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login link */}
        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}

          <Link
            className="font-semibold text-farm-700"
            to="/login"
          >
            Login
          </Link>
        </p>

      </div>

    </section>
  );
}
