import * as React from 'react';
import {getBasicQuadraticApi, sendBasicQuadraticWorksheetApi} from '../apirequests'
import {EmailWorksheet} from './EmailWorksheet'
import styled from 'styled-components'
import {Button, Input, FloatingDivWrapper, LeftFloatingDiv, RightFloatingDiv} from './StyledComponents'

export class Quadratic extends React.Component<any, {equation: QuadraticEquation, firstEnteredAnswer: string | null, secondEnteredAnswer: string | null,
  isUserCorrect: boolean | null, emailAddress: string, numberOfQuestions: string}> {
  constructor(props: any) {
    super(props);
    this.state = {equation: {coefficients: [], roots: []}, firstEnteredAnswer: null, secondEnteredAnswer: null,
    isUserCorrect: null, emailAddress: "", numberOfQuestions: ""};
    getBasicQuadraticApi().then(result => this.setState({equation: result}));
  }

  handleAnswerInputChange = (inputNumber: number) => (event: any) => {
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
      return
    }
    else if (this.state.equation == null) {
      this.setState({isUserCorrect: false})
      return
    }

    const firstCorrect = (Number(this.state.firstEnteredAnswer) - (Math.round(this.state.equation.roots[0] * 100) / 100)) < 0.001;
    const secondCorrect = (Number(this.state.secondEnteredAnswer) - (Math.round(this.state.equation.roots[1] * 100) / 100)) < 0.001;
    const bothCorrect = firstCorrect && secondCorrect;

    this.setState({isUserCorrect: bothCorrect});
  }

  render () {
    return (
      <Div>
        <div>
          <h4>Equation</h4>
          <FloatingDivWrapper>
            <LeftFloatingDiv>
              {this.state.equation == null ? 'Connection error' : parsePolynomial(this.state.equation.coefficients)}
            </LeftFloatingDiv>
            <RightFloatingDiv>
              <Button onClick={() => {getBasicQuadraticApi().then(result => this.setState({equation: result})),
              this.setState({isUserCorrect: null})}}>New Equation</Button>
            </RightFloatingDiv>
          </FloatingDivWrapper>
        </div>
        <h4>Answers</h4>
        <p>First: <Input onChange={this.handleAnswerInputChange(1)}/></p>
        <p>Second: <Input onChange={this.handleAnswerInputChange(2)}/></p>
        <p>Right Answer?: {this.state.equation == null ? 'Connection error' : displayResult(this.state.isUserCorrect)}</p>
        <Button onClick={this.checkAnswer}>Check Answer</Button>
        <EmailWorksheet apiCall={sendBasicQuadraticWorksheetApi} />
      </Div>
    )
  }
}

const Div = styled.div`
  margin-left: 17%;
`

const parsePolynomial = (coefficients: number[]) =>
  coefficients.length == 3 ?
  <p>{coefficients[0]}x<sup>2</sup>{coefficients[1] > 0 ? '+' : ''}{coefficients[1]}x{coefficients[2] > 0 ? '+' : ''}{coefficients[2]}=0</p>
  : 'Connection error';

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
