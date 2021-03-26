import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import MainLayout from './layout';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import StudentSectionLayout from './students';
import TeacherSectionLayout from './teachers';
import CourseSectionLayout from './courses';
import Settings from './settings';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F8A9D',
      contrastTextDisabled: 'rgba(255,255,255,.5)',
    },
    secondary: {
      main: '#E1E1E1',
    },
    background: {
      default: '#F3F4F5', //'#E3E4E5',
    },
  },
  // overrides: {
  //   MuiButton: {
  //     root: {
  //       margin: 8,
  //     },
  //   },
  //   MuiFormControl: {
  //     root: {
  //       marginTop: 8,
  //       marginBottom: 8,
  //     },
  //   },
  // },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            path="/"
            component={() => {
              return (
                <MainLayout>
                  <Switch>
                    <Route
                      path="/student/:id?"
                      component={StudentSectionLayout}
                    />
                    <Route
                      path="/teacher/:id?"
                      component={TeacherSectionLayout}
                    />
                    <Route
                      path="/course/:id?"
                      component={CourseSectionLayout}
                    />
                    <Route path="/settings" component={Settings} />
                    <Redirect from="/" to="/student" />
                  </Switch>
                </MainLayout>
              );
            }}
          ></Route>
          {/* Default landing page */}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
