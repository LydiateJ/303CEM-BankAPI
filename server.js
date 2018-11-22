var bank_account = require("./api/v1.0/account");
var money_transfer = require("./api/v1.0/moneyTransfer");
var card_payment = require("./api/v1.0/cardPayment");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./database');


//start body-parser configuration
//start body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});

app.use('/api/v1.0/bank_account', bank_account);
app.use('/api/v1.0/money_transfer', money_transfer);
app.use('/api/v1.0/card_payment', card_payment);