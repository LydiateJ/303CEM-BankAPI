var mysql = require('mysql');

//start mysql connection
config = {
  host: '10.5.5.26', //mysql database host name
  user: 'root', //mysql database user name
  password: '303cem', //mysql database password
  database: 'bankDB' //mysql database name
};

var db = mysql.createConnection(config);

db.connect(function (err) {
  if (err) throw err
  console.log('You are now connected...')
});

// Creating the bank account table
db.query('CREATE TABLE IF NOT EXISTS `bank_account` (' +
  '`account_number` int(11) NOT NULL,' +
  '`account_type` varchar(255) DEFAULT NULL,' +
  '`account_limits` int(11) DEFAULT NULL,' +
  '`account_balance` int(11) DEFAULT "0",' +
  '`first_name` varchar(255) DEFAULT NULL,' +
  '`surname` varchar(255) DEFAULT NULL,' +
  '`email` varchar(255) DEFAULT NULL,' +
  '`phone_number` int(11) DEFAULT NULL,' +
  'PRIMARY KEY (`account_number`)' +
  ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;', (error, results, fields) => {
    if (error) throw error;
  });

db.query('CREATE TABLE IF NOT EXISTS `card_payment` (' +
  '`payment_id` int(11) NOT NULL AUTO_INCREMENT,' +
  '`payment_account_number` int(11) DEFAULT NULL,' +
  '`payment_amount` int(11) DEFAULT NULL,' +
  '`payment_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,' +
  'PRIMARY KEY (`payment_id`)' +
  ') ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;', (error, results, fields) => {
    if (error) throw error;
  });

db.query('CREATE TABLE IF NOT EXISTS `money_transfer` (' +
  '`transaction_id` int(11) unsigned NOT NULL AUTO_INCREMENT,' +
  '`transaction_from_account_number` int(11) DEFAULT NULL,' +
  '`transaction_to_account_number` int(11) DEFAULT NULL,' +
  '`transaction_amount` int(11) DEFAULT NULL,' +
  '`transaction_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,' +
  '`transaction_type` varchar(255) DEFAULT NULL,' +
  '`transaction_merchant` varchar(255) DEFAULT NULL,' +
  'PRIMARY KEY (`transaction_id`)' +
  ') ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;', (error, results, fields) => {
    if (error) throw error;
  });

module.exports = db;