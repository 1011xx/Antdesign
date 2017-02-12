import React, { PropTypes } from 'react';
import { Upload, Icon, Modal } from 'antd';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    // console.log('fileList:',fileList);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/fmss/styleController/styleConfigUploadImage"
          data={{jsonparam:'{"styleId":"669A0B2BFEAA4E838D2AE3B186D3A7C4","colorCode":"000"}'}}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall;






// var _a={
//   styleId:"669A0B2BFEAA4E838D2AE3B186D3A7C4",
//   styleCode:"M0420367B0122",
//   styleName:"马克张2004年初夏0367背心山羊毛",
//   configs:[{
//     colorCode:"000",
//     colorName:"浅白色",
//     sizes:"010,012,013",
//     image:{
//       imageOriginalName:"320g.png",
//       imageName:"9838325c4bc64a529fdd8825fa99f1c7.png",  imageDirectory:"/images/669A0B2BFEAA4E838D2AE3B186D3A7C4/000/9838325c4bc64a529fdd8825fa99f1c7.png",
//       imageType:"png"
//     }
//   }],
// };
// console.log(JSON.stringify(_a));
//
//
//
// deleteImage:[{
//   colorCode:""
//   imageName:""
//   StyleCode:""
// }]
