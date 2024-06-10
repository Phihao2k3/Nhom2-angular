const express = require("express");
const router = express.Router();
const multer = require("multer");

const order_detailssapi = require("../../api-app/orders.api");
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


router.post("/", order_detailssapi.addorder_detail);
router.get("/:id", order_detailssapi.getbyid_order_detail);
router.get("/", order_detailssapi.getall_order_detail);
module.exports = router;
