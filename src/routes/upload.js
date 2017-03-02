import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table,Modal } from 'antd';

import {styleConfigDeleteImage} from '../services/attribute';

import Upload from 'rc-upload';




class Test extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    imageUrl:'',
    imagesrc:this.props.text,
    imageName:''
  };
  // handleCancel = () => this.setState({ previewVisible: false })
  //
  //   handlePreview = (file) => {
  //     this.setState({
  //       previewImage: file.url || file.thumbUrl,
  //       previewVisible: true,
  //
  //     });
  //   }
  //
  //   handleChange = (file) => {
  //     // console.log('onStart', file, file.name);
  //
  //     getBase64(file, imageUrl => this.setState({ imagesrc:imageUrl }));
  //   };
  //   onSuccess=(ret)=>{
  //     console.log('onSuccess');
  //     console.info(ret);
  //
  //   }
  //
  //
  //     look=()=>{
  //       console.log('onLook');
  //       this.setState({ previewVisible: true });
  //     }
  //     deleteImage=()=>{
  //       console.log('deleteImaged');
  //         this.setState({ imagesrc: '' })
  //
  //     }
     success=(ret)=>{
       console.log(ret);

     }

  render() {
    const imageUrl = this.state.imageUrl;
    const { previewVisible, imagesrc } = this.state;
    const {name,text}=this.props;
    const props = {
    action: '/fmss/styleController/styleConfigUploadImage',
    data:{jsonparam:'{"styleId":"E7BA5F545D984369925F6ADA6EBB2D7A","colorCode":"000"}'},
    multiple: true,
    onStart(file) {
      console.log('onStart', file, file.name);
    },
    onSuccess(ret) {
      console.log('onSuccess', ret);
    },
    onError(err) {
      console.log('onError', err);
    },
    beforeUpload(file, fileList) {
      console.log(file, fileList);
      return new Promise((resolve, reject) => {
        console.log('start check');
        setTimeout(() => {
          console.log('check finshed');
          resolve(file);
        }, 3000);
      });
    },
    };


    const imgshow=(
      <div>
      <div className="imageborder">
      <img className="imgstyle" src={imagesrc} alt="suit"/>
      <span className="upload-actions">
      <span className="btns">
      <Icon type="eye-o" className="anticons" onClick={this.look}/>
      <Icon type="delete" className="anticons" onClick={this.deleteImage}/>
      </span>
      </span>
      </div>
      </div>
    );

    return (
<div>
{imagesrc ? imgshow :
      <Upload
      action= '/fmss/styleController/styleConfigUploadImage'
      data={{jsonparam:'{"styleId":"E7BA5F545D984369925F6ADA6EBB2D7A","colorCode":"000"}'}}
      onSuccess={this.success}
       >
      <div className="uploadstyle">
        <Icon type="plus" className="upload-icon"/>
        <div className="ant-upload-text">上传图片</div>
      </div>
     </Upload>
   }
     <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="suit" style={{ width: '100%' }} src={imagesrc} />
     </Modal>
</div>
    );
  }
}

export default Test;
