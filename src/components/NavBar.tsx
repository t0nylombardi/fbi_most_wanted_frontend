import React from "react";

const NavBar = () => {
  const links = [
    { title: "Cyber Crimes", url: "/cyber" },
    { title: "Missing Persons", url: "/missing-persons" },
    { title: "Violent Crims", url: "/violent-crimes" },
  ];

  return (
    <header>
      <nav role="navbar" className="px-[4rem]">
        <div className="flex items-center justify-between py-4 px-2">
          <div className="">
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
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0">
              {links.map((link, index) => (
                <li key={index} className="p-0 m-0">
                  <a role="link" href={link.url} className="btn">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
