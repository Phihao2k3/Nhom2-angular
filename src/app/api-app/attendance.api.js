const attendanceclass = require("../../app/@core/model/attendance");

exports.getall = async (req, res) => {
  let attendance = await attendanceclass.getallattendance();
  res.status(200).json({
    attendance: attendance,
  });
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let attendance = await attendanceclass.getattendancebyid(id);
  if (attendance.length == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({
    attendance: attendance,
  });
};
exports.addattendance = async (req, res) => {
  let attendance = req.body;
  let result = await attendanceclass.addattendance(attendance);
  res.status(201).json({
    attendance: result,
  });
};
exports.updateattendance = async (req, res) => {
  let id = req.params.id;
  let attendance = req.body;
  let update = await attendanceclass.updateattendance(id, attendance);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deleteattendance = async (req, res) => {
  let id = req.params.id;
  let deleteattendance = await store_inventoryclass.deletestore_inventory(id);
  if (deletestore_inventory.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
exports.checkatt = async (req, res) => {
  let id = req.query.id;
  let attendance = await attendanceclass.checkattendance(id);
  if (attendance.length == 0) {
    return res.status(200).json({ status:false });
  }else{
    return res.status(200).json({ status:true });
  }
  
};
