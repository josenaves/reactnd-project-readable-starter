import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import moment from 'moment';
import Score from './Score';
import CommentsCount from './CommentsCount';
import { ASCENDING_ORDER } from '../actions';

const PostList = ({
  posts,
  comments,
  increasePostScoreFunc,
  decreasePostScoreFunc,
  sort,
  filter
}) => {

  let filteredPosts = [];
  if (filter !== '') {
    filteredPosts = posts.filter((p) => p.category === filter)
  } else {
    filteredPosts = posts;
  }

  if (sort.order === ASCENDING_ORDER) {
    filteredPosts.sort( (a, b) => a[sort.field] - b[sort.field] )
  } else {
    filteredPosts.sort( (a, b) => b[sort.field] - a[sort.field] )
  }

  return (
    <div>
      { filteredPosts.length === 0 &&
        <div><p>No posts for [{ filter }] category</p></div> 
      }

      { filteredPosts && filteredPosts.map((p) =>
      <div key={p.id}>
        <Link to={`/${p.category}/${p.id}`}>
          <h3><b>{p.title}</b></h3>
        </Link>
        <p>Date: {moment(p.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {p.author} :: Category [{p.category}]</p>
        <p>{p.body}</p>

        <Score
          id={p.id}
          score={p.voteScore}
          increaseScoreFunc={increasePostScoreFunc}
          decreaseScoreFunc={decreasePostScoreFunc}
        />
        
        <CommentsCount
          postId={p.id}
          comments={comments}
        />
      </div>
      )}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  comments: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired
}

export default PostList;
