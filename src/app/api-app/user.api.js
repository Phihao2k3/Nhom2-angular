const user_class = require("../../app/@core/model/user");
exports.getall = async (req, res) => {
  let users = await user_class.getallusers();
  res.status(200).json({
    users: users,
  });
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let users = await user_class.getusersbyid(id);
  if (users.length  == 0) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  res.status(200).json({
    users: users,
  });
};
exports.addusers = async (req, res) => {
  let users = req.body;
  let result = await user_class.addusers(users);
  res.status(201).json({
    users: result,
  });
};
exports.updateusers = async (req, res) => {
  let id = req.params.id;
  let users = req.body;
  let update = await user_class.updateusers(id, users);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deleteusers = async (req, res) => {
  let id = req.params.id;
  let deleteusers = await user_class.deleteusers(id);
  if (deleteusers.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
