import React from 'react';
import PropTypes from 'prop-types';

const Score = ({ id, score, increaseScoreFunc, decreaseScoreFunc }) => {
  return (
    <div>
      <button type="button" onClick={ () => increaseScoreFunc(id) }>+</button> 
      <span style={{margin:5}}>Score: { score }</span>
      <button type="button" onClick={ () => decreaseScoreFunc(id) }>-</button>
    </div>
  );
}

Score.propTypes = {
  increaseScoreFunc: PropTypes.func.isRequired,
  decreaseScoreFunc: PropTypes.func.isRequired
}

export default Score;