import { makeStyles, Fab } from '@material-ui/core';
import React from 'react';
import CourseList from './list';
import CourseForm from './form';
import { useHistory, useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function StudentSectionLayout() {
  const classes = useStyles();
  const { id } = useParams();
  const [epoch, update] = React.useState(0);
  const history = useHistory();

  const handleChange = React.useCallback(() => {
    update(new Date().getTime());
  }, [update]);

  return (
    <React.Fragment>
      <CourseList epoch={epoch} />
      {id && (
        <CourseForm
          key={id} // Force rerendering when id changes.
          courseId={id === 'new' ? null : id}
          onChange={handleChange}
        />
      )}
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={() => {
          history.push('/course/new');
        }}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
