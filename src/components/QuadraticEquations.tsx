import * as React from 'react';
import {getBasicQuadraticApi, sendBasicQuadraticWorksheetApi} from '../apirequests'

export class Quadratic extends React.Component<any, {equation: QuadraticEquation, firstEnteredAnswer: string | null, secondEnteredAnswer: string | null, isUserCorrect: boolean | null}> {
  constructor(props: any) {
    super(props);
    this.state = {equation: {coefficients: [1,2,3], roots: [4,5]}, firstEnteredAnswer: null, secondEnteredAnswer: null, isUserCorrect: null};
  }

  handleInputChange = (inputNumber: number) => (event: any) => {
    if (inputNumber === 1) {
    this.setState({firstEnteredAnswer: event.target.value})
    }
    else {
      this.setState({secondEnteredAnswer: event.target.value})
    }
  }

  checkAnswer = ():void => {
    if (this.state.firstEnteredAnswer === null || this.state.secondEnteredAnswer === null) {
      this.setState({isUserCorrect: false})
    }

    console.log(Math.round(this.state.equation.roots[0] * 100) / 100);
    console.log(Math.round(this.state.equation.roots[1] * 100) / 100);
    console.log(Number(this.state.firstEnteredAnswer));
    console.log(Number(this.state.secondEnteredAnswer));

    const firstCorrect = (Number(this.state.firstEnteredAnswer) - (Math.round(this.state.equation.roots[0] * 100) / 100)) < 0.001;
    const secondCorrect = (Number(this.state.secondEnteredAnswer) - (Math.round(this.state.equation.roots[1] * 100) / 100)) < 0.001;
    const bothCorrect = firstCorrect && secondCorrect;

    this.setState({isUserCorrect: bothCorrect});
  }

  render () {
    return (
      <div>
        <div>
          {parsePolynomial(this.state.equation.coefficients)}
        </div>
        <button onClick={() => {getBasicQuadraticApi().then(result => this.setState({equation: result}))}}>New Equation</button>
        <p>First: <input value={this.state.firstEnteredAnswer === null ? "" : this.state.firstEnteredAnswer} onChange={this.handleInputChange(1)}/></p>
        <p>Second: <input value={this.state.secondEnteredAnswer === null ? "" : this.state.secondEnteredAnswer} onChange={this.handleInputChange(2)}/></p>
        <p>Right Answer?: {displayResult(this.state.isUserCorrect)}</p>
        <button onClick={this.checkAnswer}>Check Answer</button>
        <button onClick={sendBasicQuadraticWorksheetApi}>Email Worksheet</button>
      </div>
    )
  }
}

export const parsePolynomial = (coefficients: number[]) => {
  return `${coefficients[0]}x^2+${coefficients[1]}x+${coefficients[2]}=0`;
}

interface QuadraticEquation {
  coefficients: number[],
  roots: number[]
}

const displayResult = (isUserCorrect: boolean | null) => {
  if (isUserCorrect === null) {
    return "";
  } else {
    return isUserCorrect ? "Correct" : "Wrong";
  }
}
