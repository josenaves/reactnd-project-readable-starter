import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getCategories,
  getPosts,
  changeSortOrder,
  increasePostScore,
  decreasePostScore,
  increaseCommentScore,
  decreaseCommentScore,
  setCategoryFilter,
  getCommentsByPost,
  changeCommentsOrder
} from '../actions'
import Root from './Root';
import Category from './Category';
import PostDetail from './PostDetail';
import './App.css'

class App extends Component {

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getPosts();
  }

  render() {
    const {
      posts, categories, comments, sort, filter,
      setCategoryFilter, changeSortOrder,
      increasePostScore, decreasePostScore,
      increaseCommentScore, decreaseCommentScore,
      commentsOrder, changeCommentsOrder
    } = this.props;

    return (
      <Router>
        <div>

          <Route exact path="/:category/:postId" render= { ({ match }) => {
            const { postId } = match.params;
            const post = posts.find( (p) => p.id === postId )
            const postComments = comments[postId];

            if (!post) {
              return (<p>No post found for post id ${postId}</p>);  
            }

            return (
              <PostDetail
                post={post}
                comments={postComments}
                commentsOrder={commentsOrder}
                increasePostScoreFunc={increasePostScore}
                decreasePostScoreFunc={decreasePostScore}
                increaseCommentScoreFunc={increaseCommentScore}
                decreaseCommentScoreFunc={decreaseCommentScore}
              />
            );
          }} />

          <Route exact path="/:category" render={ ({ match }) => (
            <Category
              sort={sort}
              filter={match.params.category}
              posts={posts}
              changeOrderFunc={changeSortOrder}
              increasePostScoreFunc={increasePostScore}
              decreasePostScoreFunc={decreasePostScore}
            />
          )} />

          <Route exact path="/" render={ () => (
            <Root
              sort={sort}
              changeOrderFunc={changeSortOrder}
              categories={categories}
              filterFunc={setCategoryFilter}
              posts={posts}
              comments={comments}
              filter={filter}
              increasePostScoreFunc={increasePostScore}
              decreasePostScoreFunc={decreasePostScore}
            />
          )} />

        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state }
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
    },
    increasePostScore(id){
      dispatch(increasePostScore(id));
    },
    decreasePostScore(id){
      dispatch(decreasePostScore(id));
    },
    setCategoryFilter(filter){
      dispatch(setCategoryFilter(filter));
    },
    getCommentsByPost(postId) {
      dispatch(getCommentsByPost(postId))
    },
    increaseCommentScore(id){
      dispatch(increaseCommentScore(id));
    },
    decreaseCommentScore(id){
      dispatch(decreaseCommentScore(id));
    },
    changeCommentsOrder(order) {
      dispatch(changeCommentsOrder(order))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
