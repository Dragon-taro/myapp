import React from "react";
import ReactDom from "react-dom";
import Dropzone from "react-dropzone";

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
        className={this.props.className}
        style={{}}
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
