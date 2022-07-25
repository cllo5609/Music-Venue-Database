
// Setup
var express = require('express');
var app = express();
PORT = 37292;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');
app.use(express.static(__dirname + "/public"));

// Routes

// Homepage
app.get('/', (req, res) =>{
        res.render('index');
    });

// Venue Page
app.get('/venues', (req, res) =>{
        res.render('venues');
    });

app.get('/venue_mod', (req, res) =>{
        res.render('venue_mod');
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

// Ticket Invoices Page
app.get('/ticket_invoices', (req, res) =>{
    res.render('ticket_invoices');
});

// Artist Needs Instruments Page
app.get('/artist_needs_ins', (req, res) =>{
    res.render('artist_needs_ins');
});

// Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});