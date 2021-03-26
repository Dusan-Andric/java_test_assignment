import { useState, useEffect } from 'react';
import { filter, flow, map, get, find } from 'lodash/fp';

function fetchStudentCourses(teacherId) {
  return fetch(`${process.env.REACT_APP_API}/teacherdevelopercourse/getAll`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((result) => result.json())
    .then(filter((c) => c.teacherId === parseInt(teacherId)));
}

function fetchCourses() {
  return fetch(`${process.env.REACT_APP_API}/developercourse/getAll`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((result) => result.json());
}

export function useCourses(teacherId, dependency) {
  const [fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState(null);
  const [teacherCourses, setTeacherCourses] = useState(null);
  const [extendedCourses, setExtendedCourses] = useState([]);

  useEffect(() => {
    setFetching(true);
    fetchStudentCourses(teacherId)
      .then((teacherCourses) => {
        setTeacherCourses(teacherCourses);
      })
      .catch((e) => {
        console.error(e);
      });

    setFetching(true);
  }, [teacherId, ...dependency]);

  useEffect(() => {
    setFetching(true);

    fetchCourses()
      .then((courses) => {
        setCourses(courses);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    if (courses === null || teacherCourses === null) {
      return null;
    }

    setFetching(false);

    const extendedCourses = map((c) => ({
      ...c,
      courseName: flow(
        find((course) => c.developerCourseId === course.id),
        get('developerCourseName'),
      )(courses),
    }))(teacherCourses);

    setExtendedCourses(extendedCourses);
  }, [courses, teacherCourses]);

  return {
    fetching,
    courses: extendedCourses,
    allCourses: courses,
  };
}
