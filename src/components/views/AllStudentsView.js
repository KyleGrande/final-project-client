/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

// Custom styles for the component
const useStyles = makeStyles({
  root: {
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  allStudentsView: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  allStudentItem: {
    width: "25%",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
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
const AllStudentsView = (props) => {
  const classes = useStyles();
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.
      <br/>Feel free to ADD one!</p>
      <Link to={`newstudent`}>
        <button className={classes.button}>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>
      <Link to={`/newstudent`}>
        <button className={classes.button}>Add New Student</button>
      </Link>
    <div className={classes.allStudentsView}>
      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div className={classes.allStudentItem} key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button className={classes.button} onClick={() => deleteStudent(student.id)}>Delete</button>
              <hr/>
            </div>
          );
        }
      )}
    </div>
      <br/>

      <br/><br/>
    </div>
  );
};


export default AllStudentsView;