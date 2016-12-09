import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { nextPet, savePet } from '../actions/index';

function mapStateToProps(state){
  return {
    pet: state.pet
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    nextPet: nextPet,
    savePet: savePet
  }, dispatch)
}



class Icons extends Component {
  constructor(props){
    super(props);
    this.nextButton = this.nextButton.bind(this);
    this.saveButton = this.saveButton.bind(this);
  };
  nextButton(){
    console.log(this.props)
    this.props.nextPet(this.props.pet)
  }
  saveButton(){
    console.log(this.props)
    this.props.savePet(this.props.pet)
  }
  render(){
    return(
      <div className="row">
        <div className="icon-container">
          <img id="heart-icon"
          onClick={this.saveButton}
          className="hvr-pulse-grow"
          src="./style/icons/heart.svg"/>
        </div>
        <div className="icon-container">
          <img id="remove-icon"
          className="hvr-pulse-grow"
          onClick={this.nextButton}
          src="./style/icons/delete-outline.svg"/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Icons);
