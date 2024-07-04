// src/hooks/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { userAuth } from "../services/endpoints";
import { User } from "../services/types";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState ? JSON.parse(savedState) : false;
  });

  const login = async (username: string, password: string): Promise<void> => {
    console.log("login");
    const response = await userAuth.login(username, password);
    if (response.success) {
      // assuming response has a success property
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    // Any additional setup can go here
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
