import React from 'react';
import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { isNil } from 'lodash/fp';
import TextField from '../../fields/TextField';
import { Formik, Form } from 'formik';
import SubmitButton from '../../fields/SubmitButton';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
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

export default function TeacherForm({ teacherId, onChange, toggleCourses }) {
  const classes = useStyles();
  const history = useHistory();

  const isNew = isNil(teacherId);

  const [loading, setLoading] = React.useState(false);
  const [teacher, setTeacher] = React.useState(
    isNew
      ? {
          teacherName: '',
          teacherSurname: '',
          teacherEmail: '',
        }
      : null,
  );

  React.useEffect(() => {
    if (isNew) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    // Must handle failed responses (like not found)
    fetch(`${process.env.REACT_APP_API}/teacher/getTeacher/${teacherId}`, {
      method: 'GET',
      mode: 'cors',
      signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((result) => {
        if (result.ok && result.status === 200) {
          return result;
        } else {
          throw new Error('Fetch failed.');
        }
      })
      .then((result) => result.json())
      .then((result) => {
        setTeacher(result);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          // We know it's been canceled!
        } else {
          // Not working, hmm...
          history.push('/teacher');
        }
      });
    setLoading(true);

    return () => {
      controller.abort();
    };
  }, [teacherId, isNew, history]);

  if (!teacher || loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const handleSubmit = async (
    values,
    { setErrors, setSubmitting, ...rest },
  ) => {
    fetch(
      `${process.env.REACT_APP_API}/teacher/` +
        (isNew ? `addTeacher` : `update/${teacherId}`),
      {
        method: isNew ? 'POST' : 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      },
    )
      .then((result) => result.json())
      .then((result) => {
        setSubmitting(false);
        onChange();
        history.push(`/teacher/${result.id}`);
      });
  };

  const handleDelete = async () => {
    fetch(`${process.env.REACT_APP_API}/teacher/delete/${teacherId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((result) => {
      onChange();
    });
    history.push(`/teacher`);
  };

  return (
    <div className={classes.root}>
      <div style={{ textAlign: 'right' }}>
        <IconButton
          onClick={() => {
            history.push('/teacher');
          }}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </div>
      <Formik
        initialValues={teacher}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form className={classes.form}>
          <TextField name="teacherName" label="Name" required></TextField>
          <TextField name="teacherSurname" label="Surname" required></TextField>
          <TextField
            name="teacherEmail"
            label="Email"
            type="email"
            required
          ></TextField>

          {/* Do not render toggle button if teacher is not yet saved */}
          {!isNew && (
            <div>
              <Button onClick={toggleCourses} data-test-id="courses">
                Toggle courses
              </Button>
            </div>
          )}
          <div className={classes.actions}>
            <SubmitButton data-test-id="save" submitLabel="Submitting...">
              Save
            </SubmitButton>
            <Button
              variant="contained"
              onClick={handleDelete}
              color="secondary"
              data-test-id="delete"
            >
              Delete
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
