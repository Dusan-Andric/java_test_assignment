package com.alasdoo.developercourseassignment.service;

import com.alasdoo.developercourseassignment.dto.TeacherDeveloperCourseDTO;

public interface TeacherDeveloperCourseService extends CrudService<TeacherDeveloperCourseDTO> {

    TeacherDeveloperCourseDTO findByTeacherId(Integer teacherId);
}
