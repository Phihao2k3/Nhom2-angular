var db = require("./db");
class employees {
  constructor() {
    this.employees = [];
  }
  static async getallemployees() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM product_categories", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
  static async getemployeesbyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM product_categories WHERE employee_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addemployees(data) {
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
  static async updateemployees(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE product_categories SET ? WHERE employee_id  = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deleteemployees(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM product_categories WHERE employee_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = employees;