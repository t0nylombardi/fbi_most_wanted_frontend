const NavBar = () => {
  const links = [
    { title: "Ten Most Wanted", url: "#" },
    { title: "Fugitives", url: "#" },
    { title: "Capitol Violence", url: "#" },
    { title: "Terrorism", url: "#" },
    { title: "Missing Persons", url: "#" },
    { title: "Parental Kidnappings", url: "#" },
    { title: "Seeking Info", url: "#" },
  ];

  return (
    <header>
      <nav role="navbar">
        <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-12">
          <div className="px-8">
            <h1 className="text-2xl">
              <a role="link" href="/" className="hover:text-cedar-wood-finish-400">
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className="btn">
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
