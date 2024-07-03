import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-800">
      <h1 className="text-[12rem] font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-chilean-fire-500 text-gray-800 px-2 text-4xl rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-lg font-medium text-chilean-fire-500 group active:text-chilean-fire-600 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-chilean-fire-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-gray-800 border border-current">
            <NavLink to="/">Go Home</NavLink>
          </span>
        </div>
      </button>
    </main>
  );
};

export default ErrorPage;
