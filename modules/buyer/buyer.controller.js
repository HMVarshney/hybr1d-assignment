const { roles } = require("../../config/roles");
const { sendSuccess, sendError } = require("../../utils/response");
const Catalog = require("../catalog/catalog.model");
const Order = require("../order/order.model");
const Product = require("../product/product.model");
const User = require("../user/user.model");

class Controller {
  async listSellers(req, res, next) {
    let sellers;
    try {
      sellers = await User.find({ role: roles[1] });
    } catch (err) {
      return next(err);
    }

    return sendSuccess(res, sellers);
  }

  async findSellerCatalog(req, res, next) {
    const { seller_id } = req.params;

    const seller = await User.findById(seller_id);
    if (!seller) {
      return sendError(next, "Invalid seller ID");
    }

    let catalog = await Catalog.findOne({ seller: seller_id });
    catalog = catalog.toJSON();
    const products = await Product.find({ catalog: catalog.id });
    catalog.products = products;

    return sendSuccess(res, {
      seller,
      catalog,
    });
  }

  async createOrder(req, res, next) {
    const { products } = req.body;
    const { seller_id } = req.params;
    const { _id: userID } = req.user;

    let seller;
    try {
      seller = await User.findById(seller_id).select("id").lean();
      if (!seller) {
        return sendError(next, "Invalid seller ID");
      }
    } catch (err) {
      return next(err);
    }
    const catalog = await Catalog.findOne({ seller: seller_id })
      .select("_id")
      .lean();

    let newOrder;
    try {
      newOrder = await Order.create({
        buyer: userID,
        seller: seller_id,
        products,
        catalog: catalog._id,
      });
    } catch (err) {
      return next(err);
    }

    return sendSuccess(res, newOrder, "Order has been created successfully");
  }
}

module.exports = new Controller();
