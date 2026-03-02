import React from "react";
import Swal from "sweetalert2";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  activeMenu,
  setActiveMenu,
  user,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin keluar?",
      text: "Sesi Anda akan berakhir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, Keluar!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        authService.logout();
        navigate("/login");
      }
    });
  };

  const menuItems = [
    { id: "todo", label: "Todo List", icon: "✅" },
    { id: "notes", label: "Catatan Harian", icon: "📝" },
    { id: "finance", label: "Keuangan", icon: "💰" },
  ];

  return (
    <>
      {/* Sidebar Desktop & Mobile Wrapper */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} h-screen flex flex-col border-r border-slate-800`}>
        {/* Logo Section */}
        <div className="flex items-center justify-center h-20 gap-3 border-b border-slate-800 bg-slate-900/50">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            P
          </div>
          <span className="text-xl font-black text-white tracking-tighter">
            Personal<span className="text-blue-500">Hub</span>
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Menu Utama
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                activeMenu === item.id
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                  : "hover:bg-slate-800 hover:text-white"
              }`}>
              <span
                className={`text-xl transition-transform duration-300 ${activeMenu === item.id ? "" : "group-hover:scale-125"}`}>
                {item.icon}
              </span>
              <span className="ml-4 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile Section (Mentok Bawah) */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">Sesi Aktif</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm border border-red-500/20">
            <span>Keluar Sistem</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
