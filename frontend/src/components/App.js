import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, receiveCategories, getPosts, receivePosts } from '../actions'
import CategoryList from './CategoryList';
import PostList from './PostList';
import './App.css'

class App extends Component {

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getPosts();
  }

  render() {
    const { categories, posts } = this.props.state;
    return (
      <div>

        <div>
          <h2>Sort by</h2>
          <select>
            <option value="date" default>Date</option>
            <option value="votes">Votes</option>
          </select>
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
    getAllCategories: (data) => dispatch(getCategories()),
    receiveAllCategories: (data) => dispatch(receiveCategories()),
    getPosts: (data) => dispatch(getPosts()),
    receiveAllPosts: (data) => dispatch(receivePosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
