import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
