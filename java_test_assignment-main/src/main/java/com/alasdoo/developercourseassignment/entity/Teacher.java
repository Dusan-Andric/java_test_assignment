package com.alasdoo.developercourseassignment.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "teacher")
public class Teacher implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    @Column(name = "teacher_name", nullable = false, length = 250)
    private String teacherName;
    @Column(name = "teacher_surname", nullable = false, length = 250)
    private String teacherSurname;
    @Column(name = "teacher_email", nullable = false, length = 250, unique = true)
    private String teacherEmail;

    public Teacher() {
    }

    public Teacher(String teacherName, String teacherSurname, String teacherEmail) {
        this.teacherName = teacherName;
        this.teacherSurname = teacherSurname;
        this.teacherEmail = teacherEmail;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getTeacherSurname() {
        return teacherSurname;
    }

    public void setTeacherSurname(String teacherSurname) {
        this.teacherSurname = teacherSurname;
    }

    public String getTeacherEmail() {
        return teacherEmail;
    }

    public void setTeacherEmail(String teacherEmail) {
        this.teacherEmail = teacherEmail;
    }
}
