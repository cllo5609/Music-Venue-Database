/*
    Authors:    Charles D. Maddux
                Clinton Lohr
    Date:       7 Aug 2022
    Rev Date:   7 Aug 2022
    Description: Rooms Entity - javascript for ADD
    Sources:    Code for 'get', 'post' and 'put' requests inherited from https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

/*
################### Setup ###################
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
PORT = 37296;

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');
app.use(express.static(__dirname + "/public"));


/*
################### Routes ###################
*/


/*
############## Hompage
*/
app.get('/', (req, res) =>{
    res.render('index');

});


/*
############## Venues Page
*/
app.get('/venues', (req, res) =>{
    let query_venues = "SELECT venue_id as ID, name AS 'Name', address AS 'Address', city AS 'City', state as 'State', zip AS 'Zip', phone AS 'Phone', num_rooms AS 'Rooms', total_capacity AS 'Capacity' FROM Venues;";
    db.pool.query(query_venues, function(errors, rows, fields) {
        res.render('venues', {data:rows})
    });
});

app.post('/add-venue', (req, res) =>{
    let data = req.body;
    // CREATE query
    console.log(data)
    query1 = `INSERT INTO Venues (name, address, city, state, zip, phone, num_rooms, total_capacity) VALUES ("${data.vname}", '${data.vaddress}', '${data.vcity}', '${data.vstate}', ${data.vzip}, ${data.vphone}, ${data.vrooms}, ${data.vcapacity})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Venues;';
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    console.log("SENDIng")
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-venue/', function(req,res,next){
    let data = req.body;
    let venueID = parseInt(data.id);
    console.log("ID", venueID)
    let deleteVenueQuery = `DELETE FROM Venues WHERE venue_id = ?`;

          db.pool.query(deleteVenueQuery, [venueID], function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {
                res.sendStatus(204);
              }
  })});

app.put('/update-venue', function(req,res,next){
    let data = req.body;

    // Issue with Query
    let queryUpdateVenue = `UPDATE Venues SET venue_id = ${data.vid}, name = "${data.vname}", address = "${data.vaddress}", city = "${data.vcity}", state = "${data.vstate}", zip = ${data.vzip}, phone = ${data.vphone}, num_rooms = ${data.vrooms}, total_capacity = ${data.vcapacity} WHERE venue_id = ${data.vid}`;
    let selectVenue = `SELECT * FROM Venues WHERE venue_id = ${data.vid}`;
    console.log(queryUpdateVenue)

          db.pool.query(queryUpdateVenue, function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {

                  db.pool.query(selectVenue, function(error, rows, fields) {

                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                            console.log("SENDIT")
                          res.send(rows);
                      }
                  })
              }
  })
});


/*
############## Rooms Page
*/
app.get('/rooms', (req, res) =>{
    let query1 = "SELECT Rooms.room_id AS 'ID', Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id ORDER BY id;";
    let query2 = "SELECT * FROM Venues;"
    db.pool.query(query1, function(errors, rows, fields) {
        let room = rows;

        db.pool.query(query2, function(errors, rows, fields) {
            let venue = rows;

            res.render('rooms', {data:room, venue: venue});

        });
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

    // Create the query and run it on the database
    query1 = `INSERT INTO Rooms (name, capacity, venue, over_21) VALUES ('${data.Room}', ${Capacity}, ${data.Venue}, ${Adult})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Rooms
            query2 = "SELECT Rooms.room_id AS 'ID', Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id ORDER BY id;";
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    console.log("SENDING")
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete-room/', function(req,res,next){
    let data = req.body;
    let roomID = parseInt(data.id);
    let deleteInvoice = `DELETE FROM Ticket_Invoices WHERE ticket_id = ?`;
    let deleteRoom= `DELETE FROM Rooms WHERE room_id = ?`;
    console.log("DATA", data)
    // Run the 1st query
    db.pool.query(deleteInvoice, [roomID], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

        else {
            // Run the second query
            db.pool.query(deleteRoom, [roomID], function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    res.sendStatus(204);
                }
            });
        }
    });
});

