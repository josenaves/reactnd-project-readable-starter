import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Comment from './Comment';
import Score from './Score';

const PostDetail = ({ post, increasePostScoreFunc, decreasePostScoreFunc, comments }) => {
  return (
    <div >
      <h3>{post.title}</h3>
      
      <p>Date: {moment(post.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {post.author} :: Category [{post.category}]</p>

      <p>{post.body}</p>

      <Score
        id={post.id}
        score={post.voteScore}
        increaseScoreFunc={increasePostScoreFunc}
        decreaseScoreFunc={decreasePostScoreFunc}
      />

      <h4>Comments</h4>
      
      { comments && comments.map(c => 
        <Comment id={c.id} timestamp={c.timestamp} body={c.body} author={c.author} score={c.voteScore} />
      )}

    </div>

  );
}

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired
}

export default PostDetail;