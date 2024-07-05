import React from "react";
import { NavLink } from "react-router-dom";
import { User } from "../services/types";

type NavBarProps = {
  logout: () => void;
  isLoggedIn: boolean;
  user: User | null;
};

const NavBar = ({ logout, isLoggedIn, user }: NavBarProps) => {
  const links = [
    { title: "All Wanted", url: "/" },
    { title: "Cyber Crimes", url: "/cyber" },
    { title: "Missing Persons", url: "/missing-persons" },
    { title: "Violent Crims", url: "/violent-crimes" },
  ];

  return (
    <header>
      <nav role="navbar" className="px-[4rem]">
        <div className="flex flex-row items-center justify-around py-4 px-2">
          <div className="w-1/2">
            <h1 className="text-3xl">
              <a role="home" href="/" className="hover:text-cedar-wood-finish-400">
                FBI WANTED
              </a>
            </h1>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col justify-center p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0">
              {links.map((link, index) => (
                <li key={index} className="p-0 m-0">
                  <NavLink
                    to={link.url}
                    className={({ isActive, isPending }) =>
                      [isPending ? "btn-pending" : "", isActive ? "btn-active" : "btn"].join(" ")
                    }
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end items-center">
            {isLoggedIn ? (
              <>
                <div>
                  <NavLink
                    to="/profile"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-profile-button"
                  >
                    <img
                      data-testid="user-image"
                      role="img"
                      className="h-[3rem] w-[4rem] rounded-full"
                      src={user?.image.default}
                      alt=""
                    />
                  </NavLink>
                </div>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
