const employeesclass = require("../../app/@core/model/employees");
exports.getall = async (req, res) => {
  let employees = await employeesclass.getallemployees();
  res.status(200).json({
    employees: employees,
  });
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let employees = await employeesclass.getemployeesbyid(id);
  if (employees.length == 0) {
    return res.status(404).json({ message: "Không tìm thấy nhân viên" });
  }
  res.status(200).json({
    employees: employees,
  });
};
exports.addemployees = async (req, res) => {
  let employees = req.body;
  let result = await employeesclass.addemployees(employees);
  res.status(201).json({
    employees: result,
  });
};
exports.updateemployees = async (req, res) => {
  let id = req.params.id;
  let employees = req.body;
  let update = await employeesclass.updateemployees(id, employees);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy nhân viên" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deleteemployees = async (req, res) => {
  let id = req.params.id;
  let deleteemployees = await employeesclass.deleteemployees(id);
  if (deleteemployees.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy nhân viên" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
exports.timkiem = async (req, res) => {
  const keyword = req.query.keyword
  let employees = await employeesclass.timkiemnhanvien(keyword);
  res.status(200).json({
    employees: employees,
    keyword: keyword
  })
}