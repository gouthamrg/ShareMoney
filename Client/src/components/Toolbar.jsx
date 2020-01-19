import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  }
}));

const ToolBar = ({ open, handleDrawerOpen }) => {
  const classes = useStyles();

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: open
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        Share Money
      </Typography>
    </Toolbar>
  );
};

export default ToolBar;
