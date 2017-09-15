import React from 'react';

const Score = ({ id, score, increaseFn, decreaseFn }) => {
  return (
    <div>
      <button type="button" onClick={ () => increaseFn(id) }>+</button> 
      <span style={{margin:5}}>Score: { score }</span>
      <button type="button" onClick={ () => decreaseFn(id) }>-</button>
    </div>
  );
}

export default Score;