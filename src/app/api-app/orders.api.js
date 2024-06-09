const orders_class = require("../@core/model/orders");
exports.getall = async (req, res) => {
  let orders = await orders_class.getallorders();
  res.status(200).json({
    orders: orders,
  });
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let orders = await orders_class.getordersbyid(id);
  if (orders.length  == 0) {
    return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
  }
  res.status(200).json({
    orders: orders,
  });
};
exports.addorders = async (req, res) => {
  let orders = req.body;
  let result = await orders_class.addorders(orders);
  res.status(201).json({
    orders: result,
  });
};
exports.updateorders = async (req, res) => {
  let id = req.params.id;
  let orders = req.body;
  let update = await orders_class.updateorders(id, orders);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deleteorders = async (req, res) => {
  let id = req.params.id;
  let deleteorders = await orders_class.deleteorders(id);
  if (deleteorders.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
