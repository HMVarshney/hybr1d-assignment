const { generateJWT } = require("../../utils/jwt");
const { sendSuccess, sendError } = require("../../utils/response");
const User = require("../user/user.model");

class AuthController {
  async register(req, res, next) {
    const { email, password, role, username } = req.body;

    if (await User.findOne({ email }).lean().exec()) {
      return sendError(next, "User already exists", 400);
    }

    let newUser;
    try {
      newUser = await User.create({
        username,
        email,
        password,
        role,
      });
    } catch (err) {
      return next(err);
    }

    return sendSuccess(
      res,
      {
        account: newUser,
      },
      "User registered"
    );
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    let user;
    try {
      user = await User.findOne({ email }).exec();
      if (!user) {
        return res.status(404).json({
          message: "User does not exist",
        });
      }
    } catch (err) {
      return next(err);
    }

    if (!user.passwordMatches(password)) {
      return res.status(401).json({
        message: "Incorrent password",
      });
    }

    const token = generateJWT({ id: user._id, role: user.role });

    return sendSuccess(res, {
      token,
      account: user,
    });
  }
}

module.exports = new AuthController();
