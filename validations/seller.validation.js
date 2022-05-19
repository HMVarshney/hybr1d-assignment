const Joi = require("joi");

module.exports = {
  createCatalog: Joi.object().keys({
    products: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.object().keys({
          currency: Joi.string().required(),
          value: Joi.number().required(),
        }),
      })
    ),
  }),
};
