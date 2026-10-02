import { createContext, useContext } from "react";

// Context untuk menyimpan status login di seluruh aplikasi.
// Dipisah dari komponen AuthProvider supaya aturan fast-refresh (Vite) terpenuhi:
// file yang mengekspor komponen sebaiknya tidak mengekspor hal lain.
export const AuthContext = createContext(null);

// Custom hook agar pemakaian context lebih ringkas & aman
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return context;
};

export default AuthContext;