import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(formData.name, formData.email, formData.password);

      // Notifikasi sukses (menggantikan alert bawaan browser)
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        text: "Silakan login dengan akun Anda.",
        confirmButtonColor: "#3b82f6",
        customClass: { popup: "rounded-[2rem]" },
      });

      navigate("/login"); // Pindah ke halaman login
    } catch (err) {
      setError(err?.message || "Registrasi Gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Buat Akun
        </h2>
        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password (min. 6 karakter)"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            minLength={6}
            required
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg">
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;