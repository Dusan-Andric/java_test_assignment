package com.alasdoo.developercourseassignment.service;

import com.alasdoo.developercourseassignment.dto.StudentDeveloperCourseDTO;

import java.util.List;

public interface StudentDeveloperCourseService extends CrudService<StudentDeveloperCourseDTO> {

    StudentDeveloperCourseDTO findByStudentId(Integer studentId);

    List<StudentDeveloperCourseDTO> findByDeveloperCourseId(Integer developerCourseId);
}
