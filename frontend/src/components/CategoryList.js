import React from 'react';

const CategoryList = ({ categories }) => {
  console.log("categories:", categories)
  return (
    <select>
      <option value="all">All</option>
      { categories.map((category) =>
        <option value="category.name">{category.name}</option>
      )}
    </select>
  );
}

export default CategoryList;
