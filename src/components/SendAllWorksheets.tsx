import * as React from 'react';
import {sendAllWorksheets} from '../apirequests';

export class SendAllWorksheets extends React.Component<void, {emailAddress: string}> {
  constructor(props: void) {
    super(props);
    this.state = {emailAddress: ""}
  }

  handleEmailAddressChange = (event: any) =>
    this.setState({emailAddress: event.target.value})

  sendWorksheets = (event: any) => {
    console.log('email: ', this.state.emailAddress)
    sendAllWorksheets(this.state.emailAddress)
  }

  render() {
    return (
      <div>
        <input onClick={this.handleEmailAddressChange} />
        <button onClick={this.sendWorksheets}>Send Worksheets</button>
      </div>
    )
  }
}
