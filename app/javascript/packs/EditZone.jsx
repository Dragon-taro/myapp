import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {If} from './If'


class EditZone extends React.Component {
  constructor() {
    super()
    this.state={
      isEditMode: false,
    }
  }

  editMode() {
    this.setState({isEditMode: true})
  }

  handleChange(e) {
    const key_value = {[this.props.name]: e.target.value}
    this.props.onChange(key_value)
  }

  handleSave() {
    this.setState({isEditMode: false})
    this.props.handleSave()
  }

  render() {
    return (
      <div>
        <If condition={!this.state.isEditMode} >
          <div>
            <span>{this.props.value}</span>
            <If condition={this.props.is_current_user}>
              <button onClick={this.editMode.bind(this)}>編集</button>
            </If>
          </div>
        </If>
        <If condition={this.state.isEditMode}>
          <div>
            <If condition={this.props.type == 'textarea'}>
              <textarea value={this.props.value} onChange={this.handleChange.bind(this)}></textarea>
            </If>
            <If condition={this.props.type != 'textarea'}>
              <input type='text' value={this.props.value} onChange={this.handleChange.bind(this)} />
            </If>
            <button onClick={this.handleSave.bind(this)}>保存</button>
          </div>
        </If>
      </div>
    )
  }
}

export default EditZone
EditZone.defaultProps = {value: ''}
