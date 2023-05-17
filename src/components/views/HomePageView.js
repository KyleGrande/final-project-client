/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React from "react";
import { Link } from "react-router-dom";
const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <Link to="/newcampus">
        <button>Add Campus</button>
      </Link>
      <Link to="/newstudent">
        <button>Add Student</button>
      </Link>

    </div>
  );    
}

export default HomePageView;