
// Setup

var express = require('express');
var app = express();
PORT = 37293;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

// Routes

// Homepage
app.get('/', (req, res) =>{
        res.render('index');
    });

// Venue Page
app.get('/venues', (req, res) =>{
        res.render('venues');
    });

// Rooms Page
app.get('/rooms', (req, res) =>{
    res.render('rooms');
});

// Performances Page
app.get('/performances', (req, res) =>{
    res.render('performances');
});

// Artists Page
app.get('/artists', (req, res) =>{
    res.render('artists');
});

// Instruments Page
app.get('/instruments', (req, res) =>{
    res.render('instruments');
});

// Tickets Page
app.get('/tickets', (req, res) =>{
    res.render('tickets');
});

// Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});