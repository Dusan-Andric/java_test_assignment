DROP TABLE IF EXISTS student;

CREATE TABLE student (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(250) NOT NULL,
    surname VARCHAR(250) NOT NULL,
    account_name VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    bank_card_number INT(16) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (account_name, email)
);