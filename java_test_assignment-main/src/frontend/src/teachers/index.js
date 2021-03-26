import { makeStyles, Fab } from '@material-ui/core';
import React from 'react';
import TeacherList from './list';
import TeacherForm from './form';
import CourseList from './courses';
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
export default function TeacherSectionLayout() {
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
      history.push(`/teacher/${id}`);
    } else {
      history.push(`/teacher/${id}/courses`);
    }
  }, [history, id, pathname]);

  return (
    <React.Fragment>
      <TeacherList epoch={epoch} />
      {id && (
        <TeacherForm
          key={id}
          teacherId={id === 'new' ? null : id}
          onChange={handleChange}
          toggleCourses={handleCourseToggle}
        />
      )}
      <Switch>
        <Route path={`${url}/courses`}>
          <CourseList teacherId={id} />
        </Route>
      </Switch>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={() => {
          history.push('/teacher/new');
        }}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
