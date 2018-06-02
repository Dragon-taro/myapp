import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SearchZone from './SearchZone'
import {If} from './If'

class MessageForm extends React.Component {
  constructor() {
    super()
    this.state={
      content: ''
    }
  }

  handleChange(e) {
    this.setState({content: e.target.value})
  }

  handleSubmit() {
    this.props.handleSubmit({...this.state, follow_id: this.props.id})
  }

  render() {
    return (
      <div>
        <input type='text' value={this.state.content} onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>送信</button>
      </div>
    )
  }
}

export default MessageForm
