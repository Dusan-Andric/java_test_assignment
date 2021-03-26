package com.alasdoo.developercourseassignment.repository;

import com.alasdoo.developercourseassignment.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    Optional<Student> findByAccountName(String accountName);

    Optional<Student> findByAccountNameAndPassword(String accountName, String password);

}
