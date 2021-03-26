DROP TABLE IF EXISTS developer_course;

CREATE TABLE developer_course (
    id INT AUTO_INCREMENT NOT NULL,
    developer_course_name VARCHAR(250) NOT NULL,
    cost_per_class INT NOT NULL,
    classes_per_week INT NOT NULL,
    PRIMARY KEY (id),
    KEY developer_course_teacher_fk_idx (developer_course_teacher_fk)
);