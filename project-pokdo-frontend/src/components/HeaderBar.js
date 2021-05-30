import React from "react";

import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";

import logo from "../images/headerlogo.png";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  headerImage: {
    maxHeight: "200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  appBar: {
    backgroundColor: "#fff",
  },
}));

export default function HeaderBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <ToolBar>
          <img src={logo} className={classes.headerImage} alt="logo" />
        </ToolBar>
      </AppBar>
    </div>
  );
}
