package com.alasdoo.developercourseassignment.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "teacher_developer_course")
public class TeacherDeveloperCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    @Column(name = "developer_course_id", nullable = false, length = 250)
    private Integer developerCourseId;
    @Column(name = "teacher_id", nullable = false, length = 250)
    private Integer teacherId;

    public TeacherDeveloperCourse() {
    }

    public TeacherDeveloperCourse(Integer developerCourseId, Integer teacherId) {
        this.developerCourseId = developerCourseId;
        this.teacherId = teacherId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDeveloperCourseId() {
        return developerCourseId;
    }

    public void setDeveloperCourseId(Integer developerCourseId) {
        this.developerCourseId = developerCourseId;
    }

    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }
}
