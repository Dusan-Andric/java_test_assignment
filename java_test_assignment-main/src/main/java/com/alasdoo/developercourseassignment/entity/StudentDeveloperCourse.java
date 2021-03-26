package com.alasdoo.developercourseassignment.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "student_developer_course")
public class StudentDeveloperCourse implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    @Column(name = "student_id", nullable = false)
    private Integer studentId;
    @Column(name = "developer_course_id", nullable = false)
    private Integer developerCourseId;
    @Column(name = "classes_bought", nullable = false)
    private Integer classesBought;

    public StudentDeveloperCourse() {
    }

    public StudentDeveloperCourse(Integer studentId, Integer developerCourseId, Integer classesBought) {
        this.studentId = studentId;
        this.developerCourseId = developerCourseId;
        this.classesBought = classesBought;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getDeveloperCourseId() {
        return developerCourseId;
    }

    public void setDeveloperCourseId(Integer developerCourseId) {
        this.developerCourseId = developerCourseId;
    }

    public Integer getClassesBought() {
        return classesBought;
    }

    public void setClassesBought(Integer classesBought) {
        this.classesBought = classesBought;
    }
}
