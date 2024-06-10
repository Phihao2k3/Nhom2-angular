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
// oder_detail
const order_detail_class = require("../@core/model/oderdetail");
exports.getall_order_detail = async (req, res) => {
  let order_detail = await order_detail_class.getallorder_detail();
  res.status(200).json({
    order_detail: order_detail,
  });
};
exports.getbyid_order_detail = async (req, res) => {
  let id = req.params.id;
  let order_detail = await order_detail_class.getorder_detailbyid(id);
  if (order_detail.length == 0) {
    return res.status(404).json({ message: "Không tìm thấy chi tiết hóa đơn" });
  }
  res.status(200).json({
    order_detail: order_detail,
  });
};
exports.addorder_detail = async (req, res) => {
  let order_detail = req.body;
  let result = await order_detail_class.addorder_detail(order_detail);
  res.status(201).json({
    order_detail: result,
  });
};

