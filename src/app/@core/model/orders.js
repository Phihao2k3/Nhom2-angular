var db = require("./db");
class orders {
  constructor() {
    this.orders = [];
  }
  static async getallorders() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM orders",
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async getordersbyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM orders WHERE order_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addorders(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO orders SET ?",
        data,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async updateorders(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE orders SET ? WHERE order_id  = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deleteorders(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM orders WHERE order_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = orders;
