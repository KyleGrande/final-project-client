// NewCampusContainer.js
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      address: "",
      imageUrl: "",
      description: "",
      redirect: false, 
      redirectId: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    let campus = {
      name: this.state.name,
      address: this.state.address,
      imageUrl: this.state.imageUrl || undefined, // Check if imageUrl is empty and set it to undefined
      description: this.state.description,
    };
    
    let newCampus = await this.props.addCampus(campus);

    this.setState({
      name: "", 
      address: "", 
      imageUrl: "",
      description: "",
      redirect: true, 
      redirectId: newCampus.id
    });
  }

  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }

  render() {
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    return (
      <div>
        <Header />
        <NewCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  }
}

export default connect(null, mapDispatch)(NewCampusContainer);
