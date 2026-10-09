import React from 'react';
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, X, Sprout, LogOut, Settings } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navItems = [
  ["/", "Home"],
  ["/products", "Products"],
  ["/animals", "Animals"],
  ["/farmers", "Farmers"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount: count } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dashboard = user?.role === "admin" ? "/dashboard/admin" : user?.role === "farmer" ? "/dashboard/farmer" : "/dashboard/buyer";
  const signOut = () => { logout(); setOpen(false); navigate("/"); };

  const linkClass = ({ isActive }) =>
    `transition ${isActive ? "font-semibold text-farm-700" : "text-slate-600 hover:text-farm-700"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-farm-700">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-farm-100">
            <Sprout size={22} />
          </span>
          FarmDirect
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([path, label]) => (
            <NavLink key={path} to={path} className={linkClass}>{label}</NavLink>
          ))}
          {isAuthenticated && <NavLink to={dashboard} className={linkClass}>Dashboard</NavLink>}
          {user?.role === "buyer" && <NavLink to="/orders" className={linkClass}>My Orders</NavLink>}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/cart" className="relative rounded-xl p-2 text-slate-600 hover:bg-farm-50">
            <ShoppingCart size={21} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-farm-600 px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          {isAuthenticated ? <><Link to={dashboard} className="btn-secondary py-2.5"><User size={17} className="mr-2" />{user?.name}</Link><Link to="/account" aria-label="Account settings" className="rounded-xl p-2 text-slate-600 hover:bg-farm-50"><Settings size={19}/></Link><button onClick={signOut} className="btn-secondary py-2.5"><LogOut size={17} className="mr-2"/>Logout</button></> : <Link to="/login" className="btn-primary py-2.5"><User size={17} className="mr-2"/>Login</Link>}
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-xl p-2 md:hidden" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white p-4 md:hidden">
          <div className="container-page flex flex-col gap-4">
            {navItems.map(([path, label]) => (
              <NavLink key={path} to={path} onClick={() => setOpen(false)} className={linkClass}>{label}</NavLink>
            ))}
            {isAuthenticated && <NavLink to={dashboard} onClick={() => setOpen(false)} className={linkClass}>Dashboard</NavLink>}
            {user?.role === "buyer" && <NavLink to="/orders" onClick={() => setOpen(false)} className={linkClass}>My Orders</NavLink>}
            <Link to="/cart" onClick={() => setOpen(false)} className="btn-secondary">Cart ({count})</Link>
            {isAuthenticated ? <><Link to={dashboard} onClick={() => setOpen(false)} className="btn-secondary">{user?.name}</Link><Link to="/account" onClick={() => setOpen(false)} className="btn-secondary">Account settings</Link><button onClick={signOut} className="btn-primary"><LogOut size={17} className="mr-2"/>Logout</button></> : <Link to="/login" onClick={() => setOpen(false)} className="btn-primary">Login</Link>}
          </div>
        </div>
      )}
    </header>
  );
}
