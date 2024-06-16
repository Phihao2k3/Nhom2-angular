var db = require("./db");
class product {
  constructor() {
    this.product = [];
  }
  static async getallproduct() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM products ORDER BY product_id DESC", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
  static async getproductbyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM products WHERE product_id = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addproduct(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO products SET ?",
        data,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async updateproduct(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE products SET ? WHERE product_id = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deleteproduct(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM products WHERE product_id = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = product;
