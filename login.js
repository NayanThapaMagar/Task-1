const jwt = require("jsonwebtoken");
const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "test1",
});

module.exports = (req, res) => {
  const { userName, password } = req.body;
  const sql = `SELECT * FROM admin WHERE userName = '${userName}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length == 0) {
      return res.json({ success: false, message: "Admin doesn't exist!!!" });
    } else {
      const admin = result[0];
      if (password != admin.password) {
        return res.json({ success: false, message: "Incorrect Password!!!" });
      } else {
        const token = jwt.sign(
          {
            id: admin.id,
            userName: admin.userName,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "24h" }
        );
        res.cookie("token", token);
        res.cookie("contact", admin.contact);
        return res.json({ success: true, message: "Login Successful", 
          id: admin.id,
          userName: admin.userName,
          token: process.env.TOKEN_SECRET
        });
      }
    }
  });
};
