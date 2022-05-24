var express = require('express');
var router = express.Router();
var conn = require('../lib/db')

/* GET home page. */
router.get('/', (req, res) => {
    if(req.session.loggedin === true){
        conn.query('SELECT * FROM requests', (err, results) => {
            if (err) {
                res.render('admin/index', { title: 'Landing'});
            }else {
                res.render('admin/index', { title: 'Lading'});
            }
        });
    } else {
        res.redirect('/login');
    }
});

// GET TRAINEES TABLE
router.get('/students', (req, res) => {
    conn.query('SELECT * FROM students', (err, results) => {
        if (err) {
            res.render('admin/trainees', { title: 'Trainees', trainees: ''});
        }else {
            res.render('admin/trainees', { title: 'Trainees', trainees: results});
        }
    });
});

// GET LUNCH TABLE
router.get('/lunches', (req, res) => {
    conn.query('SELECT * FROM requests', (err, results) => {
        if (err) {
            res.render('admin/lunches', { title: 'Lunch Ordered', requests: ''});
        }else {
            res.render('admin/lunches', { title: 'Lunch Ordered', requests: results});
        }
    });
});

module.exports = router;