import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { DemoCourses, DemoStudents, DemoTeachers } from './demo-data';
import { map, flow, random, flatten, range, uniq } from 'lodash/fp';

const injectStudents = flow(
  map((student) => {
    return fetch(`${process.env.REACT_APP_API}/student/addStudent`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: student[0],
        surname: student[1],
        accountName: `${student[0].toLowerCase()}_${student[1].toLowerCase()}`,
        email: student[3],
        password: student[2],
        bankCardNumber: student[4],
      }),
    }).then((result) => result.json());
  }),
);

const injectTeachers = flow(
  map((teacher) => {
    return fetch(`${process.env.REACT_APP_API}/teacher/addTeacher`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        teacherName: teacher[0],
        teacherSurname: teacher[1],
        teacherEmail: teacher[2],
      }),
    }).then((result) => result.json());
  }),
);

const injectCourse = flow(
  map((course) => {
    return fetch(
      `${process.env.REACT_APP_API}/developercourse/addDeveloperCourse`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          developerCourseName: course[1],
          costPerClass: course[2],
          classesPerWeek: course[3],
        }),
      },
    ).then((result) => result.json());
  }),
);

const generateUniqueList = (min, max, length) =>
  flow(
    range(0),
    map((index) => random(min, max, false)),
    uniq,
  )(length);

const injectTeacherCourse = (teachers, courses) => {
  async function postTeacherCourse(teacher, course) {
    return fetch(
      `${process.env.REACT_APP_API}/teacherdevelopercourse/addTeacherCourse`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          developerCourseId: course.id,
          teacherId: teacher.id,
        }),
      },
    ).then((result) => result.json());
  }

  return flow(
    map((t) =>
      map(
        (courseIndex) => [t, courses[courseIndex]],
        generateUniqueList(0, courses.length - 1, random(2, 8, false)),
      ),
    ),
    flatten,
    map(([t, c]) => postTeacherCourse(t, c)),
  )(teachers);
};

const injectStudentCourse = (students, courses) => {
  async function postStudentCourse(student, course) {
    return fetch(
      `${process.env.REACT_APP_API}/studentdevelopercourse/addStudentDeveloperCourse`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          developerCourseId: course.id,
          studentId: student.id,
          classesBought: random(1, 10, false),
        }),
      },
    ).then((result) => result.json());
  }

  return flow(
    map((s) =>
      map(
        (courseIndex) => [s, courses[courseIndex]],
        generateUniqueList(0, courses.length - 1, random(2, 8, false)),
      ),
    ),
    flatten,
    map(([s, c]) => postStudentCourse(s, c)),
  )(students);
};

export default function Settings() {
  const [running, setRunningState] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  const handleRunningDemoContent = async () => {
    setRunningState(true);
    const injectedStudents = await Promise.all(
      injectStudents(DemoStudents.slice(10, 30)),
    );

    const injectedTeachers = await Promise.all(
      injectTeachers(DemoTeachers.slice(10, 30)),
    );

    const injectedCourses = await Promise.all(
      injectCourse(DemoCourses.slice(10, 30)),
    );

    await Promise.all(injectTeacherCourse(injectedTeachers, injectedCourses));

    await Promise.all(injectStudentCourse(injectedStudents, injectedCourses));

    setStatus(
      `Injected: Students(${injectedStudents.length}), Teachers(${injectedTeachers.length}), Courses(${injectedCourses.length})`,
    );
  };

  return (
    <div>
      <Typography variant="body2">
        Inject demo content in the backend. Run this command only once!
      </Typography>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={handleRunningDemoContent}
          disabled={running}
        >
          Start
        </Button>
      </div>
      {status && <Typography variant="caption">{status}</Typography>}
    </div>
  );
}
