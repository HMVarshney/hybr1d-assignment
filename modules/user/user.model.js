const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { roles } = require("../../config/roles");
const { jsonTransform } = require("../../utils/db");

const transformFields = ["id", "username", "email", "role", "createdAt"];

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: roles,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc) => jsonTransform(doc, transformFields),
    },
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods = {
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

module.exports = mongoose.model("User", UserSchema);
