const express = require("express");
const router = express.Router();
const multer = require("multer");

const usersapi = require("../../api-app/user.api");
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
router.post("/reset", usersapi.resetPassword);
router.get("/reset", usersapi.showResetPassword);

router.post("/forgotpassword", usersapi.forgotpassword);
router.post("/login", usersapi.login);
router.delete("/:id",usersapi.deleteusers)
router.put("/:id", usersapi.updateusers);
router.post("/", usersapi.addusers);
router.get("/:id", usersapi.getbyid);
router.get("/", usersapi.getall);
// login
module.exports = router;
