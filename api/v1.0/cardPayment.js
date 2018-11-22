var express = require('express');
var db = require('../../database');
const router = express.Router();


// To create a new item record in database 
router.post('/', (req, res) => {
    var paymentData = req.body;
    db.query('INSERT INTO card_payment SET ?, payment_date = NOW()', paymentData, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            db.query(
                'UPDATE bank_account SET account_balance = account_balance - ? WHERE account_number = ?',
                [req.body.payment_amount, req.body.payment_account_number], (error, results, fields) => {
                    if (error) throw error;
                    res.end(JSON.stringify(results));
                }
            );
        }
        res.end(JSON.stringify(results));
    });
});

module.exports = router;