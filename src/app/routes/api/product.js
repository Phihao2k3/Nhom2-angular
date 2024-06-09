const express = require("express");
const router = express.Router();
const multer = require("multer");

const productapi = require("../../api-app/product.api");
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
router.delete("/:id",productapi.deleteproduct)
router.put("/:id", productapi.updateproduct);
router.post("/", productapi.addproduct);
router.get("/:id", productapi.getbyid);
router.get("/", productapi.getall);
module.exports = router;
