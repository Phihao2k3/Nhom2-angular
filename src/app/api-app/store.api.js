const stores_class = require("../@core/model/stores");
exports.getall = async (req, res) => {
  let stores = await stores_class.getallstores();
  if (stores.length == 0) {
    return res.status(404).json({ message: "Không tìm thấy cửa hàng" });
  } else {
    res.status(200).json({
      stores: stores,
    });
  }
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let stores = await stores_class.getstoresbyid(id);
  if (stores.length == 0) {
    return res.status(404).json({ message: "Không tìm thấy Cửa hàng" });
  }
  res.status(200).json({
    stores: stores,
  });
};
exports.addstores = async (req, res) => {
  let stores = req.body;
  let result = await stores_class.addstores(stores);
  if (result.affectedRows == 0) {
    return res.status(500).json({ message: "Thêm cửa hàng không thành công" });
  } else {
    return res.status(201).json({ message: "Thêm cửa hàng thành công" });
  }
};
exports.updatestores = async (req, res) => {
  let id = req.params.id;
  let stores = req.body;
  let update = await stores_class.updatestores(id, stores);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy cửa hàng" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deletestores = async (req, res) => {
  let id = req.params.id;
  let deletestores = await stores_class.deletestores(id);
  if (deletestores.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy cửa hàng" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
