var db = require("./db");
class productcate {
  constructor() {
    this.productcate = [];
  }
  static async getallproductcate() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM product_categories", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
  static async getproductcatebyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM product_categories WHERE category_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addproductcate(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO product_categories SET ?",
        data,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async updateproductcate(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE product_categories SET ? WHERE category_id  = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deleteproductcate(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM product_categories WHERE category_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = productcate;
