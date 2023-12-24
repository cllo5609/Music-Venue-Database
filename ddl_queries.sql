/*  Authors:    Charles D. Maddux
                Clinton Lohr
    Date:       07 August 2022
    Revision:   0.3.1
    Rev Date:   07 August 2022
    Description: Data definition queries and sample data 
*/

-- set foreign key check and turn off autocommit
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

-- create tables
CREATE OR REPLACE TABLE Venues (
    venue_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    num_rooms INT NOT NULL,
    total_capacity INT NOT NULL,
    phone VARCHAR(12) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(2),
    zip INT(5),
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
    ON DELETE CASCADE
);

CREATE OR REPLACE TABLE Artists (
    artist_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(12) NOT NULL,
    email VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    PRIMARY KEY (artist_id)
);

CREATE OR REPLACE TABLE Performances (
    performance_id INT NOT NULL AUTO_INCREMENT,
    artist_id INT NOT NULL,
    room_id INT NOT NULL,
    performance_date DATE,
    ticket_id INT NOT NULL,
    tickets_available INT NOT NULL DEFAULT 0,
    PRIMARY KEY (performance_id),
    FOREIGN KEY (artist_id) REFERENCES Artists (artist_id)
    ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Rooms (room_id)
    ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES Tickets (ticket_id)
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
    FOREIGN KEY (performance_id) REFERENCES Performances (performance_id)
    ON DELETE CASCADE,
    FOREIGN KEY (ticket_id) REFERENCES Tickets (ticket_id)
    ON DELETE CASCADE
);

CREATE OR REPLACE TABLE Artist_Needs_Instruments (
    rental_id INT NOT NULL AUTO_INCREMENT,
    artist_id INT NOT NULL,
    instrument_id INT NOT NULL,
    PRIMARY KEY (rental_id),
    FOREIGN KEY (artist_id) REFERENCES Artists (artist_id)
    ON DELETE CASCADE,
    FOREIGN KEY (instrument_id) REFERENCES Instruments (instrument_id)
    ON DELETE CASCADE
);

-- #########################################################################################
-- insert statements
INSERT INTO Venues (name, address, city, state, zip, phone, num_rooms, total_capacity)
VALUES  ('Broken Spoke', '3201 S. Lamar Blvd.', 'Austin', 'TX', '78704',
        '5124426189', 3, 0),
        ('SOMA', '3350 Sports Arena Blvd.', "San Diego", 'CA', NULL,
        '6192267662', 2, 0),
        ('The Crocodile', '2505 1st Ave.', 'Seattle', 'WA', '98121',
        '2064415555', 3, 0),
        ('The Joint', '3730 N Clark St', 'Chicago', 'IL', '60613',
        '7735494140', 1, 0),
        ('The Ogden', '935 E Colfax Ave', 'Denver', 'CO', '80218',
        '3038321874', 1, 0);

INSERT INTO Rooms (name, venue, capacity, over_21)
VALUES  ('Pony Room', (SELECT venue_id FROM Venues WHERE name = 'Broken Spoke'), 75, 0),
        ('Oregon Trail', (SELECT venue_id FROM Venues WHERE name = 'Broken Spoke'), 50, 1),
        ('The Clydesdale', (SELECT venue_id FROM Venues WHERE name = 'Broken Spoke'), 125, 1),
        ('Calamity', (SELECT venue_id FROM Venues WHERE name = 'SOMA'), 45, 1),
        ('Mind Freeze', (SELECT venue_id FROM Venues WHERE name = 'SOMA'), 65, 1),
        ('Nevermind', (SELECT venue_id FROM Venues WHERE name = 'The Crocodile'), 100, 0),
        ('Bleach', (SELECT venue_id FROM Venues WHERE name = 'The Crocodile'), 120, 0),
        ('In Utero', (SELECT venue_id FROM Venues WHERE name = 'The Crocodile'), 90, 0),
        ('The Main Room', (SELECT venue_id FROM Venues WHERE name = 'The Joint'), 250, 0),
        ('Blue Room', (SELECT venue_id FROM Venues WHERE name = 'The Ogden'), 550, 0);

-- Auto-populate total capacity AFTER both Venues & Rooms tables are populated
UPDATE Venues
        SET total_capacity = (SELECT SUM(capacity) FROM Rooms WHERE venue = 1 GROUP BY venue) WHERE venue_id = 1;
UPDATE Venues
        SET total_capacity = (SELECT SUM(capacity) FROM Rooms WHERE venue = 2 GROUP BY venue) WHERE venue_id = 2;
UPDATE Venues
        SET total_capacity = (SELECT SUM(capacity) FROM Rooms WHERE venue = 3 GROUP BY venue) WHERE venue_id = 3;
UPDATE Venues
        SET total_capacity = (SELECT SUM(capacity) FROM Rooms WHERE venue = 4 GROUP BY venue) WHERE venue_id = 4;
UPDATE Venues
        SET total_capacity = (SELECT SUM(capacity) FROM Rooms WHERE venue = 5 GROUP BY venue) WHERE venue_id = 5;

INSERT INTO Artists (name, email, phone, genre)
VALUES  ('Modest Mouse', 'MM@gmail.com', '123-456-7890', 'indie rock'),
        ('System of a Down', 'sysdown@gmail.com', '234-567-8901', 'progressive metal'),
        ('James Taylor', 'jtaylor@gmail.com', '345-678-9012', 'folk'),
        ('Stitched Up Heart', 'goth_girl@tragic.com', '800-555-5555', 'Emo');

INSERT INTO Tickets (ticket_price)
VALUES  (50.00),
        (60.00),
        (70.00),
        (80.00),
        (90.00),
        (100.00),
        (120.99);

INSERT INTO Performances (performance_date, artist_id, ticket_id, room_id, tickets_available)
VALUES  ('2022-07-23', (SELECT artist_id FROM Artists WHERE name = 'Modest Mouse'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = 60.00),
        (SELECT room_id FROM Rooms WHERE name = 'Pony Room'), 45),

        ('2022-07-30', (SELECT artist_id FROM Artists WHERE name = 'System of a Down'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = 70.00),
        (SELECT room_id FROM Rooms WHERE name = 'Oregon Trail'), 10),

        ('2022-08-06', (SELECT artist_id FROM Artists WHERE name = 'James Taylor'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = 90.00),
        (SELECT room_id FROM Rooms WHERE name = 'The Clydesdale'), 99);

INSERT INTO Instruments (instrument_type)
VALUES  ('electric guitar'),
        ('acoustic guitar'),
        ('bass guitar'),
        ('drum set');

INSERT INTO Ticket_Invoices (performance_id, ticket_id)
VALUES  ((SELECT performance_id FROM Performances WHERE performance_date = '2022-07-23'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = '70.00')),
        ((SELECT performance_id FROM Performances WHERE performance_date = '2022-07-30'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = '60.00')),
        ((SELECT performance_id FROM Performances WHERE performance_date = '2022-08-06'),
        (SELECT ticket_id FROM Tickets WHERE ticket_price = '90.00'));

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