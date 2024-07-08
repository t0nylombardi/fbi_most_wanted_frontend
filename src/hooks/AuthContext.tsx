import React, { createContext, useContext, useState } from "react";
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

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (username: string, password: string): Promise<void> => {
    const response = await userAuth.login(username, password);
    if (response.success && response.user) {
      setIsLoggedIn(true);
      setUser(response.user);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(response.user));
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
