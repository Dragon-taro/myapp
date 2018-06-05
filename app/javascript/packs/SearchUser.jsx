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
      cache    : false,
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
          return <span className='p_button gray' key={index} style={{marginRight: '5px'}}>{skill}</span>
      })
      return (
        <li key={user.id} className='m_userList'>
          <a href={Routes.user_path(user.id)}>
            <h3><img src={user.image} /> {user.name}</h3>
            <div className="displayMDBox">
              <span className="displayMD">師匠 {user.master_count}人</span>
              <span className="displayMD">弟子 {user.disciple_count}人</span>
            </div>
            <div className="content">
              {user.description}
            </div>
            <div className="skills">
              {skillNode}
            </div>
          </a>
        </li>
      )
    })
    return (
       <div className='innerWrapper'>
         <div className='m_showAndSearchZone'>
           <ul className='leftContent'>
             {masterNode}
           </ul>
           <div className='rightContent'>
             <SearchZone {...this.state} handleChange={this.handleChange.bind(this)}/>
             <button className='p_button blue reverse' onClick={this.handleSearch.bind(this)}>検索</button>
           </div>
         </div>
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
