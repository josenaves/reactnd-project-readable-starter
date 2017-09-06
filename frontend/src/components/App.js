import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories, getPosts, changeSortOrder } from '../actions'
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

  onSortOrderClicked(e) {
    if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {
      this.onSortOrderChanged(e);
    } else {
      console.log('prevent onclick on keypress');
    }
  }

  onSortOrderChanged(event){
    this.props.changeSortOrder({
      field: 'date',
      order: event.target.value
    });
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

          <div onClick={this.onSortOrderClicked.bind(this)}>
            <label>
              <input 
                type="radio"
                name="order"
                value="asc"
                onChange={this.onSortOrderChanged.bind(this)}
                checked={this.props.state.sort.order === 'asc'}/>
                Ascending
              </label>
          </div>
          
          <div onClick={this.onSortOrderClicked.bind(this)}>
            <label>
              <input
                type="radio"
                name="order"
                value="desc"
                onChange={this.onSortOrderChanged.bind(this)}
                checked={this.props.state.sort.order === 'desc'}/>
                Descending
              </label>
          </div>
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
    getAllCategories(){
      dispatch(getCategories())
    },
    getPosts(sortBy){
      dispatch(getPosts(sortBy))
    },
    changeSortOrder(sort){
      dispatch(changeSortOrder(sort))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
