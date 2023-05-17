/*==================================================
EditStudentContainer.js
================================================== */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    constructor(props){
      super(props);
      this.state = {
        firstname: "", 
        lastname: "",
        email: "",
        imageUrl: "",
        gpa: null,
        campusId: null, 
        redirect: false
      };
    }
  
    async componentDidMount() {
      await this.props.fetchStudent(this.props.match.params.id);
      const { student } = this.props;
      if (student) {
        this.setState({
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
          imageUrl: student.imageUrl,
          gpa: student.gpa,
          campusId: student.campusId
        });
      }
    }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();  
  
    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      campusId: this.state.campusId
    };
    
    // Update student in back-end database
    await this.props.editStudent(this.props.match.params.id, student);

    // Trigger redirect to show the updated student
    this.setState({
      redirect: true
    });
  }

  render() {
    // Redirect to the updated student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.props.match.params.id}`}/>)
    }

    // Display the edit form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          student = {this.state}
        />
      </div>          
    );
  }
}

const mapState = (state) => {
    return {
      student: state.student,
    };
  };
  
  const mapDispatch = (dispatch) => {
    return({
      fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
      editStudent: (id, student) => dispatch(editStudentThunk(id, student)),
    })
  }
  
  export default connect(mapState, mapDispatch)(EditStudentContainer);