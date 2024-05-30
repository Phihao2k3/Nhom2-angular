const productcateclass = require("../../app/@core/model/product_categories");
exports.getall = async (req, res) => {
  let productcate = await productcateclass.getallproductcate();
  res.status(200).json({
    productcate: productcate,
  });
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let productcate = await productcateclass.getproductcatebyid(id);
  if (productcate.length == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({
    productcate: productcate,
  });
};
exports.addproductcate = async (req, res) => {
  let productcate = req.body;
  let result = await productcateclass.addproductcate(productcate);
  res.status(201).json({
    productcate: result,
  });
};
exports.updateproductcate = async (req, res) => {
  let id = req.params.id;
  let productcate = req.body;
  let update = await productcateclass.updateproductcate(id, productcate);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deleteproductcate = async (req, res) => {
  let id = req.params.id;
  let deleteproductcate = await productcateclass.deleteproductcate(id);
  if (deleteproductcate.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy loại" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
