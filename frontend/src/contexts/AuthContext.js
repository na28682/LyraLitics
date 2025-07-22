import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: false,
    instagram: false,
    twitter: false,
    youtube: false
  });

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem('lyralytics_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem('lyralytics_token');
        }
      } catch (error) {
        localStorage.removeItem('lyralytics_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem('lyralytics_token', userData.token);
  };

  const logout = () => {
    setUser(null);
    setConnectedAccounts({
      google: false,
      instagram: false,
      twitter: false,
      youtube: false
    });
    localStorage.removeItem('lyralytics_token');
  };

  const updateConnectedAccounts = (accounts) => {
    setConnectedAccounts(prev => ({ ...prev, ...accounts }));
  };

  const value = {
    user,
    login,
    logout,
    connectedAccounts,
    updateConnectedAccounts,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 