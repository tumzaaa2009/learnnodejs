var express = require('express');
const router = require('./users.js');
const app = express();
const mysql = require('mysql2');
const dbConfig = require("../config/db");
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { json } = require('body-parser'); // parse requests of content-type: application/json  //use ใช้ liberry


//middlewar //
app.use(bodyParser.json()); //อ่านค่า  json ผ่าน api // // parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));//อ่านค่า  json ผ่าน api สำคัญ
app.use(express.static('./public')); // public เป็น html
app.use(morgan('short'));  //แจ้ง error ว่า get อะไร ส่วนใหญ่ใช้ dev
app.use(router);
//
connection.connect(error => {
  if (error) { console.log(error); } else {
    console.log("Successfully connected to the database.");
    // simple route
    app.get("/", (req, res) => {
      const sql = "SELECT * FROM user_type";
      connection.query(sql, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
    });
    app.get("/test/:id", (req, res) => {
      const sql = "SELECT * FROM user_type where user_type_id ='" + req.params.id + "' ";
      connection.query(sql, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    });
    app.post("/add", (req, res) => {
      const data = { name: req.body.name };
      const sql = "INSERT INTO user_type (user_type_name) VALUE ('" + req.body.name + "') ";
      connection.query(sql, req.body.name, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      })
    });
    /// learn 17/10/2563
    app.get("/users", (req, res) => {
      const data = { fistname: "navavapon", lastname: "yoidee" };

    });
    app.post("/useradd", (req, res) => {
      const data = req.body;
      console.log(JSON.stringify(data));
      res.end();
    });

    // set port, listen for requests
    app.listen(8080,"192.168.1.36", () => {
      console.log("Server is running on port 192.168.1.36:8080.");
    });
  }
});



module.exports = router;