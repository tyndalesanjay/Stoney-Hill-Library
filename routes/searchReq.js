var express = require('express');
var router = express.Router();
var conn = require('../lib/db')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('searchReq', {
    title: 'Books Requests',
    results: ''
  });
});

router.get('/search', (req, res) => {

  var student_id = req.query.student_id;
  var sql = "SELECT rt.id, rt.book_id, rt.student_id, st.fname, st.lname, bt.book_name, rt.date_requested ,rt.due_date FROM library.requests rt, library.students st, library.books bt WHERE st.id LIKE '%"+ student_id +"%' AND rt.student_id = st.id AND rt.book_id = bt.id ";

  conn.query(sql, (err, rows) => {
    
    if (student_id <= ''){
          // console.log(student_id)
          res.redirect('/searchReq'
        );
    }
    else{
        // console.log(student_id)
        res.render('searchReq', {
            title: 'Books Requests', 
            results: rows
        });
    }
      
  });
});

router.get('/searchoverdue', (req, res) => {

  var student_id = req.query.student_id;
  var sql = "SELECT rt.id, rt.book_id, rt.student_id, st.fname, st.lname, bt.book_name, rt.date_requested ,rt.due_date, DATE(due_date) AS overdue FROM library.requests rt, library.students st, library.books bt WHERE st.id LIKE '%"+ student_id +"%' AND rt.student_id = st.id AND rt.book_id = bt.id AND DATE(due_date) < now()";

  conn.query(sql, (err, rows) => {
    
    if (student_id <= ''){
          // console.log(student_id)
          res.redirect('/stoverdue'
        );
    }
    else{
        // console.log(student_id)
        // console.log(rows)
        res.render('stoverdue', {
            title: 'Books', 
            results: rows
        });
    }
      
  });
});

// Return books
router.get('/delete/:id', (req, res) => {

  conn.query('DELETE FROM library.requests WHERE id =' + req.params.id, (err, results) => {
    console.log(req.params.id)
    if (err) throw err
    res.redirect('/searchReq')
  });
});

// router.get('/delete/:id', function(req, res, next) {
      
//   conn.query('DELETE FROM requests WHERE id='+ req.params.id, function(err,row)     {
//          if(err) throw err
//           // res.redirect('/searchReq');   
//           next();      
                             
//   });
         
// });

module.exports = router;