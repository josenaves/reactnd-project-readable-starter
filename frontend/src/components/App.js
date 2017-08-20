import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, receiveCategories } from '../actions'
import CategoryList from './CategoryList';
import './App.css'

class App extends Component {

  componentWillMount() {
    console.log("componentWillMount...")
    this.props.getAllCategories();
  }

  render() {
    console.log("render...")
    const { categories } = this.props;
    return (
      <div className="App">
        <h2>Categories</h2>
        <CategoryList categories={categories} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps - state:", state);
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: (data) => dispatch(getCategories()),
    receiveAllCategories: (data) => dispatch(receiveCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
