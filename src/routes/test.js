import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from '../components/FileUpload';
const str='{"fullName":"秦玉国","shortName":"DCP414","typeCode":"1","establishDate":"2016-09-20","provinceCode":"130000","provinceName":"河北省","cityCode":"130100","cityName":"石家庄市","saleAreaCode":"101","saleAreaName":"华北地区","address":"河北省青玉国市雨果县","telephoneNumber":"13161774044","contracts":"请稍等","mobileNumber":"13161773404"}';
 function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
 const options={
        baseUrl:'/upload.do',
        multiple: true,
        textBeforeFiles:true,
        paramAddToField : {jsonparam: str},
        param:{
            fid:0
        },
        chooseFile : function(files){
       console.log(files);
    }
    }


const Test = React.createClass({
 
  render() {
    return (
      <FileUpload options={options}>
            <button ref="chooseBtn">choose</button>
            <button ref="uploadBtn">upload</button>
        </FileUpload>
    );
  },
});

export default Test;