import React from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  makeStyles,
  Typography,
} from '@material-ui/core';
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

export default function CourseForm({ courseId, onChange, toggleCourses }) {
  const classes = useStyles();
  const history = useHistory();

  const isNew = isNil(courseId);

  const [loading, setLoading] = React.useState(false);
  const [course, setCourse] = React.useState(
    isNew
      ? {
          developerCourseName: '',
          costPerClass: '',
          classesPerWeek: '',
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
    fetch(
      `${process.env.REACT_APP_API}/developercourse/getCourse/${courseId}`,
      {
        method: 'GET',
        mode: 'cors',
        signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then((result) => {
        if (result.ok && result.status === 200) {
          return result;
        } else {
          throw new Error('Fetch failed.');
        }
      })
      .then((result) => result.json())
      .then((result) => {
        setCourse(result);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name === 'AbortError') {
          // We know it's been canceled!
        } else {
          // Show notification
          history.push('/course');
        }
      });
    setLoading(true);

    return () => {
      controller.abort();
    };
  }, [courseId, isNew, history]);

  if (!course || loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const handleSubmit = async (
    values,
    { setErrors, setSubmitting, ...rest },
  ) => {
    fetch(
      `${process.env.REACT_APP_API}/developercourse/` +
        (isNew ? `addDeveloperCourse` : `update/${courseId}`),
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
        history.push(`/course/${result.id}`);
      });
  };

  const handleDelete = async () => {
    fetch(`${process.env.REACT_APP_API}/developercourse/delete/${courseId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((result) => {
      onChange();
    });
    history.push(`/course`);
  };

  return (
    <div className={classes.root}>
      <div style={{ textAlign: 'right' }}>
        <IconButton
          onClick={() => {
            history.push('/course');
          }}
        >
          <CloseIcon></CloseIcon>
        </IconButton>
      </div>
      <Formik
        initialValues={course}
        enableReinitialize={false}
        onSubmit={handleSubmit}
      >
        <Form className={classes.form}>
          <TextField
            name="developerCourseName"
            label="Course name"
            required
          ></TextField>
          <TextField
            name="costPerClass"
            label="Cost per class"
            required
            type="number"
            min="0"
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
          ></TextField>
          <TextField
            name="classesPerWeek"
            label="Class per week"
            required
            type="number"
            min="0"
          ></TextField>

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
