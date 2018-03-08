import React from "react";
import ReactDom from "react-dom";
import Dropzone from "react-dropzone";

const STYLE = {
  border: '2px solid #cecece',
}

const ACTIVE_STYLE = {
  border: '2px solid #60c31d',
  transition: 'all .2s',
  cursor: 'pointer',
}

export default class ImgDnDzone extends React.Component {

  constructor(props){
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files){
    const file = files[0];
    const params = {
      file: file,
    };
    this.props.onDrop(params)
  }

  render(){
    return(
      <Dropzone
        onDrop={this.onDrop}
        style={STYLE}
        activeStyle={ACTIVE_STYLE}
        className={this.props.className}
      >
        <p>
          画像をドラッグ＆ドロップ <br />
          またはクリックして <br />
          アップロード
        </p>
        <p>
          ※１枚ずつのアップロード <br />
          のみ可能です
        </p>
      </Dropzone>
    );
  }

}

ImgDnDzone.defaultProps = {
  className: ''
}
