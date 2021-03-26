package com.alasdoo.developercourseassignment.mapper;

import com.alasdoo.developercourseassignment.dto.TeacherDTO;
import com.alasdoo.developercourseassignment.entity.Teacher;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class TeacherMapper {

    public TeacherDTO transformToDTO(Teacher teacherSrc) {
        TeacherDTO teacherDTO = new TeacherDTO();
        BeanUtils.copyProperties(teacherSrc, teacherDTO);
        return teacherDTO;
    }

    public Teacher transformToEntity(TeacherDTO teacherDTOSrc) {
        Teacher developerCourseTeacher = new Teacher();
        BeanUtils.copyProperties(teacherDTOSrc, developerCourseTeacher);
        return developerCourseTeacher;
    }

}
