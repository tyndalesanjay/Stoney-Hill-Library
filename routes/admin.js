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
    if(req.session.loggedin === true){
    conn.query('SELECT * FROM students', (err, results) => {
        if (err) {
            res.render('admin/students', { title: 'Students', students: ''});
        }else {
            res.render('admin/students', { title: 'Students', students: results});
        }
    });
    } else {
        res.redirect('/login');
    }
});

// GET LUNCH TABLE
router.get('/requests', (req, res) => {
    if(req.session.loggedin === true){
    conn.query('SELECT * FROM requests', (err, results) => {
        if (err) {
            res.render('admin/requests', { title: 'Lunch Ordered', requests: ''});
        }else {
            res.render('admin/requests', { title: 'Lunch Ordered', requests: results});
        }
    });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;