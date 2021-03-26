package com.alasdoo.developercourseassignment.service;

import com.alasdoo.developercourseassignment.dto.DeveloperCourseDTO;

import java.util.List;

public interface DeveloperCourseService extends CrudService<DeveloperCourseDTO> {

    List<DeveloperCourseDTO> findByDeveloperCourseName(String developerCourseName);

    List<DeveloperCourseDTO> findByDeveloperCourseByStudentId(Integer studentId);

    List<DeveloperCourseDTO> findByDeveloperCourseByTeacherId(Integer teacherId);
}
