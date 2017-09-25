import React from 'react';
import PropTypes from 'prop-types';
import { CardText } from 'material-ui/Card';

const CommentsCount = ({ postId, comments }) => {
  let count = 0
  if (comments[postId]) {
    count = comments[postId].length
  }
  const commentText = count === 1 ? "comment" : "comments";
  return (
    <CardText>{count} {commentText}</CardText>
  );
}

CommentsCount.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.object.isRequired
}

export default CommentsCount;
