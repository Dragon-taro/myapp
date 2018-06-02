import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class ApplyButton extends React.Component {
  constructor() {
    super()
  }

  requestMaster() {
    const url = Routes.follows_path()
    const params = {to_user_id: gon.user_id, from_user_id: gon.current_user_id}
    $.ajax({
      url      : url,
      dataType : 'json',
      type     : 'POST',
      data     : {follows: params},
      success: (data) => {
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
        data.status == 200 ? toastr.success(data.messages) : toastr.info(data.messages)
      },
      error: (xhr, status, err) => {
        console.error(url, status, err.toString());
      },
    })
  }

  render() {
    return <button onClick={this.requestMaster.bind(this)}>弟子入り申請</button>
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ApplyButton />,
    document.getElementById("ApplyButton"),
  )
})
