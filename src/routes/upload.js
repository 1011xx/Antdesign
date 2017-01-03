import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, message } from 'antd';
import styles from './upload.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Test extends React.Component {
  state = {};

  handleChange = (info) => {
    console.log(info.file.status);
    // if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    // }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className={styles.avatar_uploader}
        name="avatar"
        showUploadList={false}
        action="/upload.do"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} role="presentation" className={styles.avatar} /> :
            <Icon type="plus" className={styles.avatar_uploader_trigger} />
        }
      </Upload>
    );
  }
}


export default Test;