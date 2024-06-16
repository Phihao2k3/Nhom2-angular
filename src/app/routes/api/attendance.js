const express = require("express");
const router = express.Router();
const multer = require("multer");

const attendanceapi = require("../../api-app/attendance.api");
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
router.get("/checkatt",attendanceapi.checkatt)
router.delete("/:id", attendanceapi.deleteattendance);
router.put("/:id", attendanceapi.updateattendance);
router.post("/", attendanceapi.addattendance);
router.get("/:id", attendanceapi.getbyid);
router.get("/", attendanceapi.getall);
module.exports = router;
