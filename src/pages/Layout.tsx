import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-100 dark:bg-gray-900 dark:text-gray-100">
      {/* Fixed header */}
      <Header />

      {/* Main area: sidebar + scrollable content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Navbar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