app.put('/update-room', function(req,res,next){
    let data = req.body;

    // Capture NULL values
    let Capacity = parseInt(data.rCapacityInput);
    if (isNaN(Capacity)) {
        Capacity = 'NULL'
    }
    let Venue = parseInt(data.rVenueInput);
    if (isNaN(Venue)) {
        Venue = 'NULL'
    }
    let Adult = parseInt(data.rAdultEventInput);
    if (isNaN(Adult)) {
        Adult = 'NULL'
    }

    // Issue with Query
    let queryUpdateRoom = `UPDATE Rooms SET name = '${data.rNameInput}', capacity = ${Capacity}, venue = ${Venue}, over_21 = ${Adult} WHERE room_id = ${data.id}`;
    let selectRoom = `SELECT Rooms.room_id AS 'id', Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id WHERE Rooms.room_id = ${data.id}`;

    db.pool.query(queryUpdateRoom, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            db.pool.query(selectRoom, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    console.log("SENDIT")
                    res.send(rows);
                }
            });
        }
    });
});


/*
############## Performances Page
*/

app.get('/performances', (req, res) =>{
    let query_performances;
    if (req.query.search === undefined)  // if we are loading the entire table
    {
        query_performances = "SELECT Performances.performance_id AS 'ID', Artists.name AS 'Artist', Performances.performance_date AS 'Date', Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id ORDER BY ID;";
    }
    else if (req.query.search === "reset") // if we are loading the entire table
    {
        query_performances = "SELECT Performances.performance_id AS 'ID', Artists.name AS 'Artist', Performances.performance_date AS 'Date', Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id ORDER BY ID;";
    }

    else    // if we are loading a table with only a specified artist
    {
        query_performances = `SELECT Performances.performance_id AS 'ID', Artists.name AS 'Artist', Performances.performance_date AS 'Date', Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id WHERE Artists.artist_id = "${req.query.search}" ORDER BY ID;`
    }

    let query2 = "SELECT * FROM Artists;";
    let query3 = "SELECT * FROM Rooms;";
    let query4 = "SELECT * FROM Tickets;";

    db.pool.query(query_performances, function(errors, rows, fields) {
        let perf = rows;
        db.pool.query(query2, (error, rows, fields) => {
            let artists = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let rooms = rows;
                db.pool.query(query4, (error, rows, fields) => {
                    let prices = rows;

                    res.render('performances', {data:perf, artists:artists, rooms:rooms, prices:prices});
                });
            });
        });
    });
});


app.post('/add-performance', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let Artist = parseInt(data.Artist);
    if (isNaN(Artist)) {
        Artist = 'NULL'
    }
    let Room = parseInt(data.Room);
    if (isNaN(Room)) {
        Room = 'NULL'
    }
    let Price = parseInt(data.Price);
    if (isNaN(Price)) {
        Price = 'NULL'
    }
    let Available = parseInt(data.Available);
    if (isNaN(Available)) {
        Available = 'NULL'
    }
    console.log("Data: ", Available);

    // Create the query and run it on the database
    query1 = `INSERT INTO Performances (performance_date, artist_id, ticket_id, room_id, tickets_available) VALUES ('${data.Date}', ${Artist}, ${Price}, ${Room}, ${Available})`;
    db.pool.query(query1, function(error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Performances
            query2 = "SELECT Performances.performance_id AS 'id', Artists.name AS 'Artist', Performances.performance_date AS 'Date', Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id ORDER BY id;";
            db.pool.query(query2, function(error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    console.log("SENDING");
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/delete-performance', function(req,res,next){
    let data = req.body;
    let perfID = parseInt(data.id);
    let deleteInvoice = `DELETE FROM Ticket_Invoices WHERE performance_id = ?`;
    let deletePerformance= `DELETE FROM Performances WHERE performance_id = ?`;

        // Run the 1st query
        db.pool.query(deleteInvoice, [perfID], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }

            else {
                // Run the second query
                db.pool.query(deletePerformance, [perfID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
            });
        };
    });
});

app.put('/update-performance', function(req,res,next){
    let data = req.body;

    // Capture NULL values
    let Artist = parseInt(data.Artist);
    if (isNaN(Artist)) {
        Artist = 'NULL'
    }
    let Room = parseInt(data.Room);
    if (isNaN(Room)) {
        Room = 'NULL'
    }
    let Price = parseInt(data.Price);
    if (isNaN(Price)) {
        Price = 'NULL'
    }
    let Available = parseInt(data.Available);
    if (isNaN(Available)) {
        Available = 'NULL'
    }
    // Issue with Query
    let queryUpdatePerformances = `UPDATE Performances SET artist_id = ${Artist}, room_id = ${Room}, performance_date = '${data.Date}', ticket_id = ${Price}, tickets_available = ${Available} WHERE performance_id = ${data.id}`;
    let selectPerformances = `SELECT Performances.performance_id AS 'id', Artists.name AS 'Artist', Performances.performance_date AS 'Date', Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id WHERE performance_id = ${data.id}`;

    db.pool.query(queryUpdatePerformances, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            db.pool.query(selectPerformances, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    console.log("SENDIT")
                    res.send(rows);
                }
            });
        }
    });
});


