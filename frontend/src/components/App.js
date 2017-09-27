import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
  addComment,
  editComment
} from '../actions';
import Root from './Root';
import Category from './Category';
import PostDetail from './PostDetail';
import './App.css';

class App extends Component {

  state = { 
    modalAddCommentOpen: false,
    modalEditCommentOpen: false,
    comment: '',
    author: ''
  }

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getPosts();
  }

  openModalAddComment = () => {
    this.setState(() => ({
      modalAddCommentOpen: true
    }))
  }

  closeModalAddComment = () => {
    this.setState(() => ({
      modalAddCommentOpen: false,
      comment: '',
      author: ''
    }))
  }

  openModalEditComment = (body) => {
    this.setState(() => ({
      modalEditCommentOpen: true,
      comment: body
    }))
  }

  closeModalEditComment = () => {
    this.setState(() => ({
      modalEditCommentOpen: false,
      comment: ''
    }))
  }  

  handleCommentChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleAddCommentSubmit = (event) => {
    event.preventDefault();
    const comment = { 
      id: uuid(),
      body: this.state.comment,
      author: this.state.author,
      timestamp: Date.now(),
      parentId: this.postId,
      voteScore: 0
    };
    this.props.addComment(comment);
    this.closeModalAddComment();
  }

  handleEditCommentSubmit = (event) => {
    event.preventDefault();
    const comment = {
      id: this.postId,
      body: this.state.comment,
      timestamp: Date.now()
    };
    this.props.editComment(comment);
    this.closeModalEditComment();
  }

  renderModalAddComment(post) {
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary={true}
        onClick={this.closeModalAddComment}
      />,
      <RaisedButton
        label="Add"
        primary={true}
        onClick={this.handleAddCommentSubmit}
      />
    ];

    return (
      <Dialog
        title="New comment"
        actions={actions}
        modal={true}
        open={this.state.modalAddCommentOpen}
      >
        <form onSubmit={this.handleAddCommentSubmit}>
          <label>Comment: <input type="text" name="comment" value={this.state.comment} onChange={this.handleCommentChange}/></label><br/>
          <label>Author: <input type="text" name="author" value={this.state.author} onChange={this.handleCommentChange}/></label><br/>
          
          <TextField
            name="comment"
            value={this.state.comment}
            onChange={this.handleCommentChange}
            hintText="Enter your comment"
            floatingLabelText="Comment"
            multiLine={true}
            rows={2}
          />
          
          <br/>

          <TextField
            name="author"
            value={this.state.author}
            onChange={this.handleCommentChange}
            hintText="Enter the author"
            floatingLabelText="Author"
          />
        </form>

      </Dialog>
    );
  }

  renderModalEditComment(post) {
    return (
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={this.state.modalEditCommentOpen}
        onRequestClose={this.closeModalEditComment}
        contentLabel='Modal'
      >
        <h4>Edit comment</h4>
        <form onSubmit={this.handleEditCommentSubmit}>
          <label>Comment: <input type="text" name="comment" value={this.state.comment} onChange={this.handleCommentChange}/></label><br/>
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

          <AppBar title="Readable" />

          <Route exact path="/:category/:postId" render= { ({ match }) => {
            const { postId } = match.params;
            const post = posts.find( (p) => p.id === postId )
            const postComments = comments[postId];

            if (!post) {
              return (<p>No post found for post id ${postId}</p>);  
            }

            this.postId = postId; // TODO must find a better way to do this - used this variable on handleAddCommentSubmit

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
                  openModalAddCommentFunc={this.openModalAddComment}
                  openModalEditCommentFunc={this.openModalEditComment}
                />
                { this.renderModalAddComment(post) }
                { this.renderModalEditComment(post) }
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
    },
    editComment(data) {
      dispatch(editComment(data))
    }
  }
}

export default withRouter(
  connect(mapStateToProps,mapDispatchToProps) (App)
);
