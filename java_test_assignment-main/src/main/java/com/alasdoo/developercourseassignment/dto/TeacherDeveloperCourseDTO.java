package com.alasdoo.developercourseassignment.dto;

public class TeacherDeveloperCourseDTO {

    private Integer id;
    private Integer developerCourseId;
    private Integer teacherId;

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

    public void setTeacherId(Integer developerCourseTeacherId) {
        this.teacherId = developerCourseTeacherId;
    }
}
