const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "test1",
});

module.exports = (req, res) => {
  const { userName, password, rePassword } = req.body;
  console.log(userName);
  const sql1 = `INSERT INTO admin (userName, password, rePassword) VALUES ('${userName}', '${password}', '${rePassword}')`;
  db.query(sql1, (err, result) => {
      if (err) throw err;
      return res.json({ success: true, message: "Regestration Successful. Admin Created" });
  });
};