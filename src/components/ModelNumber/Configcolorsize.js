import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Select,Cascader,Row,Col,Table,Modal,Spin } from 'antd';
import Plate from '../../commonComponents/plate/plate';
import TablePlate from '../../commonComponents/plate/tableplate';
import {styleConfigDeleteImage} from '../../services/attribute';
import styles from './Configcolorsize.less';
import Upload from 'rc-upload';
const FormItem = Form.Item;
const Option = Select.Option;

// class EditableCell extends React.Component {
//   state = {
//     value: this.props.value,
//     editable: false,
//   }
//   handleChange = (value) => {
//     console.log(value);
//     this.setState({ value });
//   }
//   check = () => {
//     this.setState({ editable: false });
//     if (this.props.onChange) {
//       this.props.onChange(this.state.value);
//     }
//   }
//   edit = () => {
//     this.setState({ editable: true });
//   }
//   render() {
//     const { value, editable } = this.state;
//     return (<Select
//         multiple
//         style={{ width: 300,height:70 }}
//         className={styles.select}
//         placeholder="点击输入框选择尺寸"
//         onChange={this.handleChange}
//         onSelect={this.check}
//
//       >
//      <Option  value={'010'}>010</Option>
//      <Option  value={'020'}>020</Option>
//
//      </Select>);
//   }
// }



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
    success=(ret)=>{
      let str=JSON.parse("["+this.props.name+"]")[0];
      // console.log('str',str);
      let temp={};
      temp.colorCode=str.colorCode;
      temp.reg=ret;
      // console.log(temp);
      //组装上传图片返回的列表
      if(retback.length>0){

        let flag=true;
        for(let i=0;i<retback.length;i++){
          if(retback[i].colorCode==str.colorCode){
            console.log('retback[i].colorCode:',retback[i].colorCode);
            console.log('str.colorCode:',str.colorCode);
            retback.splice(i,1,temp);
            console.log(retback);
            flag=false;
          }
        }
        if(flag){
          retback.push(temp);
        }

      }else{
          retback.push(temp);
      }
      console.log('retback',retback);
    }


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
//图片上传组件结束


const Configcolorsize=({
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue
    },
    chooseColor,
    dataSource,
    getadddata,
    config,
    onUpload,
    onDelete,
    sizeoption,
    listarry,
    backurl,
    configlist,
    saveSpin,

  })=> {

    function handleSubmit(e){
     e.preventDefault();
        validateFields((err, fieldsValue) => {
          if (!err) {


           getadddata(fieldsValue,retback);


          }
        });
    }

    // 使用map函数生成option选项
  const selectopt=sizeoption.map((item, key) => {

    return(
      <Option key={key} value={item.value}>{item.label}</Option>
      );
  });


    const columns = [{
      title: '颜色',
      dataIndex: 'colorCode',
      key: 'color',
    }, {
      title: '颜色名称',
      dataIndex: 'colorName',
      key: 'colorName',
    }, {
      title: '尺寸',
      dataIndex: 'size',
      key: 'size',
      render:(text, record, index) => (
        <FormItem>
                 {getFieldDecorator(`${index}`, {
                     initialValue:record.sizes
                   })(
                   <Select
                       multiple
                       style={{ width: 300,height:70 }}
                       className={styles.select}
                       placeholder="点击输入框选择尺寸"
                     >
                    {selectopt}

                    </Select>
                 )}
        </FormItem>

      ),
    }, {
      title: '图片',
      dataIndex: 'img',
      key: 'img',
      render:(text,record)=>(
        <div className={styles.picturewall} onClick={() => onUpload(record)}>
        <PicturesWall name={record.json} text={record.proimage}/>
        </div>
      ),
    }, {
      title: '操作',
      key: 'operation',
      render:(text,record)=>(
        <a onClick={() => onDelete(text,record)}>删除</a>
      ),
    }];
    const data=[{
      color:'101',
      colorName:'黑色'

    },
    {
      color:'102',
      colorName:'绿色'

    }];


  return (
    <Spin spinning={saveSpin} tip="保存中...">
    <Form
      inline
      onSubmit={handleSubmit}
    >
    <Plate title="款号信息">
     <div className={styles.inline}>款&nbsp;&nbsp;&nbsp;&nbsp;号：{config.code}</div>
     <div className={styles.margindis}>品&nbsp;&nbsp;&nbsp;&nbsp;名：{config.name}</div>
    </Plate>

    <TablePlate title="配置颜色尺寸图片">
     <div className={styles.add_plate}>
       <a className={styles.add_btn} onClick={() => chooseColor()}><Icon type="check-square-o" />&nbsp;选择颜色</a>
      </div>
        <Table size="small"
            className={styles.table}
            columns={columns}
            loading={false}
            dataSource={configlist}
            pagination={false}
            bordered
          />

    </TablePlate>
    <div className={styles.btn_wrap}>
      <FormItem>
        <Button type="primary" htmlType="submit" size="large">保存</Button>
        <Button type="ghost" size="large" className={styles.marginbtn} onClick={backurl}>取消</Button>
      </FormItem>
    </div>
    </Form>
    <div style={{height:30}}/>
    </Spin>
  );
}
Configcolorsize.propTypes = {
  form: PropTypes.object,
  passdata: PropTypes.func,
  backurl:PropTypes.func,
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,

};
export default Form.create()(Configcolorsize);
