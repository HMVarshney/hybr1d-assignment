const { Router } = require("express");
const { checkAuth } = require("../../middlewares/authorization");
const controller = require("./buyer.controller");
const router = Router();

router.get("/list-of-sellers", checkAuth, controller.listSellers);
// router.post("/login", controller.login);

module.exports = router;
