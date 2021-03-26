import { makeStyles, Fab } from '@material-ui/core';
import React from 'react';
import StudentList from './list';
import CourseList from './courses';
import StudentForm from './form';
import {
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  Route,
  useLocation,
} from 'react-router-dom';
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
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const handleChange = React.useCallback(() => {
    update(new Date().getTime());
  }, [update]);

  const handleCourseToggle = React.useCallback(() => {
    if (pathname.match(/\/courses$/)) {
      history.push(`/student/${id}`);
    } else {
      history.push(`/student/${id}/courses`);
    }
  }, [history, id, pathname]);

  return (
    <React.Fragment>
      <StudentList epoch={epoch} />
      {id && (
        <StudentForm
          key={id} // Force rerendering when id changes.
          studentId={id === 'new' ? null : id}
          onChange={handleChange}
          toggleCourses={handleCourseToggle}
        />
      )}
      <Switch>
        <Route path={`${url}/courses`}>
          <CourseList studentId={id} />
        </Route>
      </Switch>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={() => {
          history.push('/student/new');
        }}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
