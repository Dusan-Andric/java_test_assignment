import { useState, useEffect } from 'react';
import { filter, flow, map, get, find } from 'lodash/fp';

function fetchStudentCourses(studentId) {
  return fetch(`${process.env.REACT_APP_API}/studentdevelopercourse/getAll`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((result) => result.json())
    .then(filter((c) => c.studentId === parseInt(studentId)));
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

export function useCourses(studentId, dependency) {
  const [fetching, setFetching] = useState(false);
  const [courses, setCourses] = useState(null);
  const [studentCourses, setStudentCourses] = useState(null);
  const [extendedCourses, setExtendedCourses] = useState([]);

  useEffect(() => {
    setFetching(true);
    fetchStudentCourses(studentId)
      .then((studentCourses) => {
        setStudentCourses(studentCourses);
      })
      .catch((e) => {
        console.error(e);
      });

    setFetching(true);
  }, [studentId, ...dependency]);

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
    if (courses === null || studentCourses === null) {
      return null;
    }

    setFetching(false);

    const extendedCourses = map((c) => ({
      ...c,
      courseName: flow(
        find((course) => c.developerCourseId === course.id),
        get('developerCourseName'),
      )(courses),
    }))(studentCourses);

    setExtendedCourses(extendedCourses);
  }, [courses, studentCourses]);

  return {
    fetching,
    courses: extendedCourses,
    allCourses: courses,
  };
}
