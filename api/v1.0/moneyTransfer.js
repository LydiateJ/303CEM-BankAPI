var express = require('express');
var db = require('../../database');
const router = express.Router();

// To create a new item record in database 
router.post('/', (req, res) => {
    var transferData = req.body;
    db.query('INSERT INTO money_transfer SET ?, transaction_date = NOW()', transferData, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            db.query(
                'UPDATE bank_account SET account_balance = account_balance + ? WHERE account_number = ?',
                [req.body.transaction_amount, req.body.transaction_to_account_number], (error, results, fields) => {
                    if (error) throw error;
                    res.end(JSON.stringify(results));
                }
            );

            db.query(
                'UPDATE bank_account SET account_balance = account_balance - ? WHERE account_number = ?',
                [req.body.transaction_amount, req.body.transaction_from_account_number], (error, results, fields) => {
                    if (error) throw error;
                    res.end(JSON.stringify(results));
                }
            );
        }
        res.end(JSON.stringify(results));
    });
});

/*
// To create a new item record in database 
router.put('/', (req, res) => {
    var newAccountData  = req.body;
    db.query('INSERT INTO bank_account SET ?', newAccountData, (error, results, fields) => {
       if (error) throw error;
       res.end(JSON.stringify(results));
    });
});
*/

module.exports = router;
