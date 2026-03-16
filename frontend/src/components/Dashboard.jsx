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

  // Jika user belum dimuat, tampilkan loading layar penuh (opsional)
  if (!user)
    return (
      <div className="h-screen w-full bg-slate-900 flex items-center justify-center text-white">
        Memuat Dashboard...
      </div>
    );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2.5 bg-slate-100 text-slate-600 rounded-xl md:hidden hover:bg-slate-200 transition-all active:scale-95">
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <div>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-0.5">
                Overview
              </p>
              <h2 className="text-xl font-black tracking-tight text-slate-800 capitalize leading-none">
                {activeMenu.replace("-", " ")}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Hari Ini
              </p>
              <p className="text-sm font-bold text-slate-700">
                {new Date().toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 hover:bg-white transition-colors">
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              <span className="text-lg">🔔</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto">
            {/* Container Putih untuk Konten */}
            <div className="bg-white rounded-[2.5rem] shadow-sm shadow-slate-200 border border-slate-200/60 p-6 md:p-10 min-h-[calc(100vh-160px)] transition-all duration-500">
              {/* Render Konten Berdasarkan Menu */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeMenu === "todo" && <TodoList />}

                {activeMenu === "notes" && (
                  <div className="text-center py-24">
                    <div className="w-20 h-20 bg-yellow-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 border border-yellow-100">
                      📝
                    </div>
                    <h3 className="text-2xl font-black text-slate-800">
                      Catatan Harian
                    </h3>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">
                      Fitur ini sedang dalam pengembangan untuk membantu Anda
                      menyimpan ide-ide kreatif.
                      <br />
                      <br />
                      <br />
                      COMING ZOON
                    </p>
                  </div>
                )}

                {activeMenu === "finance" && (
                  <div className="text-center py-24">
                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 border border-blue-100">
                      💰
                    </div>
                    <h3 className="text-2xl font-black text-slate-800">
                      Manajemen Keuangan
                    </h3>
                    <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">
                      Lacak pengeluaran dan pemasukan Anda secara otomatis di
                      sini.
                      <br />
                      <br />
                      <br />
                      COMING ZOON
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
