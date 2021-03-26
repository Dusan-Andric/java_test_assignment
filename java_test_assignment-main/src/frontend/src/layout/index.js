import React from 'react';
import {
  makeStyles,
  AppBar,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 140;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    '& > div': {
      flex: '1 1 auto',
      padding: theme.spacing(3),
    },
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function MainLayout({ children }) {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {pathname.startsWith('/student') ? 'Student' : ''}
            {pathname.startsWith('/teacher') ? 'Teacher' : ''}
            {pathname.startsWith('/course') ? 'Courses' : ''}
            {pathname.startsWith('/settings') ? 'Settings' : ''}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
        variant="permanent"
        anchor="left"
        open={true}
        onClose={() => {}}
      >
        <Toolbar />
        <List component="nav">
          <ListItem
            button
            strict={false}
            exact={true}
            component={NavLink}
            to="/student"
          >
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem
            button
            strict={false}
            exact={true}
            component={NavLink}
            to="/teacher"
          >
            <ListItemText primary="Teachers" />
          </ListItem>
          <ListItem
            button
            strict={false}
            exact={true}
            component={NavLink}
            to="/course"
          >
            <ListItemText primary="Courses" />
          </ListItem>
          <ListItem
            button
            strict={false}
            exact={true}
            component={NavLink}
            to="/settings"
          >
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div className={classes.mainContent}>{children}</div>
      </main>
    </div>
  );
}
