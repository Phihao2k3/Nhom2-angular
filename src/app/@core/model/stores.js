var db = require("./db");
class stores {
  constructor() {
    this.stores = [];
  }
  static async getallstores() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM stores",
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async getstoresbyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM stores WHERE store_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addstores(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO stores SET ?",
        data,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async updatestores(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE stores SET ? WHERE store_id  = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deletestores(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM stores WHERE store_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = stores;
