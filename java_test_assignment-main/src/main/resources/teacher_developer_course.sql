DROP TABLE IF EXISTS teacher_developer_course;

CREATE TABLE teacher_developer_course (
    id INT AUTO_INCREMENT NOT NULL,
    developer_course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    PRIMARY KEY (id),
    KEY teacher_developer_course_teacher_idx (teacher_id),
    KEY teacher_developer_course_developer_course_idx (developer_course_id),
    CONSTRAINT teacher_developer_course_teacher FOREIGN KEY (teacher_id) REFERENCES teacher (id),
    CONSTRAINT teacher_developer_course_developer_course FOREIGN KEY (developer_course_id) REFERENCES developer_course (id)
);