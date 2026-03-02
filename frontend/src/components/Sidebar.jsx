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
      text: "Anda harus login kembali untuk mengakses data.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Ya, Keluar!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        authService.logout();
        Swal.fire({
          title: "Berhasil Keluar",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/login"), 1100);
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
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-[60]">
        <h1 className="text-xl font-bold text-blue-400">PersonalHub</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-2xl">
          {isSidebarOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* SIDEBAR ASIDE */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative w-72 bg-slate-900 text-white h-full flex flex-col shadow-2xl z-50 transition-transform duration-300 ease-in-out`}>
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

        {/* USER INFO */}
        <div className="p-6 bg-slate-800/50 m-4 rounded-3xl border border-slate-700">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-black shrink-0">
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

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
