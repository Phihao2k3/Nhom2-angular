const express = require("express");
const router = express.Router();
const multer = require("multer");
const product = require("./product");
const users = require("./users");
const productcate = require("./productcate");
const orders = require("./orders");
const stores = require("./stores");
const store_inventory = require("./store_inventory");
const employees = require("./employees");
const order_details = require("./order_details");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
router.use("/product", product);
router.use("/users", users);
router.use("/productcate", productcate);
router.use("/orders", orders);
router.use("/stores", stores);
router.use("/store_inventory", store_inventory);
router.use("/employees", employees);
router.use("/order_details", order_details);
module.exports = router;
