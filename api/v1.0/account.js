var express = require('express');
var db = require('../../database');
const router = express.Router();

// To get all of the item data
router.get('/', (req, res, next) => {
    db.query('SELECT * FROM bank_account', (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

// To get a single item data
router.get('/:account_number', (req, res) => {
    db.query('SELECT * FROM bank_account WHERE account_number=?', req.params.account_number, (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

// To create a new item record in database 
router.post('/', (req, res) => {
    db.query('INSERT INTO bank_account SET ?', req.body, (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

// To add money
router.put('/add/:account_number', (req, res) => {
    db.query(
        'UPDATE bank_account SET account_balance = account_balance + ? WHERE account_number = ?',
        [req.body.amount, req.params.account_number], (error, results, fields) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
});

// To withdraw money
router.put('/withdraw/:account_number', (req, res) => {
    db.query(
        'UPDATE bank_account SET account_balance = account_balance - ? WHERE account_number = ?',
        [req.body.amount, req.params.account_number], (error, results, fields) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
});


// To update a user record in database
router.put('/:account_number', (req, res) => {
    db.query(
        'UPDATE bank_account SET transaction_from_account_number=?, transaction_to_account_number=?, transaction_amount=?, transaction_date=?, transaction_type=?, transaction_merchant=? WHERE account_number=?',
        [req.body.transaction_from_account_number, req.body.transaction_to_account_number, req.body.transaction_amount, req.body.transaction_date, req.body.transaction_type, req.body.transaction_merchant, req.params.account_number], (error, results, fields) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
});

// To delete a record from database
router.delete('/:account_number', (req, res) => {
    console.log(req.body);
    db.query('DELETE FROM bank_account WHERE account_number = ?', [req.params.account_number], (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

module.exports = router;

