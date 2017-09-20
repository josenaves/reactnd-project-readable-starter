import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import * as uuid from 'uuid/v1';
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
  changeCommentsOrder,
  removeComment,
  addComment
} from '../actions';
import Root from './Root';
import Category from './Category';
import PostDetail from './PostDetail';
import './App.css';

class App extends Component {

  state = { 
    commentModalOpen: false,
    comment: '',
    author: ''
  }

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getPosts();
  }

  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true
    }))
  }

  closeCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: false,
      comment: '',
      author: ''
    }))
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const comment = { 
      id: uuid(),
      comment: this.state.comment,
      author: this.state.author,
      timestamp: Date.now(),
      parentId: this.postId,
      voteScore: 0
    };
    this.props.addComment(comment);
    this.closeCommentModal();
  }

  renderModalComment(post) {
    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.state.commentModalOpen}
        onRequestClose={this.closeCommentModal}
        contentLabel='Modal'
      >
        <h4>Add a comment</h4>
        <form onSubmit={this.handleSubmit}>
          <label>Comment: <input type="text" name="comment" value={this.state.comment} onChange={this.handleChange}/></label><br/>
          <label>Author: <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/></label><br/>
          <input type="submit" value="Submit" />
        </form>

      </Modal>      
    );
  }

  render() {
    const {
      posts, categories, comments, sort, filter,
      setCategoryFilter, changeSortOrder,
      increasePostScore, decreasePostScore,
      increaseCommentScore, decreaseCommentScore,
      commentsOrder, changeCommentsOrder,
      removeComment
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

            this.postId = postId; // TODO must find a better way to do this - used this variable on handleSubmit

            return (
              <div>
                <PostDetail
                  post={post}
                  comments={postComments}
                  commentsOrder={commentsOrder}
                  changeOrderFunc={changeCommentsOrder}
                  increasePostScoreFunc={increasePostScore}
                  decreasePostScoreFunc={decreasePostScore}
                  increaseCommentScoreFunc={increaseCommentScore}
                  decreaseCommentScoreFunc={decreaseCommentScore}
                  removeCommentFunc={removeComment}
                  openCommentModalFunc={this.openCommentModal}
                />
                { this.renderModalComment(post) }
              </div>                            
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
    },
    removeComment(id) {
      dispatch(removeComment(id))
    },
    addComment(data) {
      dispatch(addComment(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
