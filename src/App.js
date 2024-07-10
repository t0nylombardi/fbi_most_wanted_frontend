import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
function AppContent() {
    const { isLoggedIn, logout, user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
        else {
            navigate("/login");
        }
    }, [isLoggedIn]);
    return (_jsxs(_Fragment, { children: [isLoggedIn ? (_jsx(NavBar, { logout: logout, isLoggedIn: isLoggedIn, user: user })) : (_jsx(Navigate, { to: "/login" })), _jsx(Outlet, {})] }));
}
function App() {
    return (_jsx(AuthProvider, { children: _jsx(AppContent, {}) }));
}
export default App;
