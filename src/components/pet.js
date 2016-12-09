import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMyPet, getPets } from '../actions/index';

function mapStateToProps(state){
  return {
    pet: state.pet
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchMyPet: fetchMyPet,
    getPets: getPets
  }, dispatch)
}

class Pet extends Component{
  constructor(props){
    super(props);
    this.state = {
      truncateDesc: true
    }
    this.props.fetchMyPet();
    this.untruncate = this.untruncate.bind(this);
    this.truncate = this.truncate.bind(this);
  };
  componentWillMount(){
  };
  componentDidMount(){
    console.log("current props", this.props)
  };
  truncate(){
    this.setState({truncateDesc: true})
  };
  untruncate(){
    this.setState({truncateDesc: false})
  };
  render(){
    return(
      <div className="pet-card">
        <img src={this.props.pet.current_pet.photo}></img>
        <h3>
            {this.props.pet.current_pet.name}
        </h3>
        <h6>
          {this.props.pet.current_pet.city}, {this.props.pet.current_pet.state}
        </h6>
        <p id="pet-description" className={this.state.truncateDesc? "flow-text truncate" : "flow-text"} onClick={this.state.truncateDesc? this.untruncate : this.truncate}>
          <i>
            {this.props.pet.current_pet.description}
          </i>
        </p>
        <p>
          <a href={this.props.pet.current_pet.link}>View Profile</a>
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pet);
