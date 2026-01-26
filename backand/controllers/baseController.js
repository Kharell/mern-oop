// konsep oop : base kontroler sebagai perent class
// menerapkan konsep StatusCode untuk mengirim respon
class BaseController {
  // method untuk mengirim respon sukses  (biar di  gunakan di seluruh api)
  sendSuccess(res, data, massage = "Success Get Data", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      massage,
      data,
    });
  }

  // method untuk mengirim pesan eror (biar di gunakan di seluruh api)
  sendError(res, message = "Internal Server Eror", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

module.exports = BaseController;
