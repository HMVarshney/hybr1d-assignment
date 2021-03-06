const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const requestValidator = require("../../middlewares/validator");
const controller = require("./buyer.controller");
const validations = require("../../validations/buyer.validation");
const router = Router();

router.get("/list-of-sellers", checkAuth, controller.listSellers);
router.get(
  "/seller-catalog/:seller_id",
  checkAuth,
  controller.findSellerCatalog
);

router.post(
  "/create-order/:seller_id",
  requestValidator(validations.createOrder),
  checkAuth,
  controller.createOrder
);

module.exports = router;
