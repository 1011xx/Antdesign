import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, message,Modal } from 'antd';
import styles from './uploadimg.less';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: 'true',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('file.url:'+file.url);
    console.log('file.thumbUrl'+file.thumbUrl);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })



  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={styles.clearfix}>
        <Upload
          action="http://192.168.10.146:5001/fmss/shopController/newShop"
          data={{'jsonparam':'{"fullName":"秦玉国","shortName":"DCP414","typeCode":"1","establishDate":"2016-09-20","provinceCode":"130000","provinceName":"河北省","cityCode":"130100","cityName":"石家庄市","saleAreaCode":"101","saleAreaName":"华北地区","address":"河北省青玉国市雨果县","telephoneNumber":"13161774044","contracts":"请稍等","mobileNumber":"13161773404"}'}}
          multiple={true}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
