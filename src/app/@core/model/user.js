var db = require("./db");
class users {
  constructor() {
    this.users = [];
  }
  static async getallusers() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users ORDER BY user_id DESC", function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  }
  static async getusersbyid(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addusers(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users SET ?",
        data,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async updateusers(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET ? WHERE user_id  = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deleteusers(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM users WHERE user_id  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static login(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [data.email, data.password],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }

  static forgotPassword(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
}
module.exports = users;
