'use client'

import { useRouter } from "next/navigation"
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem('token');
      const storedUserType = localStorage.getItem('userType');
      
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }
      
      if (storedUserType) {
        setUserType(storedUserType);
      }
      
      setLoading(false);
    }
  }, []);

  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setIsAuthenticated(true);
    }
  };

  const handleSetUserType = (userTypeBoolean) => {
    const mappedUserType = userTypeBoolean ? "organization" : "volunteer";
    localStorage.setItem('userType', mappedUserType);
    setUserType(mappedUserType);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setToken(null);
    setIsAuthenticated(false);
    setUserType("")
    router.push("/")
  };

  const value = {
    token,
    loading,
    setToken: handleSetToken,
    userType,
    setUserType: handleSetUserType,
    isAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
