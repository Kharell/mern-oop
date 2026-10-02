// konsep oop : base controller sebagai parent class
// menerapkan konsep StatusCode untuk mengirim respon
class BaseController {
  // method untuk mengirim respon sukses (dipakai di seluruh API)
  sendSuccess(res, data, message = "Success Get Data", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  // method untuk mengirim pesan error (dipakai di seluruh API)
  sendError(res, message = "Internal Server Error", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

module.exports = BaseController;
