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
    { title: "Violent Crimes", url: "/violent-crimes" },
  ];

  return (
    <header>
      <nav role="navbar">
        <div className="flex flex-row items-center justify-around py-4 px-2">
          <div className="w-1/2">
            <h1 className="text-3xl">
              <a role="home" href="/" className="hover:text-cedar-wood-finish-400">
                FBI WANTED
              </a>
            </h1>
          </div>

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
                    className="relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-full mx-4"
                    id="user-profile-button"
                  >
                    <img
                      data-testid="user-image"
                      role="img"
                      className="h-[2rem] w-[2rem] rounded-full bg-cover bg-center"
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
