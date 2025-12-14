import { useContext, useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";
import { Logo } from "./Logo";
import { LoginModal } from "./LoginModal";
import { AuthContext } from "../context/authContext";

export const Header = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const handleLogout = () => {
    auth?.logout();
    setShowMenu(false);
  };
  return (
    <div className="flex flex-row justify-between p-2 rounded shadow-lg bg-white dark:bg-gray-800 dark:text-white m-2">
      <div className="flex items-center flex-row">
        <Logo />
        <h1 className="p-4">Job Tracker</h1>
      </div>
      <div className="flex flex-row items-center px-3">
        <div
          onClick={toggleDarkMode}
          className={`w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 mx-3 cursor-pointer transition-colors duration-300`}
        >
          <div
            className={`flex justify-center items-center w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out
              ${
                isDark
                  ? "translate-x-8 bg-gray-900"
                  : "translate-x-0 bg-yellow-400"
              }`}
          >
            {isDark ? (
              <span className="text-yellow-400 text-xs">🌙</span>
            ) : (
              <span className="text-gray-900 text-xs">🌞</span>
            )}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {user ? (user.username || user.email) : "Login"}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-50">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};
