import React, {Component} from 'react';
import './CountDown.css'
import LetterButton from '../components/LetterButton'
import TileHolder from '../components/TileHolder'
import ReactCountdownClock from 'react-countdown-clock'

class CountDown extends Component {
  constructor(props){
    super(props);
    this.state = {
      consonant: {'b':2,'c':2,'d':4,'f':2,'g':3,'h':2,'j':1,'k':1,'l':4,'m':2,'n':6,'p':2,'q':1,'r':6,'s':4,'t':6,'v':2,'w':2,'x':1,'y':2,'z':1},
      vowel: {'a': 9, 'e': 12, 'i': 9, 'o': 8, 'u':4 },
      selectedLetters: [],
      answers: []
    }
    this.letterSelect = this.letterSelect.bind(this)
    this.answerFetcher = this.answerFetcher.bind(this)
  }

  answerFetcher = () => {
    fetch(`http://localhost:3001/${this.state.selectedLetters.join("")}`)
    .then(response => response.json())
    .then(json => this.setState({answers: json.all}));
  }

  letterSelect = (event)=>{
    const letterClass = event.target.value;
    const selectedHash = this.state[letterClass]
    const keys = Object.keys(selectedHash);
    const randomIndex = Math.floor(Math.random() * keys.length)
    const randomLetter = keys[randomIndex];
    selectedHash[randomLetter] -= 1;
    const selectedLetters = this.state.selectedLetters.concat([randomLetter]);
    this.setState({selectedLetters, [letterClass]: selectedHash}, () => {
      if (this.state.selectedLetters.length === 9) this.answerFetcher()
    })
  }

  render(){
    return (
      <React.Fragment>
        <ReactCountdownClock seconds={30} color="#000" alpha={0.9} size={300} />
        <LetterButton className="letterButton" label="consonant" handleClick={this.letterSelect}/>
        <LetterButton className="letterButton" label="vowel" handleClick={this.letterSelect}/>
        <TileHolder className="tileHolder" data={this.state.selectedLetters}/>
      </React.Fragment>
    )
  }

}

export default CountDown
