import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as uuid from 'uuid/v1';
import {
  getCategories,
  getPosts,
  addPost,
  removePost,
  editPost,
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
    idComment: '',
    comment: '',
    author: '',
    postId: '',
    modalAddPostOpen: false,
    postTitle: '',
    postBody: '',
    postAuthor: '',
    postCategory: '',
    modalEditPostOpen: false,
    postEditId: '',
    postEditTitle: '',
    postEditBody: ''
  }

  componentWillMount() {
    this.props.getAllCategories();
    this.props.getPosts();
  }

  openModalAddPost = () => {
    this.setState(() => ({
      modalAddPostOpen: true
    }))
  }

  closeModalAddPost = () => {
    this.setState(() => ({
      modalAddPostOpen: false,
      postTitle: '',
      postBody: '',
      postAuthor: '',
      postCategory: ''
    }))
  }

  openModalEditPost = (data) => {
    this.setState(() => ({
      modalEditPostOpen: true,
      postEditId: data.id,
      postEditTitle: data.title,
      postEditBody: data.body
    }))
  }

  closeModalEditPost = () => {
    this.setState(() => ({
      modalEditPostOpen: false,
      postEditId: '',
      postEditTitle: '',
      postEditBody: ''
    }))
  }

  openModalAddComment = (data) => {
    this.setState(() => ({
      modalAddCommentOpen: true,
      postId: data.postId
    }))
  }

  closeModalAddComment = () => {
    this.setState(() => ({
      modalAddCommentOpen: false,
      comment: '',
      author: ''
    }))
  }

  openModalEditComment = (data) => {
    this.setState(() => ({
      modalEditCommentOpen: true,
      idComment: data.id,
      comment: data.body,
      postId: data.postId
    }))
  }

  closeModalEditComment = () => {
    this.setState(() => ({
      modalEditCommentOpen: false,
      idComment: '',
      comment: '',
      postId: ''
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
      parentId: this.state.postId,
      voteScore: 0
    };
    this.props.addComment(comment);
    this.closeModalAddComment();
  }

  handleEditCommentSubmit = (event) => {
    event.preventDefault();
    const comment = {
      id: this.state.idComment,
      body: this.state.comment,
      postId: this.state.postId,
      timestamp: Date.now()
    };
    this.props.editComment(comment);
    this.closeModalEditComment();
  }

  handlePostChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleAddPostSubmit = (event) => {
    event.preventDefault();
    const post = { 
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.postTitle,
      body: this.state.postBody,
      author: this.state.postAuthor,
      category: this.state.postCategory
    };
    this.props.addPost(post);
    this.closeModalAddPost();
  }

  handleEditPostSubmit = (event) => {
    event.preventDefault();
    const post = { 
      id: this.state.postEditId,
      title: this.state.postEditTitle,
      body: this.state.postEditBody
    };
    this.props.editPost(post);
    this.closeModalEditPost();
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
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary={true}
        onClick={this.closeModalEditComment}
      />,
      <RaisedButton
        label="Save"
        primary={true}
        onClick={this.handleEditCommentSubmit}
      />
    ];

    return (
      <Dialog
        title="Edit comment"
        actions={actions}
        modal={true}
        open={this.state.modalEditCommentOpen}
      >
        <form onSubmit={this.handleEditCommentSubmit}>
          <TextField
            name="comment"
            value={this.state.comment}
            onChange={this.handleCommentChange}
            hintText="Enter your comment"
            floatingLabelText="Comment"
            multiLine={true}
            rows={2}
          />
        </form>
      </Dialog>      
    );
  }

  renderModalAddPost() {
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary={true}
        onClick={this.closeModalAddPost}
      />,
      <RaisedButton
        label="Add"
        primary={true}
        onClick={this.handleAddPostSubmit}
      />
    ];

    return (
      <Dialog
        title="New post"
        actions={actions}
        modal={true}
        open={this.state.modalAddPostOpen}
      >
        <form onSubmit={this.handleAddPostSubmit}>
          <TextField
            name="postTitle"
            value={this.state.postTitle}
            onChange={this.handlePostChange}
            hintText="Enter post title"
            floatingLabelText="Post title"
          />
          <br/>
          <TextField
            name="postAuthor"
            value={this.state.postAuthor}
            onChange={this.handlePostChange}
            hintText="Enter post author"
            floatingLabelText="Post author"
          />
          <br/>
          <TextField
            name="postCategory"
            value={this.state.postCategory}
            onChange={this.handlePostChange}
            hintText="Enter post category"
            floatingLabelText="Post category"
          />
          <br/>
          <TextField
            name="postBody"
            value={this.state.postBody}
            onChange={this.handlePostChange}
            hintText="Enter post body"
            floatingLabelText="Post body"
          />
        </form>
      </Dialog>
    );
  }

  renderModalEditPost() {
    const actions = [
      <RaisedButton
        label="Cancel"
        secondary={true}
        onClick={this.closeModalEditPost}
      />,
      <RaisedButton
        label="Save"
        primary={true}
        onClick={this.handleEditPostSubmit}
      />
    ];

    return (
      <Dialog
        title="Edit post"
        actions={actions}
        modal={true}
        open={this.state.modalEditPostOpen}
      >
        <form onSubmit={this.handleEditPostSubmit}>
          <TextField
            name="postEditTitle"
            value={this.state.postEditTitle}
            onChange={this.handlePostChange}
            hintText="Enter post title"
            floatingLabelText="Post title"
          />
          <br/>
          <TextField
            name="postEditBody"
            value={this.state.postEditBody}
            onChange={this.handlePostChange}
            hintText="Enter post body"
            floatingLabelText="Post body"
          />
        </form>
      </Dialog>
    );
  }

  renderAppBar() {
    const { history } = this.props;
    return (
      <AppBar
        title="Readable"
        onTitleTouchTap={ () => { history.push('/') } }
      />
    )
  }

  render() {
    const {
      posts, categories, comments, sort, filter,
      setCategoryFilter, changeSortOrder,
      increasePostScore, decreasePostScore,
      increaseCommentScore, decreaseCommentScore,
      commentsOrder, changeCommentsOrder,
      removeComment, removePost
    } = this.props;

    return (
      <Router>
        <div>

          { this.renderAppBar() }

          <Route exact path="/:category/:postId" render= { ({ match }) => {
            const { postId } = match.params;
            const post = posts.find( (p) => p.id === postId )
            const postComments = comments[postId];

            if (!post) {
              return (<p>No post found for post id ${postId}</p>);  
            }

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
            <div>
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
                openModalAddPostFunc={this.openModalAddPost}
                removePostFunc={removePost}
                openModalEditPostFunc={this.openModalEditPost}
              />
              { this.renderModalAddPost() }
              { this.renderModalEditPost() }
            </div>
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
      dispatch(getCategories());
    },
    getPosts(sortBy){
      dispatch(getPosts(sortBy));
    },
    addPost(data) {
      dispatch(addPost(data));
    },
    removePost(postId) {
      dispatch(removePost(postId));
    },
    editPost(data) {
      dispatch(editPost(data));
    },
    changeSortOrder(sort){
      dispatch(changeSortOrder(sort));
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
      dispatch(getCommentsByPost(postId));
    },
    increaseCommentScore(id){
      dispatch(increaseCommentScore(id));
    },
    decreaseCommentScore(id){
      dispatch(decreaseCommentScore(id));
    },
    changeCommentsOrder(order) {
      dispatch(changeCommentsOrder(order));
    },
    removeComment(id) {
      dispatch(removeComment(id));
    },
    addComment(data) {
      dispatch(addComment(data));
    },
    editComment(data) {
      dispatch(editComment(data));
    }
  }
}

export default withRouter(
  connect(mapStateToProps,mapDispatchToProps) (App)
);
