import React from 'react';
import PropTypes from 'prop-types';
import SortingHeader from './SortingHeader';
import CategoryHeader from './CategoryHeader';
import PostList from './PostList';

const Root = (props) => {
  const { sort, posts, categories, filter, changeOrderFunc, filterFunc, increasePostScoreFunc, decreasePostScoreFunc } = props;
  return (
    <div>
      <SortingHeader
        sort={sort}
        changeOrderFunc={changeOrderFunc}
      />

      <CategoryHeader
        categories={categories}
        filterFunc={filterFunc} 
      />

      <h2>Posts</h2>
      <div>
        <PostList
          posts={posts}
          sort={sort}
          filter={filter}
          increasePostScoreFunc={increasePostScoreFunc}
          decreasePostScoreFunc={decreasePostScoreFunc}
        />
      </div>
    </div>
  );
};

Root.propTypes = {
  sort: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  filterFunc: PropTypes.func.isRequired,
  increasePostScoreFunc: PropTypes.func.isRequired,
  decreasePostScoreFunc: PropTypes.func.isRequired
}

export default Root;
