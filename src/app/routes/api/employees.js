const express = require("express");
const router = express.Router();
const multer = require("multer");

const employeesapi = require("../../api-app/employee.api");
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
router.delete("/:id", employeesapi.deleteemployees);
router.put("/:id", employeesapi.updateemployees);
router.post("/", employeesapi.addemployees);
router.get("/:id", employeesapi.getbyid);
router.get("/", employeesapi.getall);
module.exports = router;
