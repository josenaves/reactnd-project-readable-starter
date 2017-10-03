import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Comment from './Comment';
import Score from './Score';
import AppToolbar from './AppToolbar';
import { ASCENDING_ORDER } from '../actions';

const PostDetail = (props) => {
  const {
    post, comments,
    commentsOrder,
    changeOrderFunc,
    increasePostScoreFunc, decreasePostScoreFunc,
    increaseCommentScoreFunc, decreaseCommentScoreFunc,
    removeCommentFunc,
    openModalAddCommentFunc,
    openModalEditCommentFunc
  } = props;

  if (commentsOrder.order === ASCENDING_ORDER) {
    comments.sort( (a, b) => a[commentsOrder.field] - b[commentsOrder.field] )
  } else {
    comments.sort( (a, b) => b[commentsOrder.field] - a[commentsOrder.field] )
  }

  let title = <h4>No comments</h4>;
  let cmts;

  if (comments.length !== 0) {
    title = <h4>Comments</h4>;
    cmts = comments.map((c) =>
      <Comment
        key={c.id}
        id={c.id}
        timestamp={c.timestamp}
        body={c.body}
        author={c.author}
        score={c.voteScore}
        postId={post.id}
        increaseScoreFunc={increaseCommentScoreFunc}
        decreaseScoreFunc={decreaseCommentScoreFunc}
        removeCommentFunc={removeCommentFunc}
        openModalEditCommentFunc={openModalEditCommentFunc}
      />
    );
  }

  return (
    <div>

      <AppToolbar
        sortingTitle="Order"
        sort={commentsOrder}
        changeOrderFunc={changeOrderFunc}
      />

      <Card>
        <CardTitle title={post.title} subtitle={post.category} />
        <CardText>Date: {moment(post.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {post.author} :: </CardText>
        <CardText>{post.body}</CardText>
        
        <Score
          id={post.id}
          score={post.voteScore}
          increaseScoreFunc={increasePostScoreFunc}
          decreaseScoreFunc={decreasePostScoreFunc}
        />
      </Card>

      { title }

      <RaisedButton
        label="Write a comment"
        onClick={ () => openModalAddCommentFunc() }
        style={{ margin: 12 }} />

      { cmts }      
     
    </div>
  );
}

PostDetail.defaultProps = {
  comments: []
}
  
PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  commentsOrder: PropTypes.object.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired,
  increaseCommentScoreFunc: PropTypes.func.isRequired,
  decreaseCommentScoreFunc: PropTypes.func.isRequired,
  removeCommentFunc: PropTypes.func.isRequired,
  openModalAddCommentFunc: PropTypes.func.isRequired,
  openModalEditCommentFunc: PropTypes.func.isRequired
}

export default PostDetail;