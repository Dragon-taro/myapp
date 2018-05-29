import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {If} from './If'


class EditOrShowUser extends React.Component {
  constructor() {
    super()
    this.state={
      user: {},
      isEditMode: false,
      value: '',
    }
  }

  componentDidMount() {
    const url = Routes.user_path(gon.user_id)
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

  editMode() {
    this.setState({isEditMode: true})
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  handleSave() {
    const url = Routes.user_path(gon.user_id)
    const params = {name: this.state.value}
    this.setState()
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : 'PUT',
      data     : {user: params},
      success: (data) => {
        this.setState({isEditMode: false, ...data})
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  render() {
    return (
      <div>
        <If condition={!this.state.isEditMode} >
          <div>
            <h2>{this.state.user.name}</h2>
            <If condition={this.state.is_current_user}>
              <button onClick={this.editMode.bind(this)}>編集</button>
            </If>
          </div>
        </If>
        <If condition={this.state.isEditMode} >
          <div>
            <h2><input type='text' value={this.state.value} onChange={this.handleChange.bind(this)} /></h2>
            <button onClick={this.handleSave.bind(this)}>保存</button>
          </div>
        </If>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditOrShowUser />,
    document.getElementById("editOrShowUser"),
  )
})
