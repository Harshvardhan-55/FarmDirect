const API_URL = "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("farmdirect_token");
};

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};

// ==========================================
// PRODUCTS
// ==========================================

export const getProducts = () => {
  return request("/products");
};

export const getProduct = (id) => {
  return request(`/products/${id}`);
};

export const getMyProducts = () => {
  return request("/products/farmer/my-products");
};

export const createProduct = (product) => {
  return request("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
};

export const updateProduct = (id, product) => {
  return request(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
};

export const deleteProduct = (id) => {
  return request(`/products/${id}`, {
    method: "DELETE",
  });
};

export const loginUser = (credentials) => request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
export const registerUser = (details) => request("/auth/register", { method: "POST", body: JSON.stringify(details) });
export const getFarmers = () => request("/auth/farmers");
export const getFarmer = (id) => request(`/auth/farmers/${id}`);
export const deleteMyAccount = (password) => request("/auth/me", { method: "DELETE", body: JSON.stringify({ password }) });
export const getAdminUsers = () => request("/auth/admin/users");
export const adminDeleteUser = (id) => request(`/auth/admin/users/${id}`, { method: "DELETE" });
export const getAdminProducts = () => request("/products/admin/all");
export const adminDeleteProduct = (id) => request(`/products/${id}/admin`, { method: "DELETE" });
export const getAnimals = () => request("/animals");
export const getAnimal = (id) => request(`/animals/${id}`);
export const createOrder = (order) => request("/orders", { method: "POST", body: JSON.stringify(order) });
export const getMyOrders = () => request("/orders/my");
export const getAdminOrders = () => request("/orders/admin/all");
export const getIncomingOrders = () => request("/orders/farmer/incoming");
export const updateOrderItemStatus = (orderId, itemId, status) => request(`/orders/${orderId}/items/${itemId}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
