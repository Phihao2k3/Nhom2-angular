var db = require("./db");
class employees {
  constructor() {
    this.employees = [];
  }
  static async getallemployees() {
    return new Promise((resolve, reject) => {
      db.query("SELECT emp.*, str.store_name FROM employees emp INNER JOIN stores str ON emp.store_id = str.store_id ", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
  static async getemployeesbyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM employees WHERE employee_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  } static async timkiemnhanvien(name) {
    return new Promise((resolve, reject) => {
      // Construct the search term with % around the name
      const searchTerm = `%${name}%`;

      // Use parameterized query with LIKE for wildcard matching
      db.query(
        'SELECT * FROM employees WHERE last_name LIKE ?',
        [searchTerm],
        (error, results, fields) => {
          if (error) {
            reject(error); // Reject promise if there's an error
          } else {
            resolve(results); // Resolve with the query results
          }
        }
      );
    });
  }


  static async addemployees(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO employees SET ?",
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
        "UPDATE employees SET ? WHERE employee_id   = ?",
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
        "DELETE FROM employees WHERE employee_id  = ?",
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
