const passport = require('passport');

const router = require('express').Router();

function notAuthorized(req, res, next) {
    if(req.user) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}

router.get('/', notAuthorized, passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}), (req, res) => {
    res.send(req.user);
});

module.exports = router;