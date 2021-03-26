package com.alasdoo.developercourseassignment.service.impl;

import com.alasdoo.developercourseassignment.dto.StudentDeveloperCourseDTO;
import com.alasdoo.developercourseassignment.entity.DeveloperCourse;
import com.alasdoo.developercourseassignment.entity.Student;
import com.alasdoo.developercourseassignment.entity.StudentDeveloperCourse;
import com.alasdoo.developercourseassignment.mapper.StudentDeveloperCourseMapper;
import com.alasdoo.developercourseassignment.repository.DeveloperCourseRepository;
import com.alasdoo.developercourseassignment.repository.StudentDeveloperCourseRepository;
import com.alasdoo.developercourseassignment.repository.StudentRepository;
import com.alasdoo.developercourseassignment.service.StudentDeveloperCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentDeveloperCourseServiceImpl implements StudentDeveloperCourseService {

    @Autowired
    private StudentDeveloperCourseRepository studentDeveloperCourseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DeveloperCourseRepository developerCourseRepository;

    @Autowired
    private StudentDeveloperCourseMapper studentDeveloperCourseMapper;

    @Override
    public StudentDeveloperCourseDTO findOne(Integer id) {
        Optional<StudentDeveloperCourse> studentDeveloperCourse = studentDeveloperCourseRepository.findById(id);
        if (!studentDeveloperCourse.isPresent()) {
            throw new IllegalArgumentException
                ("Student course with the following id = " + id + " is not found.");
        }
        return studentDeveloperCourseMapper.transformToDTO(studentDeveloperCourse.get());
    }

    @Override
    public List<StudentDeveloperCourseDTO> findAll() {
        return studentDeveloperCourseRepository.findAll().stream().map(i -> studentDeveloperCourseMapper.transformToDTO(i)).collect(Collectors.toList());
    }

    @Override
    public StudentDeveloperCourseDTO save(StudentDeveloperCourseDTO studentDeveloperCourseDTO) {
        StudentDeveloperCourse studentDeveloperCourse = studentDeveloperCourseMapper.transformToEntity(studentDeveloperCourseDTO);
        Integer studentId = studentDeveloperCourseDTO.getStudentId();
        Integer courseId = studentDeveloperCourseDTO.getDeveloperCourseId();
        Optional<Student> student = studentRepository.findById(studentId);
        Optional<DeveloperCourse> developerCourse = developerCourseRepository.findById(courseId);
        if (!student.isPresent()) {
            throw new IllegalArgumentException
                ("Student with the following id = " + studentId + " is not found.");
        }
        if (!developerCourse.isPresent()) {
            throw new IllegalArgumentException
                ("Course with the following id = " + courseId + " is not found.");
        }
        if (studentDeveloperCourseRepository.findByDeveloperCourseIdAndStudentId(courseId, studentId).isPresent()) {
            throw new IllegalArgumentException
                ("Student course combination is already present.");
        }
        return studentDeveloperCourseMapper.transformToDTO(studentDeveloperCourseRepository.save(studentDeveloperCourse));
    }

    @Override
    public void remove(Integer id) {
        Optional<StudentDeveloperCourse> studentDeveloperCourse = studentDeveloperCourseRepository.findById(id);
        if (!studentDeveloperCourse.isPresent()) {
            throw new IllegalArgumentException
                ("Student course with the following id = " + id + " is not found.");
        }
        studentDeveloperCourseRepository.deleteById(id);
    }

    @Override
    public StudentDeveloperCourseDTO update(Integer id, StudentDeveloperCourseDTO studentDeveloperCourseDTO) {
        Optional<StudentDeveloperCourse> oldStudentDeveloperCourse = studentDeveloperCourseRepository.findById(id);
        if (!oldStudentDeveloperCourse.isPresent()) {
            throw new IllegalArgumentException
                ("Student course with the following id = " + id + " is not found.");
        }
        oldStudentDeveloperCourse.get().setDeveloperCourseId(studentDeveloperCourseDTO.getDeveloperCourseId());
        oldStudentDeveloperCourse.get().setStudentId(studentDeveloperCourseDTO.getStudentId());
        oldStudentDeveloperCourse.get().setClassesBought(studentDeveloperCourseDTO.getClassesBought());
        studentDeveloperCourseRepository.save(oldStudentDeveloperCourse.get());
        return studentDeveloperCourseMapper.transformToDTO(oldStudentDeveloperCourse.get());
    }

    @Override
    public StudentDeveloperCourseDTO findByStudentId(Integer studentId) {
        Optional<StudentDeveloperCourse> studentDeveloperCourse = studentDeveloperCourseRepository.findByStudentId(studentId);
        if (!studentDeveloperCourse.isPresent()) {
            throw new IllegalArgumentException
                ("Student with the following id = " + studentId + " is not found.");
        }
        return studentDeveloperCourseMapper.transformToDTO(studentDeveloperCourse.get());
    }

    @Override
    public List<StudentDeveloperCourseDTO> findByDeveloperCourseId(Integer developerCourseId) {
        Optional<List<StudentDeveloperCourse>> studentDeveloperCourse = studentDeveloperCourseRepository.findByDeveloperCourseId(developerCourseId);
        if (!studentDeveloperCourse.isPresent()) {
            throw new IllegalArgumentException
                ("Course with the following id = " + developerCourseId + " is not found.");
        }
        return studentDeveloperCourseMapper.transformToListOfDTO(studentDeveloperCourse.get());
    }
}
