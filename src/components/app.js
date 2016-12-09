import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMyPet, getRandomPet } from '../actions/index';
import Pet from "./pet.js"
import Navbar from "./navbar.js"
import Icons from "./icons.js"

function mapStateToProps(state){
  return {
    pet: state.pet
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchMyPet: fetchMyPet,
    getRandomPet: getRandomPet
  }, dispatch)
}


class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Pet/>
        <div className="icons-row">
          <Icons/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
