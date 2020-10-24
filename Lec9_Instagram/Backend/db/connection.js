// npm install mysql
const mysql = require("mysql");

const secrets = require("./secrets.json");

const connection = mysql.createConnection({
  host     : secrets.host,
  user     : secrets.user,
  password : secrets.password,
  database : secrets.database
});
 
connection.connect();
 


module.exports = connection;

