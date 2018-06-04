import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import EditZone from './EditZone'
import SkillEditZone from './SkillEditZone'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class EditUser extends React.Component {
  constructor() {
    super()
    this.state={
      user: {},
      no_accepted_disciple: [],
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

  handleChange(key_value) {
    this.setState({user: {...this.state.user, ...key_value}})
  }

  handleSave() {
    const url = Routes.user_path(gon.user_id)
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : 'PUT',
      data     : {user: {...this.state.user, skills_attributes: this.state.skills}},
      success: (data) => {
        this.setState(data)
        toastr.options = {
          "closeButton": false,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "500",
          "timeOut": "3000",
          "extendedTimeOut": "500",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
        toastr.success('保存しました。')
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  addSkill() {
    this.setState({skills: this.state.skills.concat({language: '', description: ''})}, () => {
      this.handleSave()
    })
  }

  handleSkillChange(key_value, id) {
    const skills = this.state.skills.map(skill => {
      if (skill.id == id) {
        return _.merge(skill, key_value)
      }
      return skill
    })
    this.setState({skills: skills})
  }

  handleDelete(id) {
    const skills = this.state.skills.map(skill => {
      if (skill.id == id) {
        return _.merge(skill, {_destroy: -1})
      }
      return skill
    })
    this.setState({skills: skills}, () => {
      this.handleSave()
    })
  }

  handleMaster(e) {
    this.setState({user: {...this.state.user, is_master: e.target.checked}}, () => {
      this.handleSave()
    })
  }

  ajax(url, params, type) {
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : type,
      data     : {follows: params},
      success: (data) => {
        toastr.success(data.messages)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  acceptDisciple(id) {
    const url = Routes.follows_update_path()
    const params = {to_user_id: this.state.user.id, from_user_id: id}
    const type = 'PUT'
    this.ajax(url, params, type)
  }

  render() {
    const skillNode = this.state.skills ? this.state.skills.map(skill => {
      return (
        <li key={skill.id}>
          <SkillEditZone
            {...this.state}
            {...skill}
            handleSave={this.handleSave.bind(this)}
            handleDelete={this.handleDelete.bind(this, skill.id)}
            onChange={this.handleSkillChange.bind(this)}
          />
        </li>
      )
    }) : null

    const noAcceptedDisciple = this.state.no_accepted_disciple.map(dis => {
      return (
        <li key={dis.id} className='clearFix'>
          <a href={Routes.user_path(dis.id)}>
            <img src={dis.image} />
            {dis.name}
          </a>
          <button className='p_button blue reverse' onClick={this.acceptDisciple.bind(this, dis.id)}>承認</button>
        </li>
      )
    })

    return (
      <Tabs selectedTabClassName='active' className='m_editUser'>
        <div className='innerWrapper'>
          <TabList className='tabList'>
            <Tab className='tab'>基本情報</Tab>
            <Tab className='tab'>弟子入り申請</Tab>
          </TabList>

          <TabPanel>
            <div className='m_showUser edit'>
              <h2>
                <img src={this.state.user.image} />
                <EditZone {...this.state} name='name' value={this.state.user.name} handleSave={this.handleSave.bind(this)} onChange={this.handleChange.bind(this)} type='text'/>
                <span className="displayMD">師匠 {this.state.user.master_count}人 </span>
                <span className="displayMD">弟子 {this.state.user.disciple_count}人</span>
              </h2>

              <ul className='displayTable'>
                <li className='clearFix'>
                  <div className='th'>
                    自己紹介
                  </div>
                  <div className='td'>
                    <EditZone {...this.state} name='description' value={this.state.user.description} handleSave={this.handleSave.bind(this)} onChange={this.handleChange.bind(this)} type='textarea'/>
                  </div>
                </li>

                <li className='clearFix'>
                  <div className='th'>
                    目標
                  </div>
                  <div className='td'>
                    <EditZone {...this.state} name='goal' value={this.state.user.goal} handleSave={this.handleSave.bind(this)} onChange={this.handleChange.bind(this)} type='textarea'/>
                  </div>
                </li>

                <li className='clearFix'>
                  <div className='th'>
                    スキル
                  </div>
                  <div className='td'>
                    <ul>
                      {skillNode}
                    </ul>
                    <button className='p_button blue' onClick={this.addSkill.bind(this)}>スキルを追加</button>
                  </div>
                </li>
                <label className='isMaster'>
                  <input name='is_master' type='checkbox' checked={this.state.user.is_master} onChange={this.handleMaster.bind(this)} />
                  弟子を受け入れる（ここにチェックを入れると、師匠一覧ページに表示されます。）
                </label>
              </ul>
            </div>
          </TabPanel>

          <TabPanel>
            <ul className='m_unacceptedUser'>
              {noAcceptedDisciple}
            </ul>
          </TabPanel>
        </div>
      </Tabs>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditUser />,
    document.getElementById("editUser"),
  )
})
