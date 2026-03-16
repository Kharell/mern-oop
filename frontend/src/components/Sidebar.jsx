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
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        authService.logout();
        navigate("/login");
      }
    });
  };

  const menuItems = [
    {
      id: "todo",
      label: "Todo List",
      icon: "✅",
      color: "from-green-400 to-emerald-500",
    },
    {
      id: "notes",
      label: "Catatan Harian",
      icon: "📝",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "finance",
      label: "Keuangan",
      icon: "💰",
      color: "from-blue-400 to-indigo-500",
    },
  ];

  return (
    <>
      {/* Sidebar Wrapper */}
      <aside
        className={`fixed inset-y-0 left-0 z-[70] w-72 bg-slate-900 text-slate-300 transform transition-all duration-500 ease-in-out md:relative md:translate-x-0 
        ${isSidebarOpen ? "translate-x-0 shadow-[20px_0_60px_-15px_rgba(0,0,0,0.5)]" : "-translate-x-full"} 
        h-screen flex flex-col border-r border-slate-800/50`}>
        {/* Logo Section - Lebih Mewah */}
        <div className="relative flex items-center h-24 px-8 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-md shrink-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 font-black text-xl border border-slate-700">
              P
            </div>
          </div>
          <div className="ml-4 flex flex-col">
            <span className="text-xl font-black text-white tracking-tight leading-none">
              Personal<span className="text-blue-500">Hub</span>
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">
              Workspace
            </span>
          </div>

          {/* Close Button Mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden ml-auto p-2 hover:bg-slate-800 rounded-lg text-slate-500">
            ✕
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 custom-scrollbar">
          <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">
            Main Menu
          </p>

          {menuItems.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full group relative flex items-center px-4 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "hover:bg-slate-800/50 hover:text-slate-100"
                }`}>
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 w-1.5 h-8 bg-blue-500 rounded-r-full shadow-[4px_0_15px_rgba(59,130,246,0.5)]"></div>
                )}

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-500 ${
                    isActive
                      ? "bg-blue-600 shadow-lg shadow-blue-600/30 scale-110"
                      : "bg-slate-800 group-hover:scale-110"
                  }`}>
                  {item.icon}
                </div>

                <span
                  className={`ml-4 font-bold text-sm tracking-wide transition-colors ${
                    isActive
                      ? "opacity-100"
                      : "opacity-60 group-hover:opacity-100"
                  }`}>
                  {item.label}
                </span>

                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Section - Glassmorphism Style */}
        <div className="p-4 mt-auto">
          <div className="relative p-5 rounded-[2rem] bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>

            <div className="flex items-center gap-4 mb-5 relative z-10">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg border-2 border-slate-700">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-black text-white truncate tracking-tight">
                  {user?.name || "User Account"}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Online
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full group/btn flex items-center justify-center gap-3 py-3.5 rounded-xl bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white transition-all duration-500 font-black text-[10px] uppercase tracking-[0.2em] border border-slate-700 hover:border-red-500">
              <span>Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Modern Overlay with Blur */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] md:hidden transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Custom Styles for Scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        .custom-scrollbar {
          scrollbar-width: none;
        }
      `,
        }}
      />
    </>
  );
};

export default Sidebar;
