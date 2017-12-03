import * as React from 'react';

export class EmailWorksheet extends React.Component<{apiCall: (emailAddress: string, numberOfQuestions: number) => (() => Promise<any>)},
{enteredEmailAddress: string, enteredNumberOfQuestions: number, emailSuccessfullySent: boolean | null}> {
  constructor(props: any) {
    super(props);
    this.state = {enteredEmailAddress: "", enteredNumberOfQuestions: 0, emailSuccessfullySent: null}
  }

  handleEmailAddressChange = (event: any) =>
    this.setState({enteredEmailAddress: event.target.value})

    handleNumberOfQuestionsChange = (event: any) =>
    this.setState({enteredNumberOfQuestions: Number(event.target.value)})

    handleSendEmail = (event: any) => {
    this.props.apiCall(this.state.enteredEmailAddress, this.state.enteredNumberOfQuestions)()
    .then(
      fulfilled => this.setState({emailSuccessfullySent: true}),
      failed => this.setState({emailSuccessfullySent: false}));
    }

  render () {
    return (
      <div>
        <div>
          <button onClick={this.handleSendEmail}>Email Worksheet</button>
        </div>
        <div>
          <input placeholder={"Email Address"} onClick={this.handleEmailAddressChange} />
          <input placeholder={"Number of Questions"} onClick={this.handleNumberOfQuestionsChange} />
        </div>
        <EmailSentValidator emailSent={this.state.emailSuccessfullySent}/>
      </div>
    )
  }
}

class EmailSentValidator extends React.Component<{emailSent: boolean | null}, any> {
  constructor(props: {emailSent: boolean | null}) {
    super(props)
  }

  render () {
  if (this.props.emailSent == null) {
    return (
      <div />
    );
  }
    else {
      return (
        <div>
          {this.props.emailSent ? 'Email sent!' : 'Error: Email not sent.'}
        </div>
      )
    }
  }
}
