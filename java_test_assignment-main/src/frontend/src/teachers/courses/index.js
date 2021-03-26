import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Form, Formik } from 'formik';
import { Button, makeStyles } from '@material-ui/core';
import SubmitButton from '../../fields/SubmitButton';
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
];

export default function TeacherCourses({ teacherId }) {
  const classes = useStyles();

  const [versionTag, updateVersionTag] = React.useState(0);

  const { courses, allCourses, fetching } = useCourses(teacherId, [versionTag]);

  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const handleSubmit = async (
    values,
    { setErrors, setSubmitting, ...rest },
  ) => {
    const isNew = isUndefined(values.id);

    fetch(
      `${process.env.REACT_APP_API}/teacherdevelopercourse/` +
        (isNew ? `addTeacherCourse` : `update/${values.id}`),
      {
        method: isNew ? 'POST' : 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          teacherId: Number(values.teacherId),
          developerCourseId: Number(values.developerCourseId),
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
      `${process.env.REACT_APP_API}/teacherdevelopercourse/delete/${selectedCourse.id}`,
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
              <div className={classes.actions}>
                {isUndefined(selectedCourse?.id) && (
                  <SubmitButton data-test-id="save" submitLabel="Submitting...">
                    Save
                  </SubmitButton>
                )}
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
                developerCourseId: '',
                teacherId,
              });
            }}
            data-test-id="add-courses"
          >
            Assign new course
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
