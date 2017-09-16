import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Score from './Score';

const PostDetail = ({ post, increasePostScoreFunc, decreasePostScoreFunc }) => {
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
    </div>
  );
}

PostDetail.propTypes = {
  post: PropTypes.object.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired
}

export default PostDetail;