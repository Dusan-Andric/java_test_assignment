import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Form, Formik } from 'formik';
import { Button, makeStyles } from '@material-ui/core';
import SubmitButton from '../../fields/SubmitButton';
import TextField from '../../fields/TextField';
import SelectField from '../../fields/SelectField';
import { useCourses } from './hook';
import { map, isUndefined, flow, reject, some } from 'lodash/fp';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      paddingBottom: theme.spacing(2),
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const columns = [
  { field: 'courseName', headerName: 'Course name', width: 300 },
  {
    field: 'classesBought',
    headerName: 'Bought classes',
    width: 100,
  },
];

export default function StudentCourses({ studentId }) {
  const classes = useStyles();

  const [versionTag, updateVersionTag] = React.useState(0);

  const { courses, allCourses, fetching } = useCourses(studentId, [versionTag]);

  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const handleSubmit = async (
    values,
    { setErrors, setSubmitting, ...rest },
  ) => {
    const isNew = isUndefined(values.id);

    fetch(
      `${process.env.REACT_APP_API}/studentdevelopercourse/` +
        (isNew ? `addStudentDeveloperCourse` : `update/${values.id}`),
      {
        method: isNew ? 'POST' : 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          studentId: values.studentId,
          developerCourseId: values.developerCourseId ?? 1,
          classesBought: values.classesBought,
        }),
      },
    )
      .then((result) => result.json())
      .then((result) => {
        setSubmitting(false);
        setSelectedCourse(null);
        updateVersionTag(new Date().getTime());
      });
  };

  const handleDelete = () => {
    fetch(
      `${process.env.REACT_APP_API}/studentdevelopercourse/delete/${selectedCourse.id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    ).then((result) => {
      updateVersionTag(new Date().getTime());
    });
    setSelectedCourse(null);
  };

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div>
        {selectedCourse !== null && (
          <Formik
            initialValues={selectedCourse}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            <Form className={classes.form}>
              <SelectField
                name="developerCourseId"
                required
                disabled={!isUndefined(selectedCourse.id)}
                label="Course"
                items={flow(
                  reject(
                    (c) =>
                      isUndefined(selectedCourse.id) &&
                      some((e) => e.developerCourseId === c.id, courses),
                  ),
                  map((c) => ({ value: c.id, label: c.developerCourseName })),
                )(allCourses)}
              ></SelectField>
              <TextField
                name="classesBought"
                type="number"
                label="Classes bought"
                required
              ></TextField>
              <div className={classes.actions}>
                <SubmitButton data-test-id="save" submitLabel="Submitting...">
                  Save
                </SubmitButton>
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedCourse(null);
                  }}
                  color="secondary"
                  data-test-id="cancel"
                >
                  Cancel
                </Button>
                {selectedCourse?.id && (
                  <Button
                    variant="contained"
                    onClick={handleDelete}
                    color="secondary"
                    data-test-id="delete"
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Form>
          </Formik>
        )}
        {selectedCourse === null && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedCourse({
                classesBought: '',
                developerCourseId: '',
                studentId,
              });
            }}
            data-test-id="add-courses"
          >
            Add new course
          </Button>
        )}
      </div>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          columns={columns}
          rows={courses}
          pageSize={10}
          rowHeight={36}
          hideFooterSelectedRowCount={true}
          disableSelectionOnClick={true}
          loading={fetching}
          onRowClick={(params) => {
            setSelectedCourse(params.row);
          }}
        ></DataGrid>
      </div>
    </div>
  );
}
