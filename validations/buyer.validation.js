const Joi = require("joi");

module.exports = {
  createOrder: Joi.object().keys({
    products: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
      .required(),
  }),
};