/*
############## Artists Page
*/
app.get('/artists', (req, res) =>{
    let query_artists = "SELECT artist_id AS 'ID', name AS 'Name', email AS 'Email', phone AS 'Phone', genre AS 'Genre' FROM Artists;";
    db.pool.query(query_artists, function(errors, rows, fields) {
        res.render('artists', {data:rows});
    });
});

app.post('/add-artist', (req, res) =>{
let data = req.body;
console.log(data)
query1 = `INSERT INTO Artists (name, email, phone, genre) VALUES ("${data.aname}","${data.aemail}", ${data.aphone}, "${data.agenre}")`;
db.pool.query(query1, function(error, rows, fields){

    if (error) {

        console.log(error)
        res.sendStatus(400);
    }
    else
    {
        query2 = 'SELECT * FROM Artists;';
        db.pool.query(query2, function(error, rows, fields){

            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            else
            {
                console.log("SENDIng")
                res.send(rows);
            }
        })
    }
})
});

app.delete('/delete-artist/', function(req,res,next){
    let data = req.body;
    let artistID = parseInt(data.id);
    let deleteArtist = `DELETE FROM Artists WHERE artist_id = ?`;

          db.pool.query(deleteArtist, [artistID], function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {
                res.sendStatus(204);
              }
  })
});

app.put('/update-artist', function(req,res,next){
    let data = req.body;
    let art_id = parseInt(data.aid);
    let queryUpdateArtist = `UPDATE Artists SET name = "${data.aname}", email = "${data.aemail}", phone = ${data.aphone}, genre = "${data.agenre}" WHERE artist_id = ${art_id}`;
    let selectArtist = `SELECT * FROM Artists WHERE artist_id = ${art_id}`;
    console.log(queryUpdateArtist)

          db.pool.query(queryUpdateArtist, function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {

                  db.pool.query(selectArtist, function(error, rows, fields) {

                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                            console.log("SENDIT")
                          res.send(rows);
                      }
                  })
              }
  })
});


/*
############## Instruments Page
*/
app.get('/instruments', (req, res) =>{
    let query_instruments = "SELECT instrument_id AS 'ID', instrument_type AS 'Instrument' FROM Instruments;";
    db.pool.query(query_instruments, function(errors, rows, fields) {
        res.render('instruments', {data:rows});
    });
});

app.post('/add-instrument', (req, res) =>{
    let data = req.body;
    console.log(data)
    query1 = `INSERT INTO Instruments (instrument_id, instrument_type) VALUES ('${data.instrument_id}','${data.iname}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Instruments;';
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    console.log("SENDIng")
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-instrument/', function(req,res,next){
    let data = req.body;
    let instrumentID = parseInt(data.id);
    let deleteInstrument = `DELETE FROM Instruments WHERE instrument_id = ?`;

          db.pool.query(deleteInstrument, [instrumentID], function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {
                res.sendStatus(204);
              }
  })
});

app.put('/update-instrument', function(req,res,next){
    let data = req.body;
    let ins_id = parseInt(data.iid);
    // Issue with Query
    let queryUpdateInstrument = `UPDATE Instruments SET instrument_type = '${data.itype}' WHERE instrument_id = ${ins_id}`;
    let selectInstrument = `SELECT * FROM Instruments WHERE instrument_id = ${ins_id}`;
    console.log(queryUpdateInstrument)

          db.pool.query(queryUpdateInstrument, function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {

                  db.pool.query(selectInstrument, function(error, rows, fields) {

                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                            console.log("SENDIT")
                          res.send(rows);
                      }
                  })
              }
  })
});


/*
############## Tickets Page
*/
app.get('/tickets', (req, res) =>{
    let query_tickets = "SELECT ticket_id AS 'ID', ticket_price AS 'Price' FROM Tickets;";
    db.pool.query(query_tickets, function(errors, rows, fields) {
        res.render('tickets', {data:rows});
    });
});

app.post('/add-ticket', (req, res) =>{
    let data = req.body;
    console.log(data)
    query1 = `INSERT INTO Tickets (ticket_id, ticket_price) VALUES ('${data.ticket_id}','${data.tprice}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Tickets;';
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    console.log("SENDIng")
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-ticket/', function(req,res,next){
    let data = req.body;
    let ticketID = parseInt(data.id);
    let deleteTicket = `DELETE FROM Tickets WHERE ticket_id = ?`;

          db.pool.query(deleteTicket, [ticketID], function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {
                res.sendStatus(204);
              }
  })
});

