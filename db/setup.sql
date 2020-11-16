CREATE USER 'iems'@'localhost';
CREATE USER 'iems-test'@'localhost';

CREATE DATABASE iems;
CREATE DATABASE iems_test;

GRANT ALL PRIVILEGES ON iems.* TO 'iems'@'localhost';
GRANT ALL PRIVILEGES ON iems_test.* TO 'iems-test'@'localhost';

USE iems;

CREATE TABLE train_entries (
    id int(8) AUTO_INCREMENT NOT NULL,
    dest enum('HOWARD', '95TH'),
    run int(11),
    day DATE,
    departure_ts TIMESTAMP,
    PRIMARY KEY (id)
);

USE iems_test;

CREATE TABLE train_entries (
    id int(8) AUTO_INCREMENT NOT NULL,
    dest enum('HOWARD', '95TH'),
    run int(11),
    day DATE,
    departure_ts TIMESTAMP,
    PRIMARY KEY (id)
);