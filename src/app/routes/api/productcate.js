const express = require("express");
const router = express.Router();
const multer = require("multer");

const productcateapi = require("../../api-app/productcate.api");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
router.delete("/:id", productcateapi.deleteproductcate);
router.put("/:id", productcateapi.updateproductcate);
router.post("/", productcateapi.addproductcate);
router.get("/:id", productcateapi.getbyid);
router.get("/", productcateapi.getall);
module.exports = router;
