import React, {Component} from 'react';

const LetterButton = (props) =>
    <button onClick={props.handleClick} value={props.label}>{props.label.toUpperCase()}</button>

export default LetterButton
