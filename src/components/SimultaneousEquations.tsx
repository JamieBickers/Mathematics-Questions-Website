import * as React from 'react';
import {getBasicSimultaneousApi, sendBasicSimultaneousEquationsWorksheetApi} from '../apirequests'
import {EmailWorksheet} from './EmailWorksheet'

export class Simultaneous extends React.Component<any, {equation: SimultaneousEquations, enteredXValue: string, enteredYValue: string,
  enteredInfiniteSolutions: boolean, enteredNoSolutions: boolean, isUserCorrect: boolean | null, emailAddress: string, numberOfQuestions: string}> {
  constructor(props: any) {
    super(props);
    this.state = {equation: {coefficients: [{xTerm: 1, yTerm: 2, constantTerm: 3}, {xTerm: 4, yTerm: 5, constantTerm: 6}],
    solution: {firstSolution: 7, secondSolution: 8, noSolution: false, infiniteSolutions: false}}, enteredXValue: "", enteredYValue: "",
    enteredInfiniteSolutions: false, enteredNoSolutions: false, isUserCorrect: null, emailAddress: "", numberOfQuestions: ""};
  }

  handleAnswerInputChange = (inputNumber: number) => (event: any) => {
    if (inputNumber === 1) {
    this.setState({enteredXValue: event.target.value})
    }
    else {
      this.setState({enteredYValue: event.target.value})
    }
  }

  handleCheckboxChange = (checkboxType: string) => (event: any) => {
    if (checkboxType === "no") {
      this.setState({enteredNoSolutions: !event.target.value})
    }
    else if (checkboxType === "infinite") {
      this.setState({enteredInfiniteSolutions: !event.target.value})
    }
  }

  checkAnswer = () => {
    const xCorrect = Math.abs(Number(this.state.enteredXValue) - (Math.round(this.state.equation.solution.firstSolution * 100) / 100)) < 0.001;
    const yCorrect = Math.abs(Number(this.state.enteredYValue) - (Math.round(this.state.equation.solution.secondSolution * 100) / 100)) < 0.001;
    const noSolutionCorrect = this.state.enteredNoSolutions;
    const infiniteSolutionsCorrect = this.state.enteredInfiniteSolutions;

    const correctAnswer = (xCorrect && yCorrect) || noSolutionCorrect || infiniteSolutionsCorrect;

    this.setState({isUserCorrect: correctAnswer});
  }

  render () {
    return (
      <div>
        <div>
          {parseLinearEquation(this.state.equation.coefficients[0])}
        </div>
        <div>
          {parseLinearEquation(this.state.equation.coefficients[1])}
        </div>
        <button onClick={() => {getBasicSimultaneousApi().then(result => this.setState({equation: result}))}}>New Equation</button>
        <p>First: <input onChange={this.handleAnswerInputChange(1)}/></p>
        <p>Second: <input onChange={this.handleAnswerInputChange(2)}/></p>
        <div>
          <p>Infinite Solutions? <input type='checkbox' onClick={this.handleCheckboxChange("infinite")} /></p>
          <p>No Solutions? <input type='checkbox' onClick={this.handleCheckboxChange("no")} /></p>
        </div>
        <p>Right Answer?: {displayResult(this.state.isUserCorrect)}</p>
        <button onClick={this.checkAnswer}>Check Answer</button>
        <EmailWorksheet apiCall={sendBasicSimultaneousEquationsWorksheetApi}/>
      </div>
    )
  }
}

export const parseLinearEquation = (coefficients: LinearEquation) =>
  `${coefficients.xTerm}x+${coefficients.yTerm}y+${coefficients.constantTerm}=0`;

interface SimultaneousEquations {
  coefficients: LinearEquation[],
  solution: Solution
}

interface LinearEquation {
  xTerm: number,
  yTerm: number,
  constantTerm: number
}

interface Solution {
  firstSolution: number,
  secondSolution: number,
  noSolution: boolean,
  infiniteSolutions: boolean
}

const displayResult = (isUserCorrect: boolean | null) => {
  if (isUserCorrect === null) {
    return "";
  } else {
    return isUserCorrect ? "Correct" : "Wrong";
  }
}
