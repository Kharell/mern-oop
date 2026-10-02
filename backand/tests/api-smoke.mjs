// Smoke test end-to-end (membutuhkan server + MongoDB yang sudah berjalan).
//
// Cara pakai:
//   1. terminal 1 : cd backand && npm run dev
//   2. terminal 2 : node backand/tests/api-smoke.mjs
//
// Skrip ini TIDAK ikut berjalan lewat `npm test` (bukan file *.test.js),
// karena butuh server hidup.
const BASE = process.env.API_URL || "http://localhost:5000/api";

let pass = 0;
let fail = 0;

const check = (label, condition, extra = "") => {
  if (condition) {
    pass += 1;
    console.log(`  OK    ${label}`);
  } else {
    fail += 1;
    console.log(`  GAGAL ${label} ${extra}`);
  }
};

const request = async (method, path, { token, body } = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  let json = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  return { status: res.status, json };
};

const run = async () => {
  const stamp = Date.now();
  const email = `smoke_${stamp}@example.com`;
  const password = "rahasia123";

  console.log("\n[1] Endpoint terproteksi tanpa token");
  const noToken = await request("GET", "/tasks");
  check(
    "GET /tasks tanpa token -> 401",
    noToken.status === 401,
    `(dapat ${noToken.status})`,
  );

  console.log("\n[2] Registrasi & validasi");
  const weakPass = await request("POST", "/auth/register", {
    body: { name: "A", email, password: "12" },
  });
  check(
    "password < 6 karakter ditolak -> 400",
    weakPass.status === 400,
    `(dapat ${weakPass.status})`,
  );

  const registered = await request("POST", "/auth/register", {
    body: { name: "Smoke Test", email, password },
  });
  check(
    "register sukses -> 201",
    registered.status === 201,
    `(dapat ${registered.status})`,
  );
  check(
    "respons punya 'message' dan bukan 'massage'",
    registered.json?.message !== undefined &&
      registered.json?.massage === undefined,
  );

  const duplicate = await request("POST", "/auth/register", {
    body: { name: "Smoke Test", email, password },
  });
  check(
    "email duplikat ditolak -> 400",
    duplicate.status === 400,
    `(dapat ${duplicate.status})`,
  );

  console.log("\n[3] Login");
  const wrongPass = await request("POST", "/auth/login", {
    body: { email, password: "passwordsalah" },
  });
  check("password salah ditolak -> 400", wrongPass.status === 400);

  const login = await request("POST", "/auth/login", {
    body: { email, password },
  });
  const token = login.json?.data?.token;
  check("login sukses & mengembalikan token", Boolean(token));
  check(
    "password tidak bocor di response login",
    !JSON.stringify(login.json).includes(password),
  );

  console.log("\n[4] CRUD Todo");
  const created = await request("POST", "/tasks", {
    token,
    body: { title: "Tugas smoke test" },
  });
  const taskId = created.json?.data?._id;
  check(
    "create task -> 201",
    created.status === 201,
    `(dapat ${created.status})`,
  );
  check("task baru: completed = false", created.json?.data?.completed === false);

  const toggled = await request("PUT", `/tasks/${taskId}`, {
    token,
    body: { completed: true },
  });
  check(
    "toggle completed -> true (bug lama selalu gagal)",
    toggled.json?.data?.completed === true,
    JSON.stringify(toggled.json),
  );

  const listed = await request("GET", "/tasks", { token });
  check("list task berisi 1 item", listed.json?.data?.length === 1);

  const deleted = await request("DELETE", `/tasks/${taskId}`, { token });
  check(
    "delete task -> 200",
    deleted.status === 200,
    `(dapat ${deleted.status})`,
  );

  const afterDelete = await request("GET", "/tasks", { token });
  check("task terhapus dari list", afterDelete.json?.data?.length === 0);

  const badId = await request("DELETE", "/tasks/id-ngawur", { token });
  check(
    "id tidak valid -> 400 (bukan 500)",
    badId.status === 400,
    `(dapat ${badId.status})`,
  );

  console.log("\n[5] Catatan Harian");
  const noteCreated = await request("POST", "/catatan", {
    token,
    body: { judul: "Catatan smoke", isi: "Isi catatan", tag: "Test" },
  });
  const noteId = noteCreated.json?.data?._id;
  check(
    "create catatan -> 201",
    noteCreated.status === 201,
    `(dapat ${noteCreated.status})`,
  );

  const noteList = await request("GET", "/catatan", { token });
  check("list catatan berisi 1 item", noteList.json?.data?.length === 1);

  const noteDelete = await request("DELETE", `/catatan/${noteId}`, { token });
  check("delete catatan -> 200", noteDelete.status === 200);

  console.log("\n[6] Keuangan");
  await request("POST", "/keuangan", {
    token,
    body: { keterangan: "Gaji", nominal: 5000, tipe: "pemasukan" },
  });
  const trx = await request("POST", "/keuangan", {
    token,
    body: { keterangan: "Makan", nominal: 2000, tipe: "pengeluaran" },
  });
  const trxId = trx.json?.data?._id;

  const ringkasan = await request("GET", "/keuangan/ringkasan", { token });
  check(
    "ringkasan totalMasuk = 5000",
    ringkasan.json?.data?.totalMasuk === 5000,
    JSON.stringify(ringkasan.json),
  );
  check(
    "ringkasan totalKeluar = 2000",
    ringkasan.json?.data?.totalKeluar === 2000,
  );
  check("ringkasan saldo = 3000", ringkasan.json?.data?.saldo === 3000);

  await request("DELETE", `/keuangan/${trxId}`, { token });

  console.log("\n[7] Isolasi data antar user");
  const otherEmail = `smoke2_${stamp}@example.com`;
  await request("POST", "/auth/register", {
    body: { name: "User Lain", email: otherEmail, password },
  });
  const otherLogin = await request("POST", "/auth/login", {
    body: { email: otherEmail, password },
  });
  const otherToken = otherLogin.json?.data?.token;
  const otherTasks = await request("GET", "/tasks", { token: otherToken });
  check(
    "user lain tidak melihat task milik user pertama",
    otherTasks.json?.data?.length === 0,
    `(dapat ${otherTasks.json?.data?.length})`,
  );

  console.log(`\n===== HASIL: ${pass} lulus, ${fail} gagal =====`);
  process.exit(fail === 0 ? 0 : 1);
};

run().catch((err) => {
  console.error("Smoke test gagal dijalankan:", err.message);
  process.exit(1);
});
