/*  Authors:    Charles D. Maddux
                Clinton Lohr
    Date:       07 August 2022
    Revision:   0.3.1
    Rev Date:   07 August 2022
    Description: Data manipulation queries 
*/

-- ################  VENUES TABLE  ##############

-- ##### CREATE ##### insert new entry into table
INSERT INTO Venues (name, address, city, state, zip, phone, num_rooms, total_capacity)
VALUES ('Pig City', '123 Hogswallow Way', 'Scranton', 'PA', 12305, '808-101-5050',
        4, 357);
-- VALUES (:vNameInput, :vAddressInput, :vCityInput, :vStateInput, :vZipInput, :vPhoneInput,
--         :numRoomsInput, :totalCapicityInput);

-- ##### READ ##### read values from table
SELECT name, address, city, state, zip, phone, num_rooms, total_capacity FROM Venues;


-- ##### UPDATE ##### EDIT data in an existing table 
SELECT name, address, city, state, zip, phone, num_rooms, total_capacity FROM Venues
        WHERE venue_id = 1;
--         WHERE venue_id = :venue_id_to_edit;
UPDATE Venues   
        SET name = 'Broken Spokes'
        WHERE venue_id = 1;
--         SET name = :vnameInput, address = :vAddressInput, city = :vCityInput, state = :vStateInput, 
--            zip = :vZipInput, phone = :vPhoneInput, num_rooms = :numRoomsInput, 
--            total_capacity = :totalCapicityInput
--         WHERE venue_id = :venue_id_to_edit;
SELECT name, address, city, state, zip, phone, num_rooms, total_capacity FROM Venues;


-- ##### DELETE ##### remove an existing venue from table
-- add alert to confirm delete before operation
DELETE FROM Venues WHERE venue_id = 3;
-- DELETE FROM Venues WHERE venue_id = :deleteVenueSelected;


-- ################  ROOMS TABLE  ##############

--  ##### CREATE #####  create a new entry for table
`INSERT INTO Rooms (name, capacity, venue, over_21) 
VALUES ('${data.Room}', ${Capacity}, ${data.Venue}, ${Adult})`
-- INSERT INTO Rooms (name, venue, capacity, over_21)
--VALUES  ('Slice', (SELECT venue_id FROM Venues WHERE name = 'SOMA'), 20, 1)


--  ##### READ #####  read values from table
"SELECT Rooms.room_id AS 'id', Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' 
        FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id 
        ORDER BY id;"
-- SELECT name, capacity, venue FROM Rooms;


--  ##### UPDATE #####  edit data in an existing table 
"SELECT Rooms.room_id AS 'id', Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' 
        FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id 
        ORDER BY id;"

`UPDATE Rooms SET name = '${data.rNameInput}', capacity = ${Capacity}, venue = ${Venue}, over_21 = ${Adult} 
        WHERE room_id = ${data.id}`

`SELECT Rooms.room_id AS 'id', Rooms.name AS 'Room', capacity AS 'Capacity', Venues.name AS 'Venue', over_21 AS 'Adult' 
        FROM Rooms INNER JOIN Venues ON Rooms.venue=Venues.venue_id 
        WHERE Rooms.room_id = ${data.id}`

-- SELECT name, capacity, venue FROM Rooms
--     WHERE room_id = 2;
-- UPDATE Rooms 
--     SET name = 'Deep Freeze', capacity = 125, venue = 2
--     WHERE room_id = 5;

SELECT name, venue, capacity, over_21 FROM Rooms
    WHERE room_id = 5;
--     WHERE room_id = :room_id_to_edit;

-- update total venue capacity based on change in room capacity
UPDATE Venues
        SET total_capacity = (SELECT SUM(capacity) FROM Rooms WHERE venue = 2 GROUP BY venue)
        WHERE venue_id = 2; 
--         SET total_capacity = (SELECT SUM(capacity) FROM Rooms WHERE venue = 2 GROUP BY venue)
--         WHERE venue_id = 2; 

