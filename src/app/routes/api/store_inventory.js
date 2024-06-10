const express = require("express");
const router = express.Router();
const multer = require("multer");

const store_inventoryapi = require("../../api-app/store_inventory.api");
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
router.delete("/:id", store_inventoryapi.deletestore_inventory);
router.put("/:id", store_inventoryapi.updatestore_inventory);
router.post("/", store_inventoryapi.addstore_inventory);
router.get("/:id", store_inventoryapi.getbyid);
router.get("/", store_inventoryapi.getall);
module.exports = router;
