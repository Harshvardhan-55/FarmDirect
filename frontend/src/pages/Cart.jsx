import React from 'react';
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  if (!items.length) {
    return <section className="container-page py-20 text-center"><h1 className="text-3xl font-black">Your cart is empty</h1><p className="mt-2 text-slate-500">Add products from the marketplace to continue.</p><Link to="/products" className="btn-primary mt-6">Browse Products</Link></section>;
  }

  return (
    <section className="container-page py-12">
      <h1 className="section-title">Shopping cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div className="card flex gap-4 p-4" key={item._id || item.id}>
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-slate-500">₹{item.price}/{item.unit}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => updateQuantity(item._id || item.id, item.quantity - 1)} className="rounded-lg border p-1"><Minus size={15} /></button>
                  <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)} className="rounded-lg border p-1"><Plus size={15} /></button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                <button onClick={() => removeFromCart(item._id || item.id)} className="mt-4 text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
        <aside className="card h-fit p-6">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="mt-5 flex justify-between border-b pb-4"><span>Subtotal</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          <div className="mt-4 flex justify-between font-bold"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          <Link to="/checkout" className="btn-primary mt-6 w-full">Proceed to Checkout</Link>
        </aside>
      </div>
    </section>
  );
}
