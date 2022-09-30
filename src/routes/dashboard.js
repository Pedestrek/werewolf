const router = require('express').Router();

function isAuthorized(req, res, next) {
    if(req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    console.log(`${req.user.username} just logged in`);
    res.render('dashboard');
});

router.get('/logout', isAuthorized, (req, res) => {
    console.log(`${req.user.username} logged out`);
    req.logOut(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
});

module.exports = router;