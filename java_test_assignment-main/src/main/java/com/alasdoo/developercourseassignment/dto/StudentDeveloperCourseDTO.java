package com.alasdoo.developercourseassignment.dto;

import java.io.Serializable;

public class StudentDeveloperCourseDTO implements Serializable {

    private Integer id;
    private Integer studentId;
    private Integer developerCourseId;
    private Integer classesBought;

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
