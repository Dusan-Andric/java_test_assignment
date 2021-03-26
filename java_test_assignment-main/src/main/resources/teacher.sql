DROP TABLE IF EXISTS teacher;

CREATE TABLE teacher (
    id INT AUTO_INCREMENT NOT NULL,
    teacher_name VARCHAR(250) NOT NULL,
    teacher_surname VARCHAR(250) NOT NULL,
    teacher_email VARCHAR(250) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (teacher_email)
);