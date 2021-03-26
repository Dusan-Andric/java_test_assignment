package com.alasdoo.developercourseassignment.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "developer_course")
public class DeveloperCourse implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    @Column(name = "developer_course_name", nullable = false, length = 250)
    private String developerCourseName;
    @Column(name = "cost_per_class", nullable = false)
    private Integer costPerClass;
    @Column(name = "classes_per_week", nullable = false)
    private Integer classesPerWeek;

    public DeveloperCourse() {
    }

    public DeveloperCourse(String developerCourseName, Integer costPerClass, Integer classesPerWeek) {
        this.developerCourseName = developerCourseName;
        this.costPerClass = costPerClass;
        this.classesPerWeek = classesPerWeek;
    }

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
