const express = require("express");
const router = express.Router();
const multer = require("multer");

const storesapi = require("../../api-app/store.api");
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
router.delete("/:id", storesapi.deletestores);
router.put("/:id", storesapi.updatestores);
router.post("/", storesapi.addstores);
router.get("/:id", storesapi.getbyid);
router.get("/", storesapi.getall);
module.exports = router;
