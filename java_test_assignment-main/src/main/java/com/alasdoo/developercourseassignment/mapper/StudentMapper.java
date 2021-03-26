package com.alasdoo.developercourseassignment.mapper;

import com.alasdoo.developercourseassignment.dto.StudentDTO;
import com.alasdoo.developercourseassignment.entity.Student;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public StudentDTO transformToDTO(Student studentSrc) {
        StudentDTO studentDTO = new StudentDTO();
        BeanUtils.copyProperties(studentSrc, studentDTO);
        return studentDTO;
    }

    public Student transformToEntity(StudentDTO studentDTOSrc) {
        Student student = new Student();
        BeanUtils.copyProperties(studentDTOSrc, student);
        return student;
    }

}
