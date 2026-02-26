import React, { useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
// Pastikan nama file ini sesuai dengan yang ada di folder components Anda
import TodoList from "./todoList";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("todo");
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();

    // SOLUSI: Cek apakah user ada sebelum melakukan setUser
    if (!currentUser) {
      navigate("/login");
      return; // Berhenti di sini jika tidak ada user
    }

    // Ambil data user dari properti 'user' atau langsung dari objeknya
    // Ini menangani perbedaan struktur data dari Backend
    const dataAman = currentUser.user ? currentUser.user : currentUser;
    setUser(dataAman);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const menuItems = [
    { id: "todo", label: "Todo List", icon: "✅" },
    { id: "notes", label: "Catatan Harian", icon: "📝" },
    { id: "finance", label: "Keuangan", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-blue-400">PersonalHub</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 focus:outline-none">
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`${isSidebarOpen ? "block" : "hidden"} md:flex w-full md:w-72 bg-slate-900 text-white flex-col shadow-2xl z-50`}>
        <div className="hidden md:block p-8 text-2xl font-black border-b border-slate-800 text-blue-400">
          Personal<span className="text-white">Hub</span>
        </div>

        <nav className="flex-grow p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center p-4 rounded-2xl transition-all duration-200 ${
                activeMenu === item.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}>
              <span className="text-xl">{item.icon}</span>
              <span className="ml-4 font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* USER SECTION */}
        <div className="p-6 bg-slate-800/50 m-4 rounded-3xl border border-slate-700">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-black">
              {/* Optional Chaining (?) untuk mencegah error saat user masih null */}
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-white">
                {user?.name || "Memuat..."}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || "User Aktif"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-xl transition-all duration-300 text-sm font-bold border border-red-500/20 shadow-sm">
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-grow h-screen overflow-y-auto bg-[#f8fafc] p-4 md:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
              Overview
            </h2>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              {menuItems.find((m) => m.id === activeMenu)?.label}
            </h1>
          </header>

          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="p-4 md:p-10">
              {activeMenu === "todo" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                  <TodoList />
                </div>
              )}

              {activeMenu === "notes" && (
                <div className="py-24 text-center">
                  <div className="text-6xl mb-6">📝</div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Catatan Digital
                  </h3>
                  <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                    Fitur ini sedang dalam tahap pengembangan. Segera simpan
                    ide-idemu di sini!
                  </p>
                </div>
              )}

              {activeMenu === "finance" && (
                <div className="py-24 text-center">
                  <div className="text-6xl mb-6">💰</div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    Manajemen Keuangan
                  </h3>
                  <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                    Fitur untuk melacak uang masuk dan keluar akan segera hadir.
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
