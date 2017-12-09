import * as React from 'react';
import {getBasicSimultaneousApi, sendBasicSimultaneousEquationsWorksheetApi} from '../apirequests'
import {EmailWorksheet} from './EmailWorksheet'
import styled from 'styled-components'
import {Button, Input, FloatingDivWrapper, LeftFloatingDiv, RightFloatingDiv} from './StyledComponents'

export class Simultaneous extends React.Component<any, {equation: SimultaneousEquations | null, enteredXValue: string, enteredYValue: string,
  enteredSolutionType: string, isUserCorrect: boolean | null, emailAddress: string, numberOfQuestions: string}> {
  constructor(props: any) {
    super(props);
    this.state = {equation: null, enteredXValue: "", enteredYValue: "",
    enteredSolutionType: "unique", isUserCorrect: null, emailAddress: "", numberOfQuestions: ""};
    getBasicSimultaneousApi().then(result => this.setState({equation: result}));
  }

  handleAnswerInputChange = (inputNumber: number) => (event: any) => {
    if (inputNumber === 1) {
    this.setState({enteredXValue: event.target.value})
    }
    else {
      this.setState({enteredYValue: event.target.value})
    }
  }

  checkAnswer = () => {
    if (this.state.equation == null) {
      this.setState({isUserCorrect: false})
      return
    }
    const xCorrect = Math.abs(Number(this.state.enteredXValue) - (Math.round(this.state.equation.solution.firstSolution * 100) / 100)) < 0.001;
    const yCorrect = Math.abs(Number(this.state.enteredYValue) - (Math.round(this.state.equation.solution.secondSolution * 100) / 100)) < 0.001;
    const noSolutionCorrect = ((this.state.enteredSolutionType === 'no') && (this.state.equation.solution.noSolution));
    const infiniteSolutionsCorrect = ((this.state.enteredSolutionType === 'infinite') && (this.state.equation.solution.infiniteSolutions));

    const correctAnswer = (xCorrect && yCorrect) || noSolutionCorrect || infiniteSolutionsCorrect;

    this.setState({isUserCorrect: correctAnswer});
  }

  solutionTypeHandleChange = (event: any) =>
  this.setState({enteredSolutionType: event.target.value})

  render () {
    return (
      <Div>
        <h4>Equations</h4>
        <FloatingDivWrapper>
          <LeftFloatingDiv>
            <p>
              {this.state.equation == null ? 'Connection error' : parseLinearEquation(this.state.equation.coefficients[0])}
            </p>
            <p>
              {this.state.equation == null ? 'Connection error' : parseLinearEquation(this.state.equation.coefficients[1])}
            </p>
          </LeftFloatingDiv>
          <RightFloatingDiv>
            <CenteredDiv>
              <br />
              <Button onClick={() => {getBasicSimultaneousApi().then(result => this.setState({equation: result})),
            this.setState({enteredSolutionType: 'unique', isUserCorrect: null})}}>New Equation</Button>
            </CenteredDiv>
          </RightFloatingDiv>
        </FloatingDivWrapper>
        <h3>Answers</h3>
        <p>First:&nbsp;&nbsp;&nbsp;&nbsp; <Input onChange={this.handleAnswerInputChange(1)} disabled={this.state.enteredSolutionType == 'no'}/></p>
        <p>Second: <Input onChange={this.handleAnswerInputChange(2)} disabled={this.state.enteredSolutionType == 'no'}/></p>
        <div>
          <form>
            <p>
              <input type="radio" name='solutionType'
              value="unique"
              checked={this.state.enteredSolutionType == 'unique'}
              onChange={this.solutionTypeHandleChange}/>
              Unique Solution
            </p>
            <p>
              <input type="radio"
              name="solutionType"
              value="infinite"
              checked={this.state.enteredSolutionType == 'infinite'}
              onChange={this.solutionTypeHandleChange}/>
              Infinite Solutions
            </p>
            <p>
              <input type="radio"
              name="solutionType"
              value="no"
              checked={this.state.enteredSolutionType == 'no'}
              onChange={this.solutionTypeHandleChange}/>
              No Solutions
            </p>
          </form>

        </div>
        <p>Right Answer?: {this.state.equation == null ? 'Connection error' : displayResult(this.state.isUserCorrect)}</p>
        <Button onClick={this.checkAnswer}>Check Answer</Button>
        <EmailWorksheet apiCall={sendBasicSimultaneousEquationsWorksheetApi}/>
      </Div>
    )
  }
}

const Div = styled.div`
  margin-left: 17%;
`
const CenteredDiv = styled.div`
  height: 100px;
  align-items: center;
`

const parseLinearEquation = (coefficients: LinearEquation) =>
  `${coefficients.xTerm}x+${coefficients.yTerm}y=${coefficients.constantTerm * -1}`.replace('+-', '-');

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
