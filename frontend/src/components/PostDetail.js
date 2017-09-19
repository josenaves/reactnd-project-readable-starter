import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Comment from './Comment';
import Score from './Score';
import SortingHeader from './SortingHeader';
import { ASCENDING_ORDER } from '../actions';

const PostDetail = ({
  post, comments,
  commentsOrder,
  changeOrderFunc,
  increasePostScoreFunc, decreasePostScoreFunc,
  increaseCommentScoreFunc, decreaseCommentScoreFunc
}) => {

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
        increaseScoreFunc={increaseCommentScoreFunc}
        decreaseScoreFunc={decreaseCommentScoreFunc}
      />
    );
  }

  return (
    <div>
      <h3>{post.title}</h3>
      
      <p>Date: {moment(post.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {post.author} :: Category [{post.category}]</p>

      <p>{post.body}</p>

      <Score
        id={post.id}
        score={post.voteScore}
        increaseScoreFunc={increasePostScoreFunc}
        decreaseScoreFunc={decreasePostScoreFunc}
      />

      <SortingHeader
        title="Comments order"
        sort={commentsOrder}
        changeOrderFunc={changeOrderFunc}
      />

      { title }
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
  decreaseCommentScoreFunc: PropTypes.func.isRequired
}

export default PostDetail;