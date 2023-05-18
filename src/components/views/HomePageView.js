/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

// Custom styles for the component
const useStyles = makeStyles({
  root: {
    textAlign: "center",

  },

  button: {
    backgroundColor: "#f0f0f0",
    color: "#000000",
    padding: "10px 20px",
    margin: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#c5c8d6",
      color: "#000000",
    },
  },
});

const HomePageView = () => {
  // Render Home page view
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <h1>Home Page</h1>
      <h2>Welcome!</h2>
      <h3>Click on the links above to view the list of campuses and students.</h3>
      <h3>Click on the links below to add a new campus or student.</h3>
      <br/>
      <Link to="/newcampus">
        <button className={classes.button}>Add Campus</button>    
      </Link>
      <Link to="/newstudent">
        <button className={classes.button}>Add Student</button>
      </Link>

    </div>
  );    
}

export default HomePageView;