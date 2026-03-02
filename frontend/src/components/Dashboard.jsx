import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import komponen baru
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
    const dataAman = currentUser.user ? currentUser.user : currentUser;
    setUser(dataAman);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Gunakan komponen Sidebar di sini */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <main className="flex-grow h-screen overflow-y-auto bg-[#f8fafc] p-4 md:p-12 pt-8 md:pt-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
              Overview
            </h2>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              {activeMenu === "todo"
                ? "Todo List"
                : activeMenu === "notes"
                  ? "Catatan Digital"
                  : "Manajemen Keuangan"}
            </h1>
          </header>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-10">
            <div className="p-4 md:p-10">
              {activeMenu === "todo" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                  <TodoList />
                </div>
              )}

              {activeMenu === "notes" && (
                <div className="py-24 text-center animate-in zoom-in-95 duration-300">
                  <div className="text-6xl mb-6">📝</div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Catatan Digital
                  </h3>
                  <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                    Simpan ide harianmu di sini secara pribadi dan aman.
                  </p>
                </div>
              )}

              {activeMenu === "finance" && (
                <div className="py-24 text-center animate-in zoom-in-95 duration-300">
                  <div className="text-6xl mb-6">💰</div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Manajemen Keuangan
                  </h3>
                  <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                    Pantau arus kas masuk dan keluar dengan pencatatan otomatis.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
