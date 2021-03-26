package com.alasdoo.developercourseassignment.dto;

import java.io.Serializable;

public class DeveloperCourseDTO implements Serializable {

    private Integer id;
    private String developerCourseName;
    private Integer costPerClass;
    private Integer classesPerWeek;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDeveloperCourseName() {
        return developerCourseName;
    }

    public void setDeveloperCourseName(String developerCourseName) {
        this.developerCourseName = developerCourseName;
    }

    public Integer getCostPerClass() {
        return costPerClass;
    }

    public void setCostPerClass(Integer costPerClass) {
        this.costPerClass = costPerClass;
    }

    public Integer getClassesPerWeek() {
        return classesPerWeek;
    }

    public void setClassesPerWeek(Integer classesPerWeek) {
        this.classesPerWeek = classesPerWeek;
    }
}
