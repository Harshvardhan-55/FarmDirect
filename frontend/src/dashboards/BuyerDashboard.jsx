import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";
import { getMyOrders } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => { getMyOrders().then(({ orders }) => setOrders(orders)).catch(() => {}); }, []);
  const pending = orders.filter((order) => order.status === "Processing").length;
  return <section className="container-page py-10"><p className="font-semibold text-farm-600">Buyer dashboard</p><h1 className="section-title mt-1">Welcome back, {user?.name || "Buyer"}</h1><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="card p-5"><Package className="text-farm-600" /><p className="mt-4 text-sm text-slate-500">Total Orders</p><p className="text-2xl font-black">{orders.length}</p></div><div className="card p-5"><ShoppingBag className="text-farm-600" /><p className="mt-4 text-sm text-slate-500">Pending</p><p className="text-2xl font-black">{pending}</p></div></div><div className="mt-8 grid gap-6 lg:grid-cols-2"><div className="card p-6"><h2 className="text-xl font-bold">Recent orders</h2>{orders.length ? <div className="mt-5 space-y-4">{orders.slice(0, 3).map((order) => <div className="flex justify-between border-b pb-4" key={order._id}><div><p className="font-semibold">{order.items.map((item) => item.name).join(", ")}</p><p className="text-sm text-slate-500">Order #{order._id.slice(-6).toUpperCase()}</p></div><span className="text-sm font-bold text-farm-700">{order.status}</span></div>)}</div> : <p className="mt-5 text-slate-500">No orders yet.</p>}<Link to="/orders" className="btn-secondary mt-5 w-full">View All Orders</Link></div><div className="card p-6"><h2 className="text-xl font-bold">Quick actions</h2><div className="mt-5 grid gap-3"><Link to="/products" className="btn-primary">Browse Products</Link><Link to="/animals" className="btn-secondary">Browse Animals</Link><Link to="/farmers" className="btn-secondary">Browse Farmers</Link></div></div></div></section>;
}
