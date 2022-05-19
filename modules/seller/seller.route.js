const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./seller.controller");
const router = Router();

router.post("/create-catalog", checkAuth, controller.createCatalog);
router.get("/orders", checkAuth, controller.myOrders);

module.exports = router;
