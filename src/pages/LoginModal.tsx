import React, { useState, FormEvent } from "react";
import { Logo } from "./Logo";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginModal: React.FC<{ onClose: () => void, initialMode?: "login" | "register"; }> = ({ onClose, initialMode }) => {
  const { login, register } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(initialMode === "register");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (isRegister) {
        await register(username, email, password);
      } else {
        await login(email, password);
      }
      onClose();
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-[350px] max-w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Job Tracker
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 text-sm">
          Track your job applications with ease
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your Username"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              autoComplete={"email"}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              autoComplete={isRegister ? "new-password" : "current-password"}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
          >
            {isRegister ? "Register" : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          {isRegister
            ? "Already have an account? Sign In"
            : "New user? Create an account"}
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          Forgot password?
        </button>
      </div>
    </div>
  );
};
