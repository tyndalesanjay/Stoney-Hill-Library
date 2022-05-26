var express = require('express');
var router = express.Router();
var conn = require('../lib/db')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('searchReq', {
    title: 'Books',
    results: ''
  });
});

router.get('/search', (req, res) => {

  var student_id = req.query.student_id;
  // var sql = "SELECT * FROM library.requests, library.students WHERE student_id LIKE '%"+ student_id +"%'";
  var sql = "SELECT rt.student_id, st.fname, st.lname, bt.book_name, rt.date_requested ,rt.due_date FROM library.requests rt, library.students st, library.books bt WHERE st.id LIKE '%"+ student_id +"%' AND rt.student_id = st.id AND bt.id = rt.book_id";

  conn.query(sql, (err, rows) => {
    
    if (student_id <= ''){
        console.log(student_id)
        res.redirect('/searchReq', 
        // { 
        //     title: 'books', 
        //     results: '',
        //   }
          );
    }
    else{
        console.log(student_id)
        res.render('searchReq', {
            title: 'Books', 
            results: rows
        });
    }
      
  });
});

module.exports = router;