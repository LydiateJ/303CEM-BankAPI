var express = require('express');
var db = require('../../database');
const router = express.Router();


function getAllBankAccounts(res) {
    db.query('SELECT * FROM bank_account', (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
}

function getAccountByAccountNumber(accountNumber, res) {
    db.query('SELECT * FROM bank_account WHERE account_number=?', accountNumber, (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
}

function createAnAccount(accountData, res) {
    db.query('INSERT INTO bank_account SET ?', accountData, (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
}

function addMoneyToAccountByAccountNumber(account_number, amount, res) {
    db.query(
        'UPDATE bank_account SET account_balance = account_balance + ? WHERE account_number = ?',
        [amount, account_number], (error, results, fields) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
}

function withdrawMoneyByAccountNumber(account_number, amount, res) {
    db.query(
        'UPDATE bank_account SET account_balance = account_balance - ? WHERE account_number = ?',
        [amount, account_number], (error, results, fields) => {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
}


// To get all of the item data
router.get('/', (req, res, next) => {
    getAllBankAccounts(res);
});

// To get a single item data
router.get('/:account_number', (req, res) => {
    getAccountByAccountNumber(req.params.account_number, res);
});

// To create a new item record in database 
router.post('/', (req, res) => {
    createAnAccount(req.body, res);
});

// To add money
router.put('/add/:account_number', (req, res) => {
    addMoneyToAccountByAccountNumber(req.params.account_number, req.body.amount, res);
});

// To withdraw money
router.put('/withdraw/:account_number', (req, res) => {
    withdrawMoneyByAccountNumber(req.params.account_number, req.body.amount, res);
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

