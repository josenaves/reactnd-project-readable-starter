import React from 'react';
import PropTypes from 'prop-types';
import Score from './Score';
import moment from 'moment';

// {
//   "id":"894tuq4ut84ut8v4t8wun89g",
//   "parentId":"8xf0y6ziyjabvozdd253nd",
//   "timestamp":1468166872634,
//   "body":"Hi there! I am a COMMENT.",
//   "author":"thingtwo",
//   "voteScore":6,
//   "deleted":false,
//   "parentDeleted":false
// }

const Comment = ({
  id, author, timestamp, body, score,
  increaseScoreFunc, decreaseScoreFunc,
  removeCommentFunc, editCommentFunc
}) => {

  return (
    <div key={id}>
      
      <p>
        <button onClick={ () => removeCommentFunc(id) }> x </button> &nbsp;
        <button onClick={ () => editCommentFunc(id) }> e </button> &nbsp;

        {author} commented on {moment(timestamp).format("MMM-DD-YYYY hh:mma")}
      </p>

      <p>{body}</p>
      
      <Score
        id={id}
        score={score}
        increaseScoreFunc={increaseScoreFunc}
        decreaseScoreFunc={decreaseScoreFunc}
      />
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  increaseScoreFunc: PropTypes.func.isRequired,
  decreaseScoreFunc: PropTypes.func.isRequired,
  removeCommentFunc: PropTypes.func.isRequired,
  editCommentFunc: PropTypes.func.isRequired,
}

export default Comment;