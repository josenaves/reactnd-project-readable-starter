import React from 'react';

const CategoryList = ({ categories }) => {
  return (
    <select>
      <option value="all">All</option>
      { categories.map((category) =>
        <option value={category.name} key={category.name}>
          {category.name}
        </option>
      )}
    </select>
  );
}

export default CategoryList;
