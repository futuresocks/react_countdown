import React, {Component} from 'react';
import './LetterTile.css';

const LetterTile = (props) =>
  <div className="letterTile">{props.letter.toUpperCase()}</div>

export default LetterTile
