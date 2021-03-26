package com.alasdoo.developercourseassignment.mapper;

import com.alasdoo.developercourseassignment.dto.StudentDeveloperCourseDTO;
import com.alasdoo.developercourseassignment.entity.StudentDeveloperCourse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StudentDeveloperCourseMapper {

    public StudentDeveloperCourseDTO transformToDTO(StudentDeveloperCourse studentDeveloperCourseSrc) {
        StudentDeveloperCourseDTO studentDeveloperCourseDTO = new StudentDeveloperCourseDTO();
        BeanUtils.copyProperties(studentDeveloperCourseSrc, studentDeveloperCourseDTO);
        return studentDeveloperCourseDTO;
    }

    public StudentDeveloperCourse transformToEntity(StudentDeveloperCourseDTO studentDeveloperCourseDTOSrc) {
        StudentDeveloperCourse studentDeveloperCourse = new StudentDeveloperCourse();
        BeanUtils.copyProperties(studentDeveloperCourseDTOSrc, studentDeveloperCourse);
        return studentDeveloperCourse;
    }

    public List<StudentDeveloperCourseDTO> transformToListOfDTO(List<StudentDeveloperCourse> studentDeveloperCourseDTOSrc) {
        List<StudentDeveloperCourseDTO> studentDeveloperCourseDTO = new ArrayList<>(studentDeveloperCourseDTOSrc.size());
        for (StudentDeveloperCourse studentDeveloperCourse : studentDeveloperCourseDTOSrc) {
            studentDeveloperCourseDTO.add(transformToDTO(studentDeveloperCourse));
        }
        return studentDeveloperCourseDTO;
    }
}
