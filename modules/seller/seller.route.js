const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./seller.controller");
const router = Router();

router.post("/create-catalog", checkAuth, controller.createCatalog);
// router.post("/login", controller.login);

module.exports = router;
