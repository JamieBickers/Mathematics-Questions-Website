import * as React from 'react';

export class EmailWorksheet extends React.Component<{apiCall: (emailAddress: string, numberOfQuestions: number) => (() => Promise<any>)}, {enteredEmailAddress: string, enteredNumberOfQuestions: number}> {
  constructor(props: any) {
    super(props);
    this.state = {enteredEmailAddress: "", enteredNumberOfQuestions: 0}
  }

  handleEmailAddressChange = (event: any) =>
    this.setState({enteredEmailAddress: event.target.value})

    handleNumberOfQuestionsChange = (event: any) =>
    this.setState({enteredNumberOfQuestions: Number(event.target.value)})

  render () {
    return (
      <div>
        <div>
          <button onClick={this.props.apiCall(this.state.enteredEmailAddress, this.state.enteredNumberOfQuestions)}>Email Worksheet</button>
        </div>
        <div>
          <input placeholder={"Email Address"} onClick={this.handleEmailAddressChange} />
          <input placeholder={"Number of Questions"} onClick={this.handleNumberOfQuestionsChange} />
        </div>
      </div>
    )
  }
}
