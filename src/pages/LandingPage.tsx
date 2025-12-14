import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Logo } from "./Logo";
import { useDarkMode } from "../hooks/useDarkMode";

export const LandingPage = ({
  onLoginClick,
}: {
  onLoginClick?: (mode: "login" | "register") => void;
}) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (auth?.user) {
      navigate("/", { replace: true });
    }
  }, [auth?.user, navigate]);
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">JobTracker Pro</span>
        </div>
        <div className="flex gap-4 items-center">
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
          <button
            onClick={() => onLoginClick?.("login")}
            className="text-gray-700 dark:text-gray-200 hover:underline"
          >
            Sign In
          </button>

          <button
            onClick={() => onLoginClick?.("register")}
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6 flex-1 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Track Your <span className="text-blue-600">Dream Job</span>{" "}
          Applications
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Organize, manage, and track all your job applications in one place.
          Never lose track of opportunities again with our powerful job tracking
          platform.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => onLoginClick?.("register")}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Start Tracking Free
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center">
            <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">
              📊
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Application Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get insights into your job search progress with detailed analytics
              and success metrics.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center">
            <div className="text-green-600 dark:text-green-400 text-4xl mb-4">
              📅
            </div>
            <h3 className="text-lg font-semibold mb-2">Interview Scheduling</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Never miss an interview with smart scheduling and automated
              reminders.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center">
            <div className="text-purple-600 dark:text-purple-400 text-4xl mb-4">
              🏢
            </div>
            <h3 className="text-lg font-semibold mb-2">Company Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Research companies and track your application history with each
              organization.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-3xl font-bold">50K+</span>
            <p className="text-sm mt-1">Active Users</p>
          </div>
          <div>
            <span className="text-3xl font-bold">500K+</span>
            <p className="text-sm mt-1">Applications Tracked</p>
          </div>
          <div>
            <span className="text-3xl font-bold">85%</span>
            <p className="text-sm mt-1">Success Rate</p>
          </div>
          <div>
            <span className="text-3xl font-bold">24/7</span>
            <p className="text-sm mt-1">Support Available</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Take Control of Your Job Search?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Join thousands of job seekers who have streamlined their application
          process.
        </p>
        <button
          onClick={() => onLoginClick?.("register")}
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Get Started Today - It's Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4 text-sm">
          <div className="text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} JobTracker Pro. All rights reserved.
          </div>
          <div className="flex gap-6">
            <button className="hover:underline">Privacy</button>
            <button className="hover:underline">Terms</button>
            <button className="hover:underline">Security</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
