package com.alasdoo.developercourseassignment.repository;

import com.alasdoo.developercourseassignment.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Integer> {

    Optional<Teacher> findByTeacherNameAndTeacherSurname(String name, String surname);

    Optional<Teacher> findByTeacherEmail(String email);

}
