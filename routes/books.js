var express = require('express');
const { route } = require('.');
var router = express.Router();
var conn = require('../lib/db')
var dateTime = require('node-datetime');

/* GET home page. */
router.get('/', (req, res) => {
        var dt = dateTime.create();
        var formatted = dt.format('Y/m/d H:M:S');

        const today = new Date();
        var duedate = new Date();
            duedate.setDate(today.getDate(formatted) + 14);

        conn.query('SELECT * FROM books', (err, rows) => {
            if (err){
                res.render('books', { 
                    title: 'books', 
                    books: '',
                    dateTime: formatted,
                    date_due: duedate

                });
            }else{
                res.render('books', {
                    title: 'Books', 
                    books: rows,
                    dateTime: formatted,
                    date_due: duedate
                });
            }
        });
});

router.get('/search', (req, res) => {

    var dt = dateTime.create();
        var formatted = dt.format('Y/m/d H:M:S');

        const today = new Date();
        var duedate = new Date();
            duedate.setDate(today.getDate(formatted) + 14);

    var category_name = req.query.category_name;
    var sql = "SELECT * FROM library.books WHERE category_name LIKE '%"+ category_name +"%'";

    conn.query(sql , (err, rows) => {
        if (err){
            console.log(err)
            res.render('books', { 
                title: 'books', 
                books: '',
                dateTime: formatted,
                date_due: duedate

            });
        }else{
            res.render('books', {
                title: 'Books', 
                books: rows,
                dateTime: formatted,
                date_due: duedate
            });
        }
    });
});

router.post('/add', (req, res, next) => {

    conn.query('SELECT * FROM library.requests WHERE student_id =' + req.body.student_id, (err, results) => {
        // if (err) throw err;
        console.log(results.length <= 2 )
        if (results.length < 2 ){
            // console.log(results.length >= 2)
            let data = {
                student_id: req.body.student_id,
                book_id: req.body.book_id,
                date_requested: req.body.dateTime,
                due_date: req.body.dueDate
            }

            conn.query('INSERT INTO library.requests SET ?;',data, (err, results) => {
            if (err) throw err
            res.redirect('/books')
        })
        }else{
            console.log('error')
            req.flash('error', 'Maximum Books Reached')
            res.redirect('/books')
        }
        
    });
    
    

    
});


module.exports = router;