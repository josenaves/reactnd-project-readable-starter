import React from 'react';

const CategoryList = ({ categories }) => {
  console.log("categories:", categories)
  return (
    <ul>
      { categories.map((category, idx) =>
          <li key={idx}>{category.name}</li>
      )}
    </ul>
  );
}

export default CategoryList;
