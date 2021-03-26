package com.alasdoo.developercourseassignment.service.impl;

import com.alasdoo.developercourseassignment.dto.StudentDTO;
import com.alasdoo.developercourseassignment.entity.Student;
import com.alasdoo.developercourseassignment.mapper.StudentMapper;
import com.alasdoo.developercourseassignment.repository.StudentRepository;
import com.alasdoo.developercourseassignment.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    @Override
    public StudentDTO findOne(Integer id) {
        Optional<Student> student = studentRepository.findById(id);
        if (!student.isPresent()) {
            throw new IllegalArgumentException
                ("Student with the following id = " + id + " is not found.");
        }
        return studentMapper.transformToDTO(student.get());
    }

    @Override
    public List<StudentDTO> findAll() {
        return studentRepository.findAll().stream().map(i -> studentMapper.transformToDTO(i)).collect(Collectors.toList());
    }

    @Override
    public StudentDTO save(StudentDTO studentDTO) {
        Student student = studentMapper.transformToEntity(studentDTO);
        return studentMapper.transformToDTO(studentRepository.save(student));
    }

    @Override
    public void remove(Integer id) throws IllegalArgumentException {
        Optional<Student> student = studentRepository.findById(id);
        if (!student.isPresent()) {
            throw new IllegalArgumentException
                ("Student with the following id = " + id + " is not found.");
        }
        studentRepository.deleteById(id);
    }

    @Override
    public StudentDTO update(Integer id, StudentDTO studentDTO) {
        Optional<Student> oldStudent = studentRepository.findById(id);
        if (!oldStudent.isPresent()) {
            throw new IllegalArgumentException
                ("Student with the following id = " + id + " is not found.");
        }
        oldStudent.get().setName(studentDTO.getName());
        oldStudent.get().setSurname(studentDTO.getSurname());
        oldStudent.get().setAccountName(studentDTO.getAccountName());
        oldStudent.get().setPassword(studentDTO.getPassword());
        oldStudent.get().setEmail(studentDTO.getEmail());
        oldStudent.get().setBankCardNumber(studentDTO.getBankCardNumber());
        studentRepository.save(oldStudent.get());
        return studentMapper.transformToDTO(oldStudent.get());
    }

    @Override
    public StudentDTO findByAccountName(String accountName) {
        Optional<Student> student = studentRepository.findByAccountName(accountName);
        if (!student.isPresent()) {
            throw new IllegalArgumentException
                ("Student with the following account name = " + accountName + " is not found.");
        }
        return studentMapper.transformToDTO(student.get());
    }

    @Override
    public StudentDTO findByAccountNameAndPassword(String accountName, String password) {
        Optional<Student> student = studentRepository.findByAccountNameAndPassword(accountName, password);
        if (!student.isPresent()) {
            throw new IllegalArgumentException
                ("Student with the provided account name and password combination is not found.");
        }
        return studentMapper.transformToDTO(student.get());
    }
}
