import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, getPosts } from '../actions'
import CategoryList from './CategoryList';
import PostList from './PostList';
import './App.css'

class App extends Component {

  componentWillMount() {
    console.log("state", this.state);
    console.log("props", this.props);
    this.props.getAllCategories();
    this.props.getPosts(this.props.state.sort);
  }

  render() {
    const { categories, posts } = this.props.state;
    return (
      <div>

        <div>
          <h2>Sort by</h2>
          <select>
            <option value="votes" selected>Votes</option>
            <option value="date" default>Date</option>
          </select>

          <input type="radio" name="order" value="asc"/>Ascending
          <input type="radio" name="order" value="desc" checked/> Descending
        </div>

        <div>
          <h2>Categories</h2>
          <CategoryList categories={categories} />
        </div>

        <div>
          <h2>Posts</h2>
          <div>
            <PostList posts={posts}/>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getCategories()),
    getPosts: (sortBy) => dispatch(getPosts(sortBy)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
