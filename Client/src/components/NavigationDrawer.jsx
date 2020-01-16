import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";
import SignUp from "../RouteComponents/SignUp";
import Settings from "../RouteComponents/Settings";
import Dashboard from "../RouteComponents/Dashboard";
import Users from "../RouteComponents/Users";
import Transaction from "../RouteComponents/Transactions";
import Group from "../RouteComponents/Groups";
import ToolBar from "./Toolbar";
import SideBar from "./SideBar";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function NavigationDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <ToolBar open={open} handleDrawerOpen={handleDrawerOpen} />
      </AppBar>
      <SideBar
        open={open}
        classes={classes}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/Dashboard" component={Settings} />
          <Route path="/Transactions" component={Transaction} />
          <Route path="/Users" component={Users} />
          <Route path="/Groups" component={Group} />
          <Route path="/Settings" component={Settings} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </main>
    </div>
  );
}