app.put('/update-ticket', function(req,res,next){
    let data = req.body;
    console.log(data)
    let tic_id = parseInt(data.tid);
    let price = parseInt(data.price);
    let queryUpdateTicket = `UPDATE Tickets SET ticket_price = ${data.price} WHERE ticket_id = ${data.tid}`;
    let selectTicket = `SELECT * FROM Tickets WHERE ticket_id = ${data.tid}`;
    console.log(queryUpdateTicket)

          db.pool.query(queryUpdateTicket, function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {

                  db.pool.query(selectTicket, function(error, rows, fields) {

                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                            console.log("SENDIT")
                          res.send(rows);
                      }
                  })
              }
  })
});


/*
############## Ticket Invoices Page
*/
app.get('/ticket_invoices', (req, res) =>{
    let query1 = "SELECT Ticket_Invoices.event_id AS 'Invoice', Artists.name AS 'Performer', Venues.name AS 'Location', Rooms.name AS 'Room', Performances.performance_date AS 'Date', ticket_price AS 'Price' FROM Tickets INNER JOIN Ticket_Invoices ON Tickets.ticket_id=Ticket_Invoices.ticket_id INNER JOIN Performances ON Ticket_Invoices.performance_id=Performances.performance_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id INNER JOIN Venues ON Rooms.venue=Venues.venue_id;";
    let query2 = "SELECT * FROM Performances;"
    let query3 = "SELECT * FROM Tickets;"
    db.pool.query(query1, function(errors, rows, fields) {
        let invoice = rows;

        db.pool.query(query2, function(errors, rows, fields) {
            let performance = rows;

            db.pool.query(query3, function(errors, rows, fields) {
                let tickets = rows;

                res.render('ticket_invoices', {data:invoice, performance:performance, tickets:tickets});
            });
        });
    });
});

app.post('/add-invoice', function(req, res)
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let Performance = parseInt(data.Performance);
    if (isNaN(Performance))
    {
        Performance = 'NULL'
    }

    // Capture NULL values
    let Price = parseInt(data.Price);
    if (isNaN(Price))
    {
        Price = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Ticket_Invoices (performance_id, ticket_id) VALUES (${Performance}, ${Price})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, update # of tickets available in Performances
            query2 = `UPDATE Performances SET tickets_available = (SELECT tickets_available FROM Performances WHERE performance_id = ${Performance}) - 1 WHERE performance_id = ${Performance}`;
            db.pool.query(query2, function(error, rows, fields){

                // Check to see if there was an error
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    // If there was no error, perform a SELECT * on Rooms
                    query3 = "SELECT Ticket_Invoices.event_id AS 'Invoice', Artists.name AS 'Performer', Venues.name AS 'Location', Rooms.name AS 'Room', Performances.performance_date AS 'Date', ticket_price AS 'Price' FROM Tickets INNER JOIN Ticket_Invoices ON Tickets.ticket_id=Ticket_Invoices.ticket_id INNER JOIN Performances ON Ticket_Invoices.performance_id=Performances.performance_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id INNER JOIN Venues ON Rooms.venue=Venues.venue_id ORDER BY Invoice;";
                    db.pool.query(query3, function(error, rows, fields){

                        // If there was an error on the second query, send a 400
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        // If all went well, send the results of the query back.
                        else
                        {
                            console.log("SENDING")
                            res.send(rows);
                        }
                    });
                }
            });
        }
    });
});

app.delete('/delete-invoice', function(req,res,next){
    let data = req.body;
    console.log(data.id);
    let invoiceID = parseInt(data.id);
    let deleteInvoice = `DELETE FROM Ticket_Invoices WHERE event_id = ?`;

    // Run the 1st query
    db.pool.query(deleteInvoice, [invoiceID], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

        else {

            res.sendStatus(204);
        }
    });
});

