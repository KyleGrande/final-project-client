import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import EditCampusView from '../views/EditCampusView';
import Header from './Header';

class EditCampusContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "", 
      address: "",
      imageUrl: "",
      description: "",
      redirect: false
    };
  }

  async componentDidMount() {
    await this.props.fetchCampus(this.props.match.params.id);
    const { campus } = this.props;
    if (campus) {
      this.setState({
        name: campus.name,
        address: campus.address,
        imageUrl: campus.imageUrl,
        description: campus.description,
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
    
    const campus = {
      name: this.state.name,
      address: this.state.address,
      imageUrl: this.state.imageUrl || undefined, // Check if imageUrl is empty and set it to undefined
      description: this.state.description,
    };
    
    await this.props.editCampus(this.props.match.params.id, campus);

    this.setState({
      redirect: true
    });
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to={`/campus/${this.props.match.params.id}`} />
    }

    return (
    <div>
        <Header />
      <EditCampusView 
        handleChange={this.handleChange} 
        handleSubmit={this.handleSubmit}
        campus={this.state}
      />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (id, campus) => dispatch(editCampusThunk(id, campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
