import React, { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div>
        <h2 className="mt-10 text-center text-6xl font-bold leading-9 tracking-tight text-jungle-green-500">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-2xl font-medium leading-6 text-jungle-green-500"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.username}
                autoComplete="username"
                placeholder="rickastley"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-2xl font-medium leading-6 text-jungle-green-500"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={formData.password}
                autoComplete="current-password"
                placeholder="nevergonnagiveyouup"
              />
            </div>
          </div>

          <div className="flex justify-center w-full shadow-sm ">
            <button
              type="submit"
              className="btnw-full bg-gradient-to-tr from-chilean-fire-500 to-cedar-wood-finish-600 hover:bg-gradient-to-bl  text-white font-bold py-2 px-4 mt-4 mx-8"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-lg font-medium leading-6 text-gray-500">
          Username & Password
          <p className="pt-4">rickastley</p>
          <p className="p-2">nevergonnagiveyouup</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
