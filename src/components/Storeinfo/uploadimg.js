import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon, message,Modal } from 'antd';
import styles from './uploadimg.less';
const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className={styles.ant_upload_text}>上传图片</div>
      </div>
    );

const PicturesWall=({
  previewVisible,
  previewImage,
  fileList,
  fileListlength,
  oFile,
  handleCancel,
  handlePreview,
  handleChange,
  customRequest,
  onRemove

})=>{

     return (
      <div className={styles.clearfix}>
        <Upload
          multiple={false}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={onRemove}
          customRequest={customRequest}
        >
          {fileListlength >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
}

PicturesWall.propTypes = {


  previewVisible: PropTypes.any,
  previewImage: PropTypes.any,
  fileList: PropTypes.array,
  oFile: PropTypes.array,
  handleCancel: PropTypes.func,
  handlePreview: PropTypes.func,
  handleChange: PropTypes.func,
  customRequest: PropTypes.func,
  onRemove: PropTypes.func,
  

};
export default PicturesWall;

// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: 'true',
//     fileList: [{
//       uid: -1,
//       name: 'xxx.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     }],
//   };

//   handleCancel = () => this.setState({ previewVisible: false })

//   handlePreview = (file) => {
//     // console.log('file.url:');
//     // console.log(file);
//     this.setState({
//       previewImage: file.url || file.thumbUrl,
//       previewVisible: true,
//     });
//   }

//   handleChange = ({ fileList,file,info }) => {
//     file.status = 'done';
//     // info.file.status='done';
//     console.log(info);
//     this.setState({ fileList });
//     // console.log(fileList);
//      // oFile.push(file.file);
//      // console.log(oFile);
//     // console.log(file.thumbUrl);
//     // console.log(file.url);
// }

// customRequest=(file)=>{
//   // console.log(file.file);
// // console.log(123);

//   oFile.push(file.file);
//   console.log(oFile);
//   // var oMyForm = new FormData();
//   // oMyForm.append("username", "Groucho");
//   // oMyForm.append("accountnum", 123456); // 数字123456被立即转换成字符串"123456"
   
//   // // fileInputElement中已经包含了用户所选择的文件

//   // for (var i=0;i<oFile.length;i++) {
//   //   console.log(oFile[i]);
//   //   oMyForm.append("userfile", oFile[i]);
//   // }
//   // //var oFile = document.getElementById("uploadImage").files[0]
//   // //oMyForm.append("userfile", oFile);
   
//   // var oFileBody = '<a id="a"><b id="b">hey!</b></a>'; // Blob对象包含的文件内容
//   // var oBlob = new Blob([oFileBody], { type: "text/xml"});
//   // oMyForm.append("webmasterfile", oBlob);
//   // var oReq = new XMLHttpRequest();
//   // oReq.open("POST", "/upload.do");
//   // oReq.send(oMyForm);

// }
// onRemove=(file)=>{
//   console.log(file);
// }


//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const uploadButton = (
//       <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className={styles.clearfix}>
//         <Upload
//           data={{'jsonparam':'{"fullName":"秦玉国","shortName":"DCP414","typeCode":"1","establishDate":"2016-09-20","provinceCode":"130000","provinceName":"河北省","cityCode":"130100","cityName":"石家庄市","saleAreaCode":"101","saleAreaName":"华北地区","address":"河北省青玉国市雨果县","telephoneNumber":"13161774044","contracts":"请稍等","mobileNumber":"13161773404"}'}}
//           multiple={true}
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//           onRemove={this.onRemove}
//           customRequest={this.customRequest}
//         >
//           {fileList.length >= 5 ? null : uploadButton}
//         </Upload>
//         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }

// export default PicturesWall;
