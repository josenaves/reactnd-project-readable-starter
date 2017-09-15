import React from 'react';
import PropTypes from 'prop-types';
import SortingHeader from './SortingHeader';
import PostList from './PostList';

const Category = (props) => {
  const { sort, posts, filter, changeOrderFunc, increasePostScoreFunc, decreasePostScoreFunc } = props;
  return (
    <div>
      
      <SortingHeader
        sort={sort}
        changeOrderFunc={changeOrderFunc}
      />

      <h2>Posts by category</h2>

      <PostList
        posts={posts}
        filter={filter}
        sort={sort}
        increasePostScoreFunc={increasePostScoreFunc}
        decreasePostScoreFunc={decreasePostScoreFunc}
      />

    </div>
  );
};

Category.propTypes = {
  sort: PropTypes.object.isRequired,
  filter: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired
}

export default Category;
