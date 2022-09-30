require('dotenv').config();
const express = require('express');
const app = express();
const IP_ADDRESS = process.env.IP_ADDRESS || 'localhost';
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./strategies/discordstrategy')
const db = require('./database/database');
const path = require('path');

const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/instructions', (req, res) => {
    res.render('instructions');
});

app.use(session({
    secret: 'random secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    resave: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Listening to http://${IP_ADDRESS}:${PORT}`);
});