import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('farmdirect_user') || 'null'));

  const login = (userData) => {
    const account = userData.user || userData;
    setUser(account);
    localStorage.setItem('farmdirect_user', JSON.stringify(account));
    if (userData.token) localStorage.setItem('farmdirect_token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmdirect_user');
    localStorage.removeItem('farmdirect_token');
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('farmdirect_user', JSON.stringify(userData));
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};

export default AuthContext;
