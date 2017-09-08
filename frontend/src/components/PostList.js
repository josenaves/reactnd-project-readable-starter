import React from 'react';
import moment from 'moment';

const PostList = ({ posts }) => {
  return (
    <div>
      { posts.map((p) =>
      <div key={p.id}>
        <p><b>{p.title}</b></p>
        <p>Score: {p.category}</p>
        <p>Auhtor: {p.author}</p>
        <p>Score: {p.voteScore}</p>
        <p>Date: {moment(p.timestamp).format("MMM-DD-YYYY hh:mma")}</p>
        <p>{p.body}</p>
      </div>
      )}
    </div>
  );
}

export default PostList;
