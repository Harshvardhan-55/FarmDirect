import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Animals from './pages/Animals';
import AnimalDetails from './pages/AnimalDetails';
import Farmers from './pages/Farmers';
import FarmerProfile from './pages/FarmerProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import AddProduct from './pages/AddProduct';
import AccountSettings from './pages/AccountSettings';

function RoleRoute({ roles, children }) {
  const { user } = useAuth();
  return roles.includes(user?.role) ? children : <Navigate to="/login" replace />;
}

import FarmerDashboard from './dashboards/FarmerDashboard';
import BuyerDashboard from './dashboards/BuyerDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Routes>

              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />

              {/* Animals */}
              <Route path="/animals" element={<Animals />} />
              <Route path="/animals/:id" element={<AnimalDetails />} />

              {/* Farmers */}
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/farmers/:id" element={<FarmerProfile />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Shopping */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* User Pages */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/messages" element={<Messages />} />

              {/* Dashboards */}
              <Route
                path="/dashboard/farmer"
                element={<RoleRoute roles={["farmer"]}><FarmerDashboard /></RoleRoute>}
              />

              <Route
                path="/dashboard/buyer"
                element={<RoleRoute roles={["buyer"]}><BuyerDashboard /></RoleRoute>}
              />

              <Route
                path="/dashboard/admin"
                element={<RoleRoute roles={["admin"]}><AdminDashboard /></RoleRoute>}
              />

              {/* Farmer Products */}
              <Route
                path="/farmer/products/add"
                element={<RoleRoute roles={["farmer"]}><AddProduct /></RoleRoute>}
              />
              <Route path="/account" element={<RoleRoute roles={["buyer", "farmer"]}><AccountSettings /></RoleRoute>} />

              {/* 404 - Keep this last */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
