import React from 'react';
import moment from 'moment';

const PostList = ({ posts }) => {
  return (
    <div>
      { posts.map((p) =>
      <div key={p.timestamp}>
        <h3><b>{p.title}</b></h3>
        <p>Date: {moment(p.timestamp).format("MMM-DD-YYYY hh:mma")} :: Author: {p.author} :: Category [{p.category}] :: Score: {p.voteScore}</p>
        <p>{p.body}</p>
      </div>
      )}
    </div>
  );
}

export default PostList;
