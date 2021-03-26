package com.alasdoo.developercourseassignment.repository;

import com.alasdoo.developercourseassignment.entity.TeacherDeveloperCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherDeveloperCourseRepository extends JpaRepository<TeacherDeveloperCourse, Integer> {

    Optional<TeacherDeveloperCourse> findByDeveloperCourseIdAndTeacherId(Integer developerCourseId, Integer teacherId);

    Optional<TeacherDeveloperCourse> findByTeacherId(Integer teacherId);
}
