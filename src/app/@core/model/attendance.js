var db = require("./db");
class attendance {
  constructor() {
    this.attendance = [];
  }
  static async getallattendance() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT att.*, ep.first_name, ep.last_name FROM attendance att INNER JOIN employees ep ON att.employee_id = ep.employee_id ORDER BY att.attendance_id DESC;",
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async getattendancebyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM attendance WHERE attendance_id   = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addattendance(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO attendance SET ?",
        data,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async updateattendance(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE attendance SET ? WHERE attendance_id   = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deleteattendance(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM attendance WHERE attendance_id   = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static checkattendance(employee_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM `attendance` WHERE `date` = CURDATE() and employee_id = ? ",
        [employee_id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = attendance;
