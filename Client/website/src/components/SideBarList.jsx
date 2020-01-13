import React, { Component } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import StorageIcon from "@material-ui/icons/Storage";
import SettingsIcon from "@material-ui/icons/Settings";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const SideBarList = () => {
  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button component={Link} to="/Transactions">
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItem>

      <ListItem button component={Link} to="/Groups">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Groups" />
      </ListItem>
      <ListItem button component={Link} to="/Users">
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem button component={Link} to="/Settings">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  );
};

export default SideBarList;
