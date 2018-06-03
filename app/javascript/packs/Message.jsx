import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import moment from 'moment'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SearchZone from './SearchZone'
import MessageForm from './MessageForm'
import {If} from './If'

function getParams() {
  var arg = new Object;
  var pair = location.search.substring(1).split('&');
  for(var i = 0; pair[i]; i++) {
      var kv = pair[i].split('=');
      arg[kv[0]] = decodeURI(kv[1]);
  }
  return arg
}

class Message extends React.Component {
  constructor() {
    super()
    this.state={
      searchParams: getParams(),
      follows: [],
      tabIndex: 0,
    }
  }

  componentDidMount() {
    this.ajax('GET')
  }

  ajax(type, key_value=null) {
    const url = Routes.messages_path({opponent_user: gon.opponent_user})
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : type,
      data     : key_value,
      success: (data) => {
        this.setState({...data, tabIndex: 0})
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  handleSubmit(key_value) {
    this.ajax('POST', key_value)
  }

  render() {
    const userNode = this.state.follows.map(follow => {
      return (
        <Tab key={follow.follow.id} className='tab'>
          <div>{follow.opponent_user.name}</div>
        </Tab>
      )
    })

    const messageNode = this.state.follows.map(follow => {
      const messageNode = follow.messages.map(message => {
        const html = marked(message.content || '')
        const date = moment(message.created_at).format("MM/DD hh:mm")
        const className = message.user_id == this.state.current_user.id ? 'right' : 'left'
        return (
          <li key={message.id} className={`${className} message`}>
            <div className='content' dangerouslySetInnerHTML={{__html: html}}></div>
            <div className='date'>{date}</div>
          </li>
        )
      })
      return (
        <TabPanel key={follow.follow.id} className='tabPanel'>
          <ul className='clearFix messageWrapper'>{messageNode}</ul>
          <MessageForm handleSubmit={this.handleSubmit.bind(this)} {...follow.follow} />
        </TabPanel>
      )
    })

    return (
       <div className='m_message'>
         <Tabs
           selectedTabClassName='active'
           selectedTabPanelClassName='active'
           selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}
           className='tabWrapper'>
           <TabList className='tabList'>
             {userNode}
           </TabList>
           {messageNode}
         </Tabs>
       </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Message />,
    document.getElementById("Message"),
  )
})
