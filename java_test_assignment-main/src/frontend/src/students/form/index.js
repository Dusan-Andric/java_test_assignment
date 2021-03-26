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

export default function StudentForm({ studentId, onChange, toggleCourses }) {
  const classes = useStyles();
  const history = useHistory();

  const isNew = isNil(studentId);

  const [loading, setLoading] = React.useState(false);
  const [student, setStudent] = React.useState(
    isNew
      ? {
          name: '',
          surname: '',
          accountName: '',
          email: '',
          password: '',
          bankCardNumber: '',
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
    fetch(`${process.env.REACT_APP_API}/student/getStudent/${studentId}`, {
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
        setStudent(result);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          // We know it's been canceled!
        } else {
          // Show notification
          history.push('/student');
        }
      });
    setLoading(true);

    return () => {
      controller.abort();
    };
  }, [studentId, isNew, history]);

  if (!student || loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const handleSubmit = async (
    values,
    { setErrors, setSubmitting, ...rest },
  ) => {
    fetch(
      `${process.env.REACT_APP_API}/student/` +
        (isNew ? `addStudent` : `update/${studentId}`),
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
        history.push(`/student/${result.id}`);
      });
  };

  const handleDelete = async () => {
    fetch(`${process.env.REACT_APP_API}/student/delete/${studentId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((result) => {
      onChange();
    });
    history.push(`/student`);
  };

  return (
    <div className={classes.root}>
      <div style={{ textAlign: 'right' }}>
        <IconButton
          onClick={() => {
            history.push('/student');
          }}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </div>
      <Formik
        initialValues={student}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        <Form className={classes.form}>
          <TextField name="name" label="Name" required></TextField>
          <TextField name="surname" label="Surname" required></TextField>
          <TextField
            name="accountName"
            label="Account name"
            disabled={!isNew}
          ></TextField>
          <TextField
            name="email"
            label="Email"
            type="email"
            required
          ></TextField>
          <TextField
            name="bankCardNumber"
            label="Bank card number"
            disabled={!isNew}
          ></TextField>
          {/* Do not render toggle button if student is not yet saved */}
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
