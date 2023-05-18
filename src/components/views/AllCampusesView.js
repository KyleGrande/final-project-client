/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core";

// Custom styles for the component
const useStyles = makeStyles({
  root: {
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  allCampusViewer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  allCampusItem: {
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

const AllCampusesView = (props) => {
  const classes = useStyles();
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return <div>
      <p>We currently lack any campuses in our system. 
        <br/>Feel free to ADD one!</p>
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
    </div>;
    
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>
      <Link to={`/newcampus`}>
        <button className={classes.button}>Add New Campus</button>
      </Link>
      <div className={classes.allCampusViewer}>
      {props.allCampuses.map((campus) => (
        <div className={classes.allCampusItem} key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <img src={campus.imageUrl} alt={campus.name} width={200}/>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <button className={classes.button} onClick={() => props.deleteCampus(campus.id)}>Delete Campus</button>
          <hr/>
        </div>
      ))}
      </div>
      <br/>

      <br/><br/>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;