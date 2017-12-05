import styled from 'styled-components'
import {HeaderColour, ButtonColour, HeaderTextColour, ButtonTextColour} from '../StyleConstants'

export const Button = styled.button`
  background: ${ButtonColour};
  border: black, 5px;
  color: ${ButtonTextColour};
  padding: 5px 10px;
  text-align: center;
  font-size: 12px;
  border-radius: 10px;
`
export const Input = styled.input`
  padding: 5px;
  border: 2px solid #ccc;
  -webkit-border-radius: 5px;
  border-radius: 5px;
`

export const Title = styled.h1`
  background: ${HeaderColour};
  color: ${HeaderTextColour};
  width: 100%;
  display: inline-block;
  margin:0px;
  outline:none;
  vertical-align: top;
  padding-left: 10px;
  margin-top: 0px;
  border-radius: 10px;
`
export const FloatingDivWrapper = styled.div`
  width: 500px;
  overflow: hidden; /* add this to contain floated children */
`

export const LeftFloatingDiv = styled.div`
    width: 300px;
    float:left;
`

export const RightFloatingDiv = styled.div`
    float: left;
`
