var express = require('express');
const { route } = require('.');
var router = express.Router();
var conn = require('../lib/db')
var dateTime = require('node-datetime');

/* GET home page. */
router.get('/', (req, res) => {
    // CHECK LOGIN
    // if(req.session.loggedin === true){
        var dt = dateTime.create();
        var formatted = dt.format('Y-m-d H:M:S');

        conn.query('SELECT * FROM books', (err, rows) => {
            if (err){
                res.render('meals', { 
                    title: 'books', 
                    books: '',
                    dateTime: formatted
                });
            }else{
                res.render('meals', {
                    title: 'Books', 
                    books: rows,
                    dateTime: formatted
                });
            }
        });
});

// router.post('/add', (req, res) => {
//     var train = "INSERT INTO cafeteria.lunchtbl (option_name, trainee_id, date) VALUES ('" + req.body.option_name + 
//     "', '" + req.body.trainee_id +
//     "', '" + req.body.date +
//     "')";
//     conn.query(train, (err, results) => {
//         if (err) throw err
//         res.send(results)
//     });
// });


module.exports = router;