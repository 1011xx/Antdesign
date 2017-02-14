import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Icon, message,Modal } from 'antd';
import Upload from 'rc-upload';

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

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }

    handleChange = (file) => {
      console.log('onStart', file, file.name);

      getBase64(file, imageUrl => this.setState({ imageUrl }));
    };
    success=(ret)=>{
      console.log('ret',ret);
    }
  // handleChange = (info) => {
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
  //   }
  // }

  render() {
    const imageUrl = this.state.imageUrl;
    const { previewVisible, previewImage, fileList } = this.state;
    const {name}=this.props;
    const uploadButton = (
      <div style={{width:120,height:120,border:'1px solid #e9e9e9'}}>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const imgshow=(
      <div>
        <img style={{width:120,height:120}} src={imageUrl}/>
      </div>
    );
    return (
      <div>
      {name}
      <Upload
        className="avatar-uploader"
        data={{jsonparam:name}}
        action="/fmss/styleController/styleConfigUploadImage"
        onSuccess={this.success}
        listType="picture-card"
        fileList={fileList}
        onPreview={this.handlePreview}
        onStart={this.handleChange}
      >
      {imageUrl ? imgshow : uploadButton}
     </Upload>

        </div>
    );
  }
}
export default PicturesWall;














// import React, { PropTypes } from 'react';
// import { Upload, Icon, Modal } from 'antd';
// import { routerRedux } from 'dva/router';
// import { connect } from 'dva';
//
// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     fileList: [{
//       uid: -1,
//       name: 'xxx.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     }],
//   };
//
//   handleCancel = () => this.setState({ previewVisible: false })
//
//   handlePreview = (file) => {
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true,
//     });
//   }
//
//   handleChange = ({ fileList }) => {
//     this.setState({ fileList });
//     // console.log('fileList:',fileList);
//   }
//  handRemove=()=>{
//
//  }
//
//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const { name } = this.props;
//     const uploadButton = (
//       <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix" >
//       {name}
//         <Upload
//           action="/fmss/styleController/styleConfigUploadImage"
//           data={{jsonparam:name}}
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//           onRemove={this.handRemove}
//         >
//           {fileList.length >= 1 ? null : uploadButton}
//         </Upload>
//         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }
//
// export default PicturesWall;






// var _a={
//   styleId:"FF0CAE08FE8D4D70B61BCDD6524C5B14",
//   styleCode:"Y0223911B0333",
//   styleName:"ROYAL RAYE2002年初夏3911背心纯棉",
//   configs:[{
//     colorCode:"456",
//     colorName:"亮蓝色",
//     sizes:"010,012,013",
//     image:{
//       imageOriginalName:"S61231-11513314.jpg",
//       imageName:"ed852558d8f04a86bd46ffc5d8894228.jpg",
//       imageDirectory:"/images/FF0CAE08FE8D4D70B61BCDD6524C5B14/456/ed852558d8f04a86bd46ffc5d8894228.jpg",
//       imageType:"jpg"
//     }
//   }]
//
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
