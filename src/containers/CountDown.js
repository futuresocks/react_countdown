import React, {Component} from 'react';
import './CountDown.css'
import LetterButton from '../components/LetterButton'
import TileHolder from '../components/TileHolder'
import ReactCountdownClock from 'react-countdown-clock'

class CountDown extends Component {
  constructor(props){
    super(props);
    this.state = {
      consonant: ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','v','w','x','y','z'],
      vowel: ['a', 'e', 'i', 'o', 'u'],
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
    const selectedArray = this.state[letterClass];
    const randomIndex = Math.floor(Math.random() * selectedArray.length)
    const randomLetter = selectedArray[randomIndex];
    const newSelectedLetters = this.state.selectedLetters.concat([randomLetter]);
    this.setState({selectedLetters: newSelectedLetters}, () => {
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
