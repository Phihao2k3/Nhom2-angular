const express = require("express");
const router = express.Router();
const multer = require("multer");
const product = require("./product");
const users = require("./users");
const productcate = require("./productcate");
const orders = require("./orders");
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
module.exports = router;
