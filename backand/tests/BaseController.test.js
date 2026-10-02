const { test } = require("node:test");
const assert = require("node:assert");
const BaseController = require("../controllers/BaseController");

// Helper: membuat objek response palsu (mock) seperti milik Express
const createMockRes = () => {
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
};

test("sendSuccess mengirim status 200 dan format { success, message, data }", () => {
  const controller = new BaseController();
  const res = createMockRes();

  controller.sendSuccess(res, [{ _id: "1" }]);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert.strictEqual(res.body.message, "Success Get Data");
  assert.deepStrictEqual(res.body.data, [{ _id: "1" }]);
});

test("sendSuccess menerima message & statusCode kustom", () => {
  const controller = new BaseController();
  const res = createMockRes();

  controller.sendSuccess(res, { _id: "1" }, "Berhasil membuat data", 201);

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.message, "Berhasil membuat data");
});

test("sendError default memakai status 500", () => {
  const controller = new BaseController();
  const res = createMockRes();

  controller.sendError(res);

  assert.strictEqual(res.statusCode, 500);
  assert.strictEqual(res.body.success, false);
  assert.strictEqual(res.body.message, "Internal Server Error");
});

test("sendError menerima statusCode kustom (misal 404)", () => {
  const controller = new BaseController();
  const res = createMockRes();

  controller.sendError(res, "Data tidak ditemukan", 404);

  assert.strictEqual(res.statusCode, 404);
  assert.strictEqual(res.body.message, "Data tidak ditemukan");
});

test("sendSuccess TIDAK memakai typo 'massage' lagi", () => {
  const controller = new BaseController();
  const res = createMockRes();

  controller.sendSuccess(res, null);

  assert.strictEqual(res.body.massage, undefined);
  assert.ok("message" in res.body);
});