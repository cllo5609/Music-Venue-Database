const util = require('util');
require('util.promisify').shim();

const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);

// Setup
// express
var express = require('express');
var app = express();
PORT = 2159;

// express-handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// database
var db = require('./database/db-connector')     // require the db file

// Routes

// Homepage
app.get('/', (req, res) =>{
    res.render('index');
});

// Venue Page
app.get('/venues', (req, res) =>{
    let query_venues = "SELECT name, address, city, state, zip, phone, num_rooms, total_capacity FROM Venues;";
    db.pool.query(query_venues, function(errors, rows, fields) {
        res.render('venues', {data:rows})
    });
});

app.get('/venue_mod', (req, res) =>{
    res.render('venue_mod');
});

// Rooms Page
app.get('/rooms', (req, res) =>{
    let query_rooms = "SELECT Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id;";
    db.pool.query(query_rooms, function(errors, rows, fields) {
        res.render('rooms', {data:rows});
    });
});

app.post('/add-room', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Capture NULL values
    let Capacity = parseInt(data.Capacity);
    if (isNaN(Capacity))
    {
        Capacity = 'NULL'
    }

    let Adult = parseInt(data.Adult);
    if (isNaN(Adult))
    {
        Adult = 'NULL'
    }

    // INSERT INTO Rooms (name, venue, capacity, over_21)
    // VALUES  ('Slice', (SELECT venue_id FROM Venues WHERE name = 'SOMA'), 20, 1)
    // -- VALUES (:rNameInput, :rVenueSelect, :rCapacityInput, :adultVenueInput);
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Rooms (name, capacity, venue, over_21) VALUES ('${data.Room}', '${Capacity}', ${data.Venue}, ${Adult})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = "SELECT Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    console.log("chickens");
                    res.send(rows);
                }
            })
        }
    })
});

// Performances Page
app.get('/performances', (req, res) =>{
    let query_performances = "SELECT Artists.name, Performances.performance_date, ticket_price, Performances.tickets_available FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id;";
    db.pool.query(query_performances, function(errors, rows, fields) {
        res.render('performances', {data:rows});
    });
});

// Artists Page
app.get('/artists', (req, res) =>{
    let query_artists = "SELECT name, email, phone, genre FROM Artists;";
    db.pool.query(query_artists, function(errors, rows, fields) {
        res.render('artists', {data:rows});
    });
});

// Instruments Page
app.get('/instruments', (req, res) =>{
    let query_instruments = "SELECT instrument_id, instrument_type FROM Instruments;";
    db.pool.query(query_instruments, function(errors, rows, fields) {
        res.render('instruments', {data:rows});
    });
});

// Tickets Page
app.get('/tickets', (req, res) =>{
    let query_tickets = "SELECT ticket_id, ticket_price FROM Tickets;";
    db.pool.query(query_tickets, function(errors, rows, fields) {
        res.render('tickets', {data:rows});
    });
});

// Ticket Invoices Page
app.get('/ticket_invoices', (req, res) =>{
    let query_ticket_invoices = "SELECT Ticket_Invoices.event_id AS 'Invoice', Artists.name AS 'Performing', Venues.name AS 'Location', Rooms.name AS 'Room', Performances.performance_date AS 'Date', ticket_price AS 'Price' FROM Tickets INNER JOIN Ticket_Invoices ON Tickets.ticket_id=Ticket_Invoices.ticket_id INNER JOIN Performances ON Ticket_Invoices.performance_id=Performances.performance_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id INNER JOIN Venues ON Rooms.venue=Venues.venue_id;";
    db.pool.query(query_ticket_invoices, function(errors, rows, fields) {
        res.render('ticket_invoices', {data:rows});
    });
});

// Artist Needs Instruments Page
app.get('/artist_needs_ins', (req, res) =>{
    let query_artist_needs_ins = "SELECT Artists.name AS 'Band', Instruments.instrument_type AS 'Gear' FROM Artists INNER JOIN Artist_Needs_Instruments ON Artists.artist_id=Artist_Needs_Instruments.artist_id INNER JOIN Instruments ON Artist_Needs_Instruments.instrument_id=Instruments.instrument_id;";
    db.pool.query(query_artist_needs_ins, function(errors, rows, fields) {
        res.render('artist_needs_ins', {data:rows});
    });
});

// Listener
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});