const { Router } = require("express");
const router = Router();

const authRouter = require("./modules/auth/auth.route");
const sellerRouter = require("./modules/seller/seller.route");
const buyerRouter = require("./modules/buyer/buyer.route");

router.use("/auth", authRouter);
router.use("/seller", sellerRouter);
router.use("/buyer", buyerRouter);

module.exports = router;