SELECT name, address, city, state, zip, phone, num_rooms, total_capacity FROM Venues;


--  ##### DELETE #####  remove an existing room from table
-- add alert to confirm delete before operation
DELETE FROM Rooms WHERE room_id = 8;
-- DELETE FROM Rooms WHERE room_id = :deleteRoomSelected;
SELECT name, venue, capacity, over_21 FROM Rooms;


-- ################  ARTISTS TABLE  ################

-- ##### CREATE ##### create a new entry for table
INSERT INTO Artists (name, email, phone, genre)
VALUES('Stitched Up Heart', 'suh@gothrock.com', '800-555-1234', 'Emo');
-- VALUES (:aNameInput, :aEmailInput, :aPhoneInput, :aGenreInput);


-- ##### READ ##### read values from table
SELECT name, email, phone, genre FROM Artists;


-- ##### UPDATE ##### edit data in an existing table 
SELECT name, email, phone, genre FROM Artists
    WHERE artist_id = 3;
--        WHERE artist_id = :artist_id_to_edit;
UPDATE Artists   
    SET name = 'Aerosmith', email = 'biglips@chickens.com', phone = '888-555-6789', 
        genre = 'Classic Rock'
    WHERE artist_id = 3;
--     SET name = :aNameInput, email = :aEmailInput, phone = :aPhoneInput, 
--         genre = :aGenreInput
--     WHERE artist_id = :artist_id_to_edit;
SELECT name, email, phone, genre FROM Artists;


-- ##### DELETE ##### remove an existing venue from table
-- add alert to confirm delete before operation
DELETE FROM Artists WHERE artist_id = 1;
-- DELETE FROM Artists WHERE artist_id = :deleteArtistSelected;
SELECT name, email, phone, genre FROM Artists;


-- ################  INSTRUMENTS TABLE  ##############

-- ##### CREATE ##### insert a new entry into table
INSERT INTO Instruments (instrument_type)
VALUES ('Trumpet');
-- VALUES (:iTypeInput);


-- ##### READ ##### read values from table
SELECT instrument_type FROM Instruments;


-- ##### UPDATE ##### edit data in an existing table 
SELECT instrument_type FROM Instruments
        WHERE instrument_id = 3;
--         WHERE instrument_id = :instrument_id_to_edit;
UPDATE Instruments   
        SET instrument_type = 'Piano'
        WHERE instrument_id = 3;
--         SET instrument_type = :iInstrmentInput
--         WHERE instrument_id = :instrument_id_to_edit;
SELECT instrument_type FROM Instruments;


-- ##### DELETE ##### remove an existing venue from table
-- add alert to confirm delete before operation
DELETE FROM Instruments WHERE instrument_id = 4;
-- DELETE FROM Instruments WHERE instrument_id = :deleteInstrumentSelected;


-- ################  TICKETS TABLE  ##############
-- ##### CREATE ##### insert a new entry into table
INSERT INTO Tickets(ticket_price)
VALUES(54.87);
-- VALUES (:tPriceInput);


-- ##### READ ##### read values from table
SELECT ticket_id, ticket_price FROM Tickets;


-- ##### EDIT ##### update data in an existing table 
SELECT ticket_id, ticket_price FROM Tickets;
--     WHERE Tickets.ticket_id = :ticket_id_to_edit;
UPDATE Tickets   
        SET ticket_price = 105.00
        WHERE ticket_id = 6;
--         SET ticket_price = :tPriceInput
--         WHERE ticket_id = :ticket_id_to_edit;
SELECT ticket_id, ticket_price FROM Tickets;
--     WHERE Tickets.ticket_id = :ticket_id_to_edit;


-- ##### DELETE ##### remove an existing venue from table
-- add alert to confirm delete before operation
SELECT ticket_id, ticket_price FROM Tickets;
DELETE FROM Tickets WHERE ticket_id = 2;
-- DELETE FROM Tickets WHERE ticket_id = :deleteTicketSelected;
SELECT ticket_id, ticket_price FROM Tickets;


