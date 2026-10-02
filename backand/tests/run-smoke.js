// Menjalankan server + smoke test dalam SATU proses.
// Praktis untuk validasi cepat tanpa perlu membuka dua terminal.
//
// Pakai: cd backand && npm run smoke
require("../server.js");

// Beri waktu untuk koneksi database & server menyala, lalu jalankan smoke test.
const DELAY = Number(process.env.SMOKE_DELAY_MS || 2500);

setTimeout(() => {
  import("./api-smoke.mjs").catch((err) => {
    console.error("Gagal menjalankan smoke test:", err.message);
    process.exit(1);
  });
}, DELAY);