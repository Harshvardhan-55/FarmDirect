import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMyAccount } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AccountSettings() {
  const { user, logout } = useAuth(), navigate = useNavigate();
  const [password, setPassword] = useState(""), [error, setError] = useState(""), [loading, setLoading] = useState(false);
  const submit = async (event) => { event.preventDefault(); if (!window.confirm("Delete your FarmDirect account and associated listings and order history? This cannot be undone.")) return; setLoading(true); setError(""); try { await deleteMyAccount(password); logout(); navigate("/", { replace: true }); } catch (e) { setError(e.message); } finally { setLoading(false); } };
  return <section className="container-page py-12"><div className="mx-auto max-w-2xl"><p className="font-semibold text-farm-600">Account</p><h1 className="section-title mt-1">Account settings</h1><div className="card mt-7 p-6"><h2 className="text-lg font-bold">Your profile</h2><p className="mt-2 text-slate-600">{user?.name} · {user?.email} · {user?.role}</p></div><div className="mt-7 rounded-2xl border border-red-200 bg-white p-6"><h2 className="text-lg font-bold text-red-700">Delete account</h2><p className="mt-2 text-sm text-slate-600">This permanently deletes your account, your product listings, and (for buyers) your order history. Confirm with your password.</p>{error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row"><input className="input flex-1" type="password" required autoComplete="current-password" placeholder="Confirm your password" value={password} onChange={e => setPassword(e.target.value)}/><button disabled={loading} className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Deleting…" : "Delete my account"}</button></form></div></div></section>;
}
