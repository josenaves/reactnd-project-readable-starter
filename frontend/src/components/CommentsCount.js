import React from 'react';
import PropTypes from 'prop-types';

const CommentsCount = ({ postId, comments }) => {
  let count = 0
  if (comments[postId]) {
    count = comments[postId].length
  }
  return (
    <div>
      <p>{count} comments</p>
    </div>
  );
}

CommentsCount.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.object.isRequired
}

export default CommentsCount;
