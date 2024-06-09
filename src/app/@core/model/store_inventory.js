var db = require("./db");
class store_inventory {
  constructor() {
    this.store_inventory = [];
  }
  static async getallstore_inventory() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM product_categories", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
  static async getstore_inventorybyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM product_categories WHERE inventory_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addstore_inventory(data) {
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
  static async updatestore_inventory(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE product_categories SET ? WHERE inventory_id  = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deletestore_inventory(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM product_categories WHERE inventory_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = store_inventory;
