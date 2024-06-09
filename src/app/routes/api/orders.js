const express = require("express");
const router = express.Router();
const multer = require("multer");

const ordersapi = require("../../api-app/orders.api");
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
router.delete("/:id",ordersapi.deleteorders)
router.put("/:id", ordersapi.updateorders);
router.post("/", ordersapi.addorders);
router.get("/:id", ordersapi.getbyid);
router.get("/", ordersapi.getall);
module.exports = router;
