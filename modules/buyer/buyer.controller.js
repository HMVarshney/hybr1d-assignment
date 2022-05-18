const { roles } = require("../../config/roles");
const { sendSuccess } = require("../../utils/response");
const User = require("../user/user.model");

class Controller {
  async listSellers(req, res, next) {
    let sellers;
    try {
      sellers = await User.find({ role: roles[1] });
    } catch (err) {
      return next(err);
    }

    return sendSuccess(res, sellers);
  }
}

module.exports = new Controller();