-- ################  PERFORMANCES TABLE  ##############

-- ##### CREATE ##### insert values into table
`INSERT INTO Performances (performance_date, artist_id, ticket_id, room_id, tickets_available) 
VALUES ('${data.Date}', ${Artist}, ${Price}, ${Room}, ${Available})`
-- INSERT INTO Performances (performance_date, artist_id, ticket_id, room_id, tickets_available)
-- VALUES  ('2022-10-15 19:30:00', (SELECT artist_id FROM Artists WHERE name = 'Stitched Up Heart'), 
--         (SELECT ticket_id FROM Tickets WHERE ticket_price=90.00),
--         (SELECT room_id FROM Rooms WHERE name = 'NeverMind'), 100);


-- ##### READ ##### read values from table
"SELECT Performances.performance_id AS 'id', Artists.name AS 'Artist', Performances.performance_date AS 'Date', 
        Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' 
        FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id 
        INNER JOIN Artists ON Performances.artist_id=Artists.artist_id 
        INNER JOIN Rooms ON Performances.room_id=Rooms.room_id 
        ORDER BY id;"
-- SELECT Artists.name, Performances.performance_date, ticket_price, Performances.tickets_available FROM Tickets
--     INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id
--     INNER JOIN Artists ON Performances.artist_id=Artists.artist_id;


-- ##### EDIT ##### update data in an existing table 
`SELECT Performances.performance_id AS 'id', Artists.name AS 'Artist', Performances.performance_date AS 'Date', 
        Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' 
        FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id 
        INNER JOIN Artists ON Performances.artist_id=Artists.artist_id 
        INNER JOIN Rooms ON Performances.room_id=Rooms.room_id 
        WHERE performance_id = ${data.id}`

`UPDATE Performances SET artist_id = ${Artist}, room_id = ${Room}, performance_date = '${data.Date}', 
        ticket_id = ${Price}, tickets_available = ${Available} 
        WHERE performance_id = ${data.id}`

`SELECT Performances.performance_id AS 'id', Artists.name AS 'Artist', Performances.performance_date AS 'Date', 
        Rooms.name AS 'Room', ticket_price AS 'Price', Performances.tickets_available AS 'Available' 
        FROM Tickets INNER JOIN Performances ON Tickets.ticket_id=Performances.ticket_id 
        INNER JOIN Artists ON Performances.artist_id=Artists.artist_id 
        INNER JOIN Rooms ON Performances.room_id=Rooms.room_id 
        WHERE performance_id = ${data.id}`

--  ##### DELETE #####  remove an existing room from table
`DELETE FROM Ticket_Invoices WHERE performance_id = ?`
`DELETE FROM Performances WHERE performance_id = ?`
-- DELETE FROM Performances WHERE performance_id = 4;


-- ################  ARTIST_NEEDS_INSTRUMENTS TABLE  ##############

--  ##### CREATE #####  create a new entry for table
INSERT INTO Artist_Needs_Instruments (artist_id, instrument_id)
VALUES  ((SELECT artist_id FROM Artists WHERE name = 'Stitched Up Heart'), 
        (SELECT instrument_id FROM Instruments WHERE instrument_type = 'Electric Guitar'));
-- VALUES  ((SELECT artist_id FROM Artists WHERE name = aniArtistSelected), 
--         (SELECT instrument_id FROM Instruments WHERE instrument_type = :aniInstrumentSelected));


-- ##### READ ##### read values from table
SELECT Artists.name AS 'Band', Instruments.instrument_type AS 'Gear' FROM Artists
    INNER JOIN Artist_Needs_Instruments ON Artists.artist_id=Artist_Needs_Instruments.artist_id
    INNER JOIN Instruments ON Artist_Needs_Instruments.instrument_id=Instruments.instrument_id;


