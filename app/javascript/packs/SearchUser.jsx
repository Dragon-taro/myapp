import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SearchZone from './SearchZone'
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

class SearchUser extends React.Component {
  constructor() {
    super()
    this.state={
      users: [],
      searchParams: getParams(),
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const url = location.href
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : 'GET',
      success: (data) => {
        this.setState(data)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  handleChange(key_value) {
    this.setState({searchParams: {...this.state.searchParams, ...key_value}})
  }

  handleSearch() {
    const url = Routes.masters_search_path(this.state.searchParams)
    history.pushState(null,null, url);
    this.loadData()
  }

  render() {
    const masterNode = this.state.users.map(user => {
      const skillNode = user.skill_list.map((skill, index) => {
          return <span key={index}>{skill}</span>
      })
      return (
        <li key={user.id}>
          <h2><img src={user.image} />{user.name}</h2>
          <ul>
            <li>師匠：{user.master_count}</li>
            <li>弟子：{user.disciple_count}</li>
          </ul>
          <p>{user.description}</p>
          <p>{skillNode}</p>
        </li>
      )
    })
    return (
       <div>
         <ul>
           {masterNode}
         </ul>
         <SearchZone {...this.state} handleChange={this.handleChange.bind(this)}/>
         <button onClick={this.handleSearch.bind(this)}>検索</button>
       </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SearchUser />,
    document.getElementById("SearchUser"),
  )
})
