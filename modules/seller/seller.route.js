const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const requestValidator = require("../../middlewares/validator");
const controller = require("./seller.controller");
const validations = require("../../validations/seller.validation");
const router = Router();

router.post(
  "/create-catalog",
  requestValidator(validations.createCatalog),
  checkAuth,
  controller.createCatalog
);
router.get("/orders", checkAuth, controller.myOrders);

module.exports = router;
