var db = require("./db");
class order_details {
  constructor() {
    this.order_details = [];
  }
  static async getallorder_detail() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM order_details ORDER BY order_detail_id DESC",
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async getorder_detailbyid(order_id) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM order_details odt JOIN products p ON odt.product_id = p.product_id WHERE order_id  = ?",
        [order_id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async addorder_detail(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO order_details SET ?",
        data,
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static async updateorder_details(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE order_details SET ? WHERE order_detail_id	  = ?",
        [data, id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static deleteorder_details(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM order_details WHERE order_detail_id	  = ?",
        [id],
        function (error, results, fields) {
          if (error) throw error;
          resolve(results);
        }
      );
    });
  }
  static getdoanhthusanpham() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
    DATE_FORMAT(o.order_date, '%Y-%m') AS month,
    SUM(od.quantity * od.price) AS total_revenue
FROM
    orders o
JOIN
    order_details od ON o.order_id = od.order_id
WHERE
    o.status = 'Thành công'
GROUP BY
    DATE_FORMAT(o.order_date, '%Y-%m');
`,
        function (error, results, fields) {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  }
}
module.exports = order_details;
