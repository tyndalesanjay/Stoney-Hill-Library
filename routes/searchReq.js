var express = require('express');
var router = express.Router();
var conn = require('../lib/db')

/* GET home page. */
router.get('/', (req, res) => {

  res.render('searchReq', {
    title: 'Books',
    results: ''
});

    // conn.query('SELECT * FROM requests', (err, rows) => {
    //     if (err){
    //         res.render('searchReq', { 
    //             title: 'Book Request', 
    //             results: '',
    //         });
    //     }else{
    //         res.render('searchReq', {
    //             title: 'Books', 
    //             results: rows
    //         });
    //     }
    // });
});

router.get('/search', (req, res) => {

  var student_id = req.query.student_id;
  // var sql = "SELECT * FROM library.requests, library.students WHERE student_id LIKE '%"+ student_id +"%'";
  var sql = "SELECT rt.student_id, st.fname, st.lname, bt.book_name, rt.due_date FROM library.requests rt, library.students st, library.books bt WHERE st.id LIKE '%"+ student_id +"%' AND rt.student_id = st.id AND bt.id = rt.book_id";

  conn.query(sql , (err, rows) => {
    console.log(rows)
      if (err){
          console.log(err)
          res.render('searchReq', { 
              title: 'books', 
              results: '',
            });
            console.log(results)
      }else{
          res.render('searchReq', {
              title: 'Books', 
              results: rows
          });
      }
  });
});

module.exports = router;