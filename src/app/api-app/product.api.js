const product_class = require("../../app/@core/model/product");
exports.getall = async (req, res) => {
  let product = await product_class.getallproduct();
  res.status(200).json({
    product: product,
  });
};
exports.getbyid = async (req, res) => {
  let id = req.params.id;
  let product = await product_class.getproductbyid(id);
  if (product.length  == 0) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
  res.status(200).json({
    product: product,
  });
};
exports.addproduct = async (req, res) => {
  let product = req.body;
  let result = await product_class.addproduct(product);
  res.status(201).json({
    product: result,
  });
};
exports.updateproduct = async (req, res) => {
  let id = req.params.id;
  let product = req.body;
  let update = await product_class.updateproduct(id, product);
  if (update.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
  res.status(200).json({ message: "Cập nhật thành công" });
};
exports.deleteproduct = async (req, res) => {
  let id = req.params.id;
  let deleteproduct = await product_class.deleteproduct(id);
  if (deleteproduct.affectedRows == 0) {
    return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
  res.status(200).json({ message: "Xóa thành công" });
};
