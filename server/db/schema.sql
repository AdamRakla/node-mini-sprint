DROP DATABASE IF EXISTS quoteDatabase;

CREATE DATABASE quoteDatabase;

USE quoteDatabase;

CREATE TABLE quotes(
  id INT AUTO_INCREMENT PRIMARY KEY,
  quote VARCHAR(200) NOT NULL
);

INSERT INTO quotes
VALUES (null, 'To not give your best, is to sacrifice the gift. - Steve Prefontaine'),
(null, 'Pain is temporary, losing is forever'),
(null, 'Is mayonaise an instrument? - Patrick Star'),
(null, 'ANYTHING IS POSSIBLE!!!! - Kevin Garnett'),
(null, 'Are you a different animal, and the same beast? - Kobe');
