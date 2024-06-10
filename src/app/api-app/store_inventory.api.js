const store_inventoryclass = require("../../app/@core/model/product_categories");
exports.getall = async (req, res) => {
  let store_inventory = await store_inventoryclass.getallstore_inventory();
  res.status(200).json({
    store_inventory: store_inventory,
  });
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let store_inventory = await store_inventoryclass.getstore_inventorybyid(id);
  if (store_inventory.length == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({
    store_inventory: store_inventory,
  });
};
exports.addstore_inventory = async (req, res) => {
  let store_inventory = req.body;
  let result = await store_inventoryclass.addstore_inventory(store_inventory);
  res.status(201).json({
    store_inventory: result,
  });
};
exports.updatestore_inventory = async (req, res) => {
  let id = req.params.id;
  let store_inventory = req.body;
  let update = await store_inventoryclass.updatestore_inventory(id, store_inventory);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deletestore_inventory = async (req, res) => {
  let id = req.params.id;
  let deletestore_inventory = await store_inventoryclass.deletestore_inventory(id);
  if (deletestore_inventory.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
