DROP TABLE IF EXISTS student_developer_course;

CREATE TABLE student_developer_course (
    id INT AUTO_INCREMENT NOT NULL,
    student_id INT NOT NULL,
    developer_course_id INT NOT NULL,
    classes_bought INT NOT NULL,
    PRIMARY KEY (id),
    KEY student_developer_course_student_idx (student_id),
    KEY student_developer_course_developer_course_idx (developer_course_id),
    CONSTRAINT student_developer_course_student FOREIGN KEY (student_id) REFERENCES student (id),
    CONSTRAINT student_developer_course_developer_course FOREIGN KEY (developer_course_id) REFERENCES developer_course (id)
);