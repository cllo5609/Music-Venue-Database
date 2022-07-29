/*  Authors:    Charles D. Maddux
                Clinton Lohr
    Assignment: Final Project - create database tables
    Date:       19 July 2022
    Revision:   0.3.1
    Rev Date:   22 July 2022
*/

-- set foreign key check and turn off autocommit
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

-- create tables
CREATE OR REPLACE TABLE Venues (
    venue_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(2),
    zip INT(5),
    phone VARCHAR(12) NOT NULL,
    num_rooms INT NOT NULL,
    total_capacity INT NOT NULL,
    PRIMARY KEY (venue_id)
);

CREATE OR REPLACE TABLE Rooms (
    room_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    venue INT NOT NULL,
    capacity INT NOT NULL,
    over_21 TINYINT(1) DEFAULT 0,
    PRIMARY KEY (room_id),
    FOREIGN KEY (venue) REFERENCES Venues (venue_id)
);

CREATE OR REPLACE TABLE Performances (
    performance_id INT NOT NULL AUTO_INCREMENT,
    artist_id INT NOT NULL,
    room_id INT NOT NULL,
    performance_date DATETIME,
    tickets_available INT NOT NULL DEFAULT 0,
    PRIMARY KEY (performance_id),
    FOREIGN KEY (artist_id) REFERENCES Artists (artist_id),
    FOREIGN KEY (room_id) REFERENCES Rooms (room_id)
);

CREATE OR REPLACE TABLE Artists (
    artist_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    PRIMARY KEY (artist_id)
);

CREATE OR REPLACE TABLE Instruments (
    instrument_id INT NOT NULL AUTO_INCREMENT,
    instrument_type VARCHAR(50),
    PRIMARY KEY (instrument_id)
);

CREATE OR REPLACE TABLE Tickets (
    ticket_id INT UNIQUE NOT NULL AUTO_INCREMENT,
    ticket_price DECIMAL(5,2),
    PRIMARY KEY (ticket_id)
);

CREATE OR REPLACE TABLE Ticket_Invoices (
    event_id INT NOT NULL AUTO_INCREMENT,
    performance_id INT NOT NULL,
    ticket_id INT NOT NULL,
    PRIMARY KEY (event_id),
    FOREIGN KEY (performance_id) REFERENCES Performances (performance_id),
    FOREIGN KEY (ticket_id) REFERENCES Tickets (ticket_id)
    ON DELETE SET NULL
);

CREATE OR REPLACE TABLE Artist_Needs_Instruments (
    artist_id INT NOT NULL,
    instrument_id INT NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES Artists (artist_id),
    FOREIGN KEY (instrument_id) REFERENCES Instruments (instrument_id)
);

-- insert statements
INSERT INTO Venues (name, address, city, state, zip, phone, num_rooms, total_capacity)
VALUES  ('Broken Spoke', '3201 S. Lamar Blvd.', 'Austin', 'TX', '78704',
        '512-442-6189', 3, 250),
        ('SOMA', '3350 Sports Arena Blvd.', "San Diego", 'CA', NULL,
        '619-226-7662', 1, 400),
        ('The Crocodile', '2505 1st Ave.', 'Seattle', 'WA', '98121',
        '206-441-5555', 2, 550);

INSERT INTO Rooms (name, venue, capacity, over_21)
VALUES  ('Pony Room', (SELECT venue_id FROM Venues WHERE name = 'Broken Spoke'), 75, 0),
        ('Oregon Trail', (SELECT venue_id FROM Venues WHERE name = 'Broken Spoke'), 50, 1),
        ('The Clydesdale', (SELECT venue_id FROM Venues WHERE name = 'Broken Spoke'), 125, 1);

INSERT INTO Performances (performance_date, room_id, tickets_available)
VALUES  ('2022-07-23', (SELECT room_id FROM Rooms WHERE name = 'Pony Room'), 45),
        ('2022-07-30', (SELECT room_id FROM Rooms WHERE name = 'Oregon Trail'), 10),
        ('2022-08-06', (SELECT room_id FROM Rooms WHERE name = 'The Clydesdale'), 99);

INSERT INTO Instruments (instrument_type)
VALUES  ('electric guitar'),
        ('acoustic guitar'),
        ('bass guitar'),
        ('drum set');

INSERT INTO Artists (name, email, phone, genre)
VALUES  ('Modest Mouse', 'MM@gmail.com', '123-456-7890', 'indie rock'),
        ('System of a Down', 'sysdown@gmail.com', '234-567-8901', 'progressive metal'),
        ('James Taylor', 'jtaylor@gmail.com', '345-678-9012', 'folk');

INSERT INTO Tickets (ticket_price)
VALUES  (57.99),
        (60.00),
        (38.00);

INSERT INTO Ticket_Invoices (performance_id, ticket_id)
VALUES  ((SELECT performance_id FROM Performances WHERE performance_date = '2022-07-23'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = '57.99')),
        ((SELECT performance_id FROM Performances WHERE performance_date = '2022-07-30'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = '60.00')),
        ((SELECT performance_id FROM Performances WHERE performance_date = '2022-08-06'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = '38.00'));

INSERT INTO Artist_Needs_Instruments (instrument_id, artist_id)
VALUES  ((SELECT instrument_id FROM Instruments WHERE instrument_type = 'electric guitar'),
        (SELECT artist_id FROM Artists WHERE name = 'James Taylor')),
        ((SELECT instrument_id FROM Instruments WHERE instrument_type = 'bass guitar'),
        (SELECT artist_id FROM Artists WHERE name = 'System of a Down')),
        ((SELECT instrument_id FROM Instruments WHERE instrument_type = 'electric guitar'),
        (SELECT artist_id FROM Artists WHERE name = 'Modest Mouse'));

-- turn on checks and commit
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
