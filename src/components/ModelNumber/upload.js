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














import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table,Modal } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import {styleConfigDeleteImage} from '../../services/attribute';
import styles from './Configcolorsize.less';
import Upload from 'rc-upload';
const FormItem = Form.Item;
const Option = Select.Option;

//以下是图片上传组件
var retback=[];
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
    imageUrl:'',
    imagesrc:this.props.text,
    imageName:''
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

      getBase64(file, imageUrl => this.setState({ imagesrc:imageUrl }));
    };
    // success=({ret})=>{
    //   console.info('1111111111111111111111111111111111111111:',ret);
    //   // let str=JSON.parse("["+this.props.name+"]")[0];
    //   // // console.log('str',str);
    //   // let temp={};
    //   // temp.colorCode=str.colorCode;
    //   // temp.reg=ret;
    //   // // console.log(temp);
    //   // //组装上传图片返回的列表
    //   // if(retback.length>0){
    //   //
    //   //   let flag=true;
    //   //   for(let i=0;i<retback.length;i++){
    //   //     if(retback[i].colorCode==str.colorCode){
    //   //       console.log('retback[i].colorCode:',retback[i].colorCode);
    //   //       console.log('str.colorCode:',str.colorCode);
    //   //       retback.splice(i,1,temp);
    //   //       console.log(retback);
    //   //       flag=false;
    //   //     }
    //   //   }
    //   //   if(flag){
    //   //     retback.push(temp);
    //   //   }
    //   //
    //   // }else{
    //   //     retback.push(temp);
    //   // }
    //   // console.log('retback',retback);
    // }


      look=()=>{
        this.setState({ previewVisible: true });
      }
      deleteImage=()=>{
          this.setState({ imagesrc: '' })
          let str=JSON.parse("["+this.props.name+"]")[0];
          let temdelobj={};
          temdelobj.styleId=str.styleId;
          temdelobj.colorCode=str.colorCode;
          if(str.imageName){
            temdelobj.imageName=str.imageName;
            // console.info(str.imageName);
          }else{
            for(let i=0;i<retback.length;i++){
              if(retback[i].colorCode==str.colorCode){
                // console.log('retback[i].imageName:',retback[i].reg[0].imageName);
                // console.log('str.imageName:',str.imageName);
                // console.log(retback);
                temdelobj.imageName=retback[i].reg[0].imageName;
              }
            }
          }
          // console.log('temdelobj:',temdelobj);
          let result=styleConfigDeleteImage({jsonparam:JSON.stringify(temdelobj)});
          console.log(result);
      }

  render() {
    const imageUrl = this.state.imageUrl;
    const { previewVisible, imagesrc } = this.state;
    const {name,text}=this.props;


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
        <div>{name}</div>
        {imagesrc ? imgshow :
              <Upload
                data={{jsonparam:name}}
                action="/fmss/styleController/styleConfigUploadImage"
                onSuccess={this.success}
                onStart={this.handleChange}
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
