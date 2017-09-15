import React from 'react';
import moment from 'moment';
import Score from './Score';
import { ASCENDING_ORDER } from '../actions';

const PostList = ({
  posts,
  increasePostScore,
  decreasePostScore,
  sort,
  filter
}) => {

  if (filter !== '') {
    posts = posts.filter((p) => p.category === filter)
  }

  if (sort.order === ASCENDING_ORDER) {
    posts.sort( (a, b) => a[sort.field] - b[sort.field] )
  } else {
    posts.sort( (a, b) => b[sort.field] - a[sort.field] )
  }
 
  return (
    <div>
      { posts.length === 0 &&
        <div><p>No posts for [{filter}] category</p></div> 
      }

      { posts && posts.map((p) =>
      <div key={p.id}>
        <h3><b>{p.title}</b></h3>
        <p>Date: {moment(p.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {p.author} :: Category [{p.category}]</p>
        <p>{p.body}</p>
        <Score
          id={p.id}
          score={p.voteScore}
          increaseFn={increasePostScore}
          decreaseFn={decreasePostScore}
        />
      </div>
      )}
    </div>
  );
}

export default PostList;
