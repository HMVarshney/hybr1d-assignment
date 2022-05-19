const { sendSuccess } = require("../../utils/response");
const Product = require("../product/product.model");
const Catalog = require("../catalog/catalog.model");
const Order = require("../order/order.model");

class Controller {
  async createCatalog(req, res, next) {
    let { products } = req.body;
    const { _id: userID } = req.user;

    let catalog = await Catalog.findOne({ seller: userID })
      .select("_id")
      .lean()
      .exec();
    if (!catalog) {
      catalog = await Catalog.create({
        name: "Catalog",
        seller: userID,
      });
    }

    products.forEach((product) => {
      product.catalog = catalog._id;
    });

    try {
      products = await Product.create(products);
    } catch (err) {
      return next(err);
    }

    return sendSuccess(res, products);
  }

  async myOrders(req, res, next) {
    const { _id: userID } = req.user;

    let orders;
    try {
      orders = await Order.find({ seller: userID }).populate("buyer products");
    } catch (err) {
      return next(err);
    }

    return sendSuccess(res, orders);
  }
}

module.exports = new Controller();
