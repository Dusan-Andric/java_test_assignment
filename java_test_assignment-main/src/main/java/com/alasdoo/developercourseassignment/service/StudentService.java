package com.alasdoo.developercourseassignment.service;

import com.alasdoo.developercourseassignment.dto.StudentDTO;

public interface StudentService extends CrudService<StudentDTO> {

    StudentDTO findByAccountName(String accountName);

    StudentDTO findByAccountNameAndPassword(String accountName, String password);
}
