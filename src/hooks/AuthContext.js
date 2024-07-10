import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { userAuth } from "../services/endpoints";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedState = localStorage.getItem("isLoggedIn");
        return savedState ? JSON.parse(savedState) : false;
    });
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const login = async (username, password) => {
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
        localStorage.removeItem("user");
    };
    return (_jsx(AuthContext.Provider, { value: { isLoggedIn, login, logout, user }, children: children }));
};
export { AuthContext };
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
