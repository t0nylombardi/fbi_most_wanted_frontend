import React, { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import { AuthProvider, useAuth } from "./hooks/AuthContext";

function AppContent() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? <NavBar logout={logout} isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />}
      <Outlet />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