--  ##### UPDATE #####  edit data in an existing table 
SELECT Artists.name AS 'Band', Instruments.instrument_type AS 'Gear' FROM Artists
    INNER JOIN Artist_Needs_Instruments ON Artists.artist_id=Artist_Needs_Instruments.artist_id
    INNER JOIN Instruments ON Artist_Needs_Instruments.instrument_id=Instruments.instrument_id;
UPDATE Artist_Needs_Instruments
    SET artist_id = (SELECT artist_id FROM Artists WHERE name = 'System of a Down'), 
        instrument_id = (SELECT instrument_id FROM Instruments WHERE instrument_type = 'drum set')
        WHERE rental_id = 2;


--  ##### DELETE #####  remove an existing room from table
-- add alert to confirm delete before operation
DELETE FROM Artist_Needs_Instruments WHERE rental_id = 4;
-- DELETE FROM Artist_Needs_Instruments WHERE rental_id = aniRentalSelected;
SELECT Artists.name AS 'Band', Instruments.instrument_type AS 'Gear' FROM Artists
    INNER JOIN Artist_Needs_Instruments ON Artists.artist_id=Artist_Needs_Instruments.artist_id
    INNER JOIN Instruments ON Artist_Needs_Instruments.instrument_id=Instruments.instrument_id;


-- ################  TICKET INVOICES TABLE  ##############

-- ##### CREATE ##### insert values into table
`INSERT INTO Ticket_Invoices (performance_id, ticket_id) 
 VALUES (${Performance}, ${Price})`
`UPDATE Performances SET tickets_available = (SELECT tickets_available FROM Performances 
        WHERE performance_id = ${Performance}) - 1 WHERE performance_id = ${Performance}`
-- INSERT INTO Ticket_Invoices (performance_id, ticket_id)
-- VALUES((SELECT performance_id FROM Performances WHERE performance_date = '2022-07-30'), 


-- ##### READ ##### read values from table
SELECT Ticket_Invoices.event_id AS 'Invoice', Artists.name AS 'Performer', Venues.name AS 'Location', 
    Rooms.name AS 'Room', Performances.performance_date AS 'Date', ticket_price AS 'Price' 
    FROM Tickets INNER JOIN Ticket_Invoices ON Tickets.ticket_id=Ticket_Invoices.ticket_id 
    INNER JOIN Performances ON Ticket_Invoices.performance_id=Performances.performance_id 
    INNER JOIN Artists ON Performances.artist_id=Artists.artist_id 
    INNER JOIN Rooms ON Performances.room_id=Rooms.room_id 
    INNER JOIN Venues ON Rooms.venue=Venues.venue_id;

-- ##### DELETE ##### remove an existing venue from table
`DELETE FROM Ticket_Invoices WHERE event_id = ?`
-- DELETE FROM Ticket_Invoices WHERE event_id = 3;


-- ##### UPDATE ##### edit data in an existing table 
`SELECT Ticket_Invoices.event_id AS 'Invoice', Artists.name AS 'Performer', Venues.name AS 'Location', 
        Rooms.name AS 'Room', Performances.performance_date AS 'Date', ticket_price AS 'Price' 
        FROM Tickets INNER JOIN Ticket_Invoices ON Tickets.ticket_id=Ticket_Invoices.ticket_id 
        INNER JOIN Performances ON Ticket_Invoices.performance_id=Performances.performance_id 
        INNER JOIN Artists ON Performances.artist_id=Artists.artist_id 
        INNER JOIN Rooms ON Performances.room_id=Rooms.room_id 
        INNER JOIN Venues ON Rooms.venue=Venues.venue_id 
        WHERE Ticket_Invoices.event_id = ${data.id}`

`UPDATE Ticket_Invoices SET ticket_id = ${Price} WHERE event_id = ${data.id}`
-- UPDATE Ticket_Invoices   
--         SET performance_id = (SELECT performance_id FROM Performances WHERE performance_date = '2022-08-06'),
--         ticket_id = (SELECT ticket_id FROM Tickets WHERE ticket_price = '80.00')
--         WHERE Ticket_Invoices.event_id = 4;

