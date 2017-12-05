import * as React from 'react';
import {sendAllWorksheets} from '../apirequests';
import styled from 'styled-components';
import {Button, Input} from './StyledComponents'

export class SendAllWorksheets extends React.Component<any, {emailAddress: string}> {
  constructor(props: any) {
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
      <Div>
        <div>
          Explanation Here
        </div>
        <Input onClick={this.handleEmailAddressChange} />
        <Button onClick={this.sendWorksheets}>Send Worksheets</Button>
      </Div>
    )
  }
}

const Div = styled.div`
  margin-left: 17%;
`
