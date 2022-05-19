const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const routes = require("./routes");
class App {
  app;

  constructor() {
    global.rootDir = __dirname;
    require("dotenv").config();
    this.app = express();
  }

  getServer() {
    return this.app;
  }

  startServer() {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeDefaultRoutes();
    this.initializeErrorHandler();
    this.listen();
  }

  listen() {
    const PORT = process.env.PORT;
    this.app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  }

  initializeMiddlewares() {
    this.app.set("trust proxy", 1);
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.urlencoded({ limit: "100mb", extended: true }));
    this.app.use(morgan("tiny"));
  }

  initializeRoutes() {
    this.app.use("/api", routes);
  }

  initializeErrorHandler() {
    // eslint-disable-next-line no-unused-vars
    this.app.use((error, req, res, next) => {
      if (!error.status || error.status === 500) console.log(error);

      res.status(error.status || 500);
      return res.json({
        success: false,
        message: error.message,
      });
    });
  }

  initializeDefaultRoutes() {
    this.app.get("/ping", (req, res) => {
      return res.status(200).json({
        message: "Server is up and running",
      });
    });

    this.app.get("/", (req, res) => {
      return res.send("Welcome to the next big thing!!");
    });

    this.app.use((req, res, next) => {
      const error = new Error("Route not found");
      error.status = 404;
      next(error);
    });
  }
}

const initServer = require("./scripts/initServer");
const app = new App();
initServer
  .boot(app.getServer())
  .then(() => app.startServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
