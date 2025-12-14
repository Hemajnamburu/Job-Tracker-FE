import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-800 mx-2">
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-2 rounded text-gray-900 dark:text-gray-200 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-600"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/applications"
          className={({ isActive }) =>
            `block px-4 py-2 rounded text-gray-900 dark:text-gray-200 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-600"
            }`
          }
        >
          Applications
        </NavLink>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            `block px-4 py-2 rounded text-gray-900 dark:text-gray-200 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-600"
            }`
          }
        >
          Companies
        </NavLink>
        <NavLink
          to="/interviews"
          className={({ isActive }) =>
            `block px-4 py-2 rounded text-gray-900 dark:text-gray-200 ${
              isActive
                ? "bg-gray-200 dark:bg-gray-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "hover:bg-gray-100 dark:hover:bg-gray-600"
            }`
          }
        >
          Interviews
        </NavLink>
      </nav>
    </aside>
  );
};
