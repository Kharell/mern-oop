# MERN Todo OOP — PersonalHub

Aplikasi fullstack **MERN** (MongoDB, Express, React, Node.js) dengan pendekatan
**Object-Oriented Programming (OOP)**. Berisi tiga modul: **Todo List**,
**Catatan Harian**, dan **Manajemen Keuangan**.

Repo: [Kharell/mern-oop](https://github.com/Kharell/mern-oop)

---

## ✨ Fitur

| Modul | Status | Keterangan |
|---|---|---|
| Autentikasi (Register/Login) | ✅ Aktif | Password di-hash dengan bcrypt, sesi memakai JWT |
| Todo List | ✅ Aktif | CRUD + toggle selesai, data terpisah per user |
| Catatan Harian | 🟡 API siap | Endpoint CRUD tersedia, UI menyusul |
| Manajemen Keuangan | 🟡 API siap | CRUD + ringkasan saldo, UI menyusul |

---

## 🧠 Penerapan Konsep OOP

| Konsep | Backend | Frontend |
|---|---|---|
| **Inheritance** | `TaskController`, `AuthController`, `CatatanController`, `KeuanganController` mewarisi `BaseController` | `TaskService`, `AuthService`, `CatatanService`, `KeuanganService` mewarisi `BaseService` |
| **Inheritance (middleware)** | `AuthMiddleware` mewarisi `BaseController` agar format error konsisten | — |
| **Encapsulation** | Instance axios & storageKey disimpan sebagai properti class | — |
| **Reusability** | `sendSuccess()` / `sendError()` dipakai seluruh controller | `get()/post()/put()/delete()` + interceptor token |

---

## 🛠️ Teknologi

**Backend:** Node.js, Express 5, MongoDB + Mongoose, JWT (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`
**Frontend:** React 19, Vite (rolldown), Tailwind CSS v4, React Router v7, Axios, SweetAlert2

---

## 🚀 Cara Menjalankan

### 1. Install semua dependency

```bash
npm run install:all
```

### 2. Siapkan environment backend

Salin `backand/.env.example` menjadi `backand/.env`, lalu isi nilainya:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern-todo-oop
JWT_SECRET=ganti_dengan_secret_rahasia_anda
CLIENT_URL=http://localhost:5173
```

> Pastikan MongoDB sudah berjalan (lokal atau MongoDB Atlas).

### 3. (Opsional) Environment frontend

Salin `frontend/.env.example` menjadi `frontend/.env`. Ini opsional karena
`BaseService` sudah memakai default `http://localhost:5000/api`.

### 4. Jalankan backend + frontend sekaligus

```bash
npm run dev
```

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

### Menjalankan terpisah

```bash
npm run server   # backend saja
npm run client   # frontend saja
```

---

## 📡 Dokumentasi API

Semua endpoint (kecuali auth) memerlukan header:

```
Authorization: Bearer <token>
```

### Auth — `/api/auth`

| Method | Endpoint | Body | Keterangan |
|---|---|---|---|
| POST | `/register` | `{ name, email, password }` | Daftar akun baru |
| POST | `/login` | `{ email, password }` | Login, mengembalikan token |

### Todo — `/api/tasks` 🔒

| Method | Endpoint | Body | Keterangan |
|---|---|---|---|
| POST | `/` | `{ title }` | Buat tugas |
| GET | `/` | — | Ambil semua tugas milik user |
| PUT | `/:id` | `{ title?, completed? }` | Ubah judul / status selesai |
| DELETE | `/:id` | — | Hapus tugas |

### Catatan Harian — `/api/catatan` 🔒

| Method | Endpoint | Body | Keterangan |
|---|---|---|---|
| POST | `/` | `{ judul, isi, tag?, warna?, pin? }` | Tambah catatan |
| GET | `/` | — | Ambil semua catatan (pin di atas) |
| PUT | `/:id` | field yang diubah | Ubah / toggle pin |
| DELETE | `/:id` | — | Hapus catatan |

### Keuangan — `/api/keuangan` 🔒

| Method | Endpoint | Body | Keterangan |
|---|---|---|---|
| POST | `/` | `{ keterangan, nominal, tipe, kategori?, tanggal? }` | Tambah transaksi |
| GET | `/` | — | Ambil semua transaksi |
| GET | `/ringkasan` | — | Total pemasukan, pengeluaran, saldo |
| DELETE | `/:id` | — | Hapus transaksi |

### Format Respons

```json
{ "success": true, "message": "Berhasil mengambil semua Tugas...", "data": [] }
```

---

## 📁 Struktur Proyek

```
mern-todo-oop/
├── backand/                     # REST API backend
│   ├── controllers/             # BaseController + turunannya (OOP)
│   ├── middleware/              # AuthMiddleware (verifikasi JWT)
│   ├── models/                  # Schema Mongoose
│   ├── routes/                  # Definisi endpoint
│   ├── tests/                   # Unit test (node:test)
│   └── server.js
├── frontend/                    # SPA React
│   └── src/
│       ├── components/          # Login, Register, Dashboard, TodoList, ...
│       ├── context/             # AuthContext (state login global)
│       └── services/            # BaseService + turunannya (OOP)
└── package.json                 # Script menjalankan seluruh aplikasi
```

---

## 🧪 Menjalankan Test

### Unit test (tanpa perlu server)

```bash
npm test
```

### Smoke test end-to-end (butuh MongoDB aktif)

Menguji auth, proteksi JWT, CRUD todo/catatan/keuangan, validasi, dan
isolasi data antar user — semuanya lewat HTTP seperti aplikasi sungguhan.

```bash
cd backand
npm run smoke
```

> Smoke test membuat data uji sementara (user `smoke_*@example.com`)
> pada database dev.

---

## 📝 Catatan Versi Awal (Riwayat Perbaikan)

Perbaikan yang dilakukan pada refactor ini:

1. **Bug kritis**: field `isComplated` (typo) → `completed`. Sebelumnya tombol
   "tandai selesai" tidak berfungsi karena nama field tidak cocok.
2. `.env.example` disesuaikan dengan kode (`MONGO_URI`, bukan `URL_MONGODB_DEV`).
3. Typo respons API `massage` → `message`.
4. Ditambahkan **AuthMiddleware** — endpoint data kini benar-benar dilindungi JWT.
5. Ditambahkan **relasi `user`** pada Task/Catatan/Keuangan (multi-user).
6. `catatanRoutes` & `keuanganRoutes` dibuat dan didaftarkan di `server.js`
   (sebelumnya controller-nya tidak pernah terpakai).
7. Semua controller & service kini konsisten mewarisi base class.
8. Konsistensi penamaan file (PascalCase) di controller, model, service, komponen.
9. Global error handler, 404 handler, dan CORS dibatasi ke origin frontend.
10. Ditambahkan `AuthContext`, `AuthProvider`, `ProtectedRoute`, interceptor token,
    unit test, dan smoke test end-to-end.
11. **Bug `this` undefined** di `AuthController` diperbaiki (bind di constructor +
    wrapper route) — muncul saat controller mulai memakai `BaseController`.
12. `AuthService.login` diperbaiki agar membaca payload `data.token`
    (sebelumnya token tidak pernah tersimpan, sesi hilang saat refresh).
13. Validasi panjang password dipindah ke controller, karena yang tersimpan di
    database adalah hash bcrypt sehingga `minlength` di schema tidak efektif.