app.put('/update-invoice', function(req,res,next){
    let data = req.body;

    // Capture NULL values
    let Price = parseInt(data.Price);
    if (isNaN(Price)) {
        Price = 'NULL'
    }

    // Issue with Query
    let queryUpdateInvoice = `UPDATE Ticket_Invoices SET ticket_id = ${Price} WHERE event_id = ${data.id}`;
    let selectInvoice = `SELECT Ticket_Invoices.event_id AS 'Invoice', Artists.name AS 'Performer', Venues.name AS 'Location', Rooms.name AS 'Room', Performances.performance_date AS 'Date', ticket_price AS 'Price' FROM Tickets INNER JOIN Ticket_Invoices ON Tickets.ticket_id=Ticket_Invoices.ticket_id INNER JOIN Performances ON Ticket_Invoices.performance_id=Performances.performance_id INNER JOIN Artists ON Performances.artist_id=Artists.artist_id INNER JOIN Rooms ON Performances.room_id=Rooms.room_id INNER JOIN Venues ON Rooms.venue=Venues.venue_id WHERE Ticket_Invoices.event_id = ${data.id}`;

    db.pool.query(queryUpdateInvoice, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }

        else {
            db.pool.query(selectInvoice, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    console.log("SENDIT")
                    res.send(rows);
                }
            });
        }
    });
});


/*
############## Artist Needs Instruments Page
*/
app.get('/artist_needs_ins', (req, res) =>{
    console.log("HELLO")
    let query_artist_needs_ins = "SELECT Artist_Needs_Instruments.rental_id AS 'ID', Artists.name AS 'Band', Instruments.instrument_type AS 'Gear' FROM Artists INNER JOIN Artist_Needs_Instruments ON Artists.artist_id=Artist_Needs_Instruments.artist_id INNER JOIN Instruments ON Artist_Needs_Instruments.instrument_id=Instruments.instrument_id ORDER BY ID;";
    let query_artist_names = "SELECT Artists.name FROM Artists;";
    let query_instruments = "SELECT Instruments.instrument_type FROM Instruments;";
    db.pool.query(query_artist_needs_ins, function(errors, rows, fields) {
        db.pool.query(query_artist_names, function(errors, rows2, fields) {
            db.pool.query(query_instruments, function(errors, rows3, fields) {
                console.log(rows)
                res.render('artist_needs_ins', {data:rows, data2:rows2, data3:rows3});
            });
        });
    });
});

app.post('/add-request', (req, res) =>{
    let data = req.body;
    console.log(data)
    query1 = `INSERT INTO Artist_Needs_Instruments (artist_id, instrument_id) VALUES ((SELECT artist_id FROM Artists WHERE name = '${data.rname}'), (Select instrument_id FROM Instruments WHERE instrument_type = '${data.rinst}'));`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = 'SELECT * FROM Artist_Needs_Instruments;';
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    console.log("SENDIng")
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-request', function(req,res,next){
    let data = req.body;
    let requestID = parseInt(data.id);
    let deleteRequest = `DELETE FROM Artist_Needs_Instruments WHERE rental_id = ?`;

          db.pool.query(deleteRequest, [requestID], function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {
                res.sendStatus(204);
              }
  })
});

app.put('/update-request', function(req,res,next){
    let data = req.body;
    let request_id = parseInt(data.rid);
    let queryUpdateRequest = `UPDATE Artist_Needs_Instruments SET artist_id = (SELECT artist_id FROM Artists WHERE name = '${data.rname}'), instrument_id = (Select instrument_id FROM Instruments WHERE instrument_type = '${data.rinst}') WHERE rental_id = ${request_id};`;
    let selectArtistNeedsInst = `SELECT Artists.name AS 'Band', Instruments.instrument_type AS 'Gear' FROM Artists INNER JOIN Artist_Needs_Instruments ON Artists.artist_id=Artist_Needs_Instruments.artist_id INNER JOIN Instruments ON Artist_Needs_Instruments.instrument_id=Instruments.instrument_id;`;
    console.log(queryUpdateRequest)
          db.pool.query(queryUpdateRequest, function(error, rows, fields){
              if (error) {

              console.log(error);
              res.sendStatus(400);
              }

              else
              {

                  db.pool.query(selectArtistNeedsInst, function(error, rows, fields) {

                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                            console.log("SENDIT")
                          res.send(rows);
                      }
                  })
              }
  })
});


/*
################### Listener ###################
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});