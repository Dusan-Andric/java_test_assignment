package com.alasdoo.developercourseassignment.controller;

import com.alasdoo.developercourseassignment.dto.StudentDTO;
import com.alasdoo.developercourseassignment.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentServiceImpl studentServiceImpl;

    @GetMapping(value = "/getStudent/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public StudentDTO selectStudent(@PathVariable("id") Integer id) {
        return studentServiceImpl.findOne(id);
    }

    @GetMapping(value = "/getAll", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<StudentDTO> getAllStudents() {
        return studentServiceImpl.findAll();
    }

    @PostMapping(value = "/addStudent", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public StudentDTO saveStudent(@RequestBody StudentDTO studentDTO) {
        return studentServiceImpl.save(studentDTO);
    }

    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public StudentDTO updateStudent(@PathVariable("id") Integer id, @RequestBody StudentDTO studentDTO) {
        return studentServiceImpl.update(id, studentDTO);
    }

    @DeleteMapping(value = "/delete/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void deleteStudent(@PathVariable("id") Integer id) {
        studentServiceImpl.remove(id);
    }

    @GetMapping(value = "/get/{accountName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public StudentDTO findByAccountName(@PathVariable("accountName") String accountName) {
        return studentServiceImpl.findByAccountName(accountName);
    }

    @GetMapping(value = "/get/{accountName}/{password}", produces = MediaType.APPLICATION_JSON_VALUE)
    public StudentDTO findByAccountName(@PathVariable("accountName") String accountName, @PathVariable("password") String password) {
        return studentServiceImpl.findByAccountNameAndPassword(accountName, password);
    }
}
