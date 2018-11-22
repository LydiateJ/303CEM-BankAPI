var mysql = require('mysql');

//start mysql connection
config = {
  host: 'localhost', //mysql database host name
  user: 'root', //mysql database user name
  password: '123456', //mysql database password
  database: '303CEM' //mysql database name
};

var db = mysql.createConnection(config);

db.connect(function (err) {
  if (err) throw err
  console.log('You are now connected...')
});

module.exports = db;