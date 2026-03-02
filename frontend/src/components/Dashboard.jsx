import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TodoList from "./todoList";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("todo");
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser.user || currentUser);
  }, [navigate]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header / "Mini Navbar" */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 shrink-0 z-30">
          <div className="flex items-center gap-4">
            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-slate-100 rounded-lg md:hidden hover:bg-slate-200 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 capitalize">
              {activeMenu.replace("-", " ")}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span className="hidden sm:inline">
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
              🔔
            </div>
          </div>
        </header>

        {/* Scrollable Content Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 p-6 md:p-10">
              {activeMenu === "todo" && <TodoList />}
              {activeMenu === "notes" && (
                <div className="text-center py-20">
                  <span className="text-6xl">📝</span>
                  <h3 className="mt-4 text-lg font-bold">
                    Fitur Catatan Harian
                  </h3>
                  <p className="text-slate-500">
                    Segera hadir untuk manajemen ide Anda.
                  </p>
                </div>
              )}
              {activeMenu === "finance" && (
                <div className="text-center py-20">
                  <span className="text-6xl">💰</span>
                  <h3 className="mt-4 text-lg font-bold">Manajemen Keuangan</h3>
                  <p className="text-slate-500">
                    Pantau arus kas Anda dengan mudah.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
