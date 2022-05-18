const { sendSuccess } = require("../../utils/response");
const Product = require("../product/product.model");
const Catalog = require("../catalog/catalog.model");

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

    console.log(products);

    try {
      products = await Product.create(products);
    } catch (err) {
      return next(err);
    }

    return sendSuccess(res, products);
  }
}

module.exports = new Controller();
