var db = require("./db");
class store_inventory {
  constructor() {
    this.store_inventory = [];
  }
  static async getallstore_inventory() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM store_inventory", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
  static async getstore_inventorybyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM store_inventory WHERE inventory_id  = ?",
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
        "INSERT INTO store_inventory SET ?",
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
        "UPDATE store_inventory SET ? WHERE inventory_id  = ?",
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
        "DELETE FROM store_inventory WHERE inventory_id  = ?",
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
