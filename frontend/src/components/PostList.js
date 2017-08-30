import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div>
      { posts.map((p) =>
      <p key={p.id}> {p.title} </p>
      )}
    </div>
  );
}

export default PostList;
