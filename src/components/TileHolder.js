import React, {Component} from 'react';
import LetterTile from './LetterTile';
import './TileHolder.css'

const TileHolder = (props) => {

const letterNodes = props.data.map((letter,index) => {return(<LetterTile className="tile" key={index} letter={letter}/>)})

return (
  <span>
    {letterNodes}
  </span>
)

}

export default TileHolder
