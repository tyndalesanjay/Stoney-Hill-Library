var express = require('express');
var router = express.Router();
var conn = require('../lib/db')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login', { title: 'Trainee Login'});
});

// Auth
router.post('/authlogin', function(req, res, next) {
       
  var email = req.body.email;
  var password = req.body.password;
 
  conn.query('SELECT * FROM library.librarians WHERE email = ? AND BINARY password = ?', [email, password], function(err, results, fields) {
       
    // if login is incorrect or not found
    if (results.length <= 0) {
        req.flash('error', 'Invalid credentials Please try again!')
        res.redirect('/login')
    }
    else { // if login found
        //Assign session variables based on login credentials                
        req.session.loggedin = true;
        req.session.tid = results[0].id,
        req.session.f_name = results[0].f_name;
        req.session.email = results[0].email;
        res.redirect('/admin');
    }            
  })
})

// Logout user
// router.get('/logout', function (req, res) {
//   req.session.destroy();
//   req.flash('success', 'Enter Your Login Credentials');
//   res.redirect('/login');
// });

module.exports = router;