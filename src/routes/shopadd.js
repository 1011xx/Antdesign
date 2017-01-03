import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Wrap from '../components/wrap/wrap';
import PicturesWall from '../components/Storeinfo/uploadimg';
import AddShopinfo from '../components/Storeinfo/addshopinfo';
//将json对象中为undefined的值转化为空字符串
function setProp(obj) {
    for (var p in obj) {
        switch (typeof (obj[p])) {
            case 'object':
                setProp(obj[p]);
                break;
            case 'undefined':
                obj[p] = '';
                break;
        }
    }
    return obj;
}

function Shopadd({dispatch,shopinfo}){
const {   previewVisible,
		  previewImage,
		  fileList,
		  fileListlength,
		  oFile
	}=shopinfo;

	const addInfoProps={
		 oFile,
		getadddata(data){
		console.log(data);
		 let upinfo=JSON.stringify(setProp(data)); 
		 console.log(upinfo);
		 console.log( oFile);
		 //创建form对象
		  var oMyForm = new FormData();
		  oMyForm.append("jsonparam", upinfo);
		   //遍历oFile中的img对象，添加到form对象中
		  for (var i=0;i<oFile.length;i++) {
		    // console.log(oFile[i]);
		    oMyForm.append("userfile", oFile[i]);
		  }
		  //将form表单发送出去
		  var oReq = new XMLHttpRequest();
		  oReq.open("POST", "/upload.do");
		  oReq.send(oMyForm);
		}
        
	}



	const uploadProps={
		  previewVisible,
		  previewImage,
		  fileList,
		  fileListlength,
		  oFile,
		handleCancel(){
			dispatch({
              type: 'shopinfo/HidePreview'
            });
		},

		handlePreview (file) {
		   
		    dispatch({
              type: 'shopinfo/PreviewImage',
              payload:{
              	 previewImage: file.url || file.thumbUrl
              }
            });

		     
		     dispatch({
              type: 'shopinfo/ShowPreview'
            });
		  },

		 handleChange ( {fileList,file} ) {
		 	let filelength=fileList.length;
		 	console.log(filelength);
		    file.status = 'done';
		     dispatch({
              type: 'shopinfo/FileListlength',
              payload:{
              	fileListlength:filelength
              }
            });
		      dispatch({
              type: 'shopinfo/FileList',
              payload:{
              	fileList:fileList
              }
            });

		    // info.file.status='done';
		    // console.log(info);
		    // this.setState({ fileList });
		    // console.log(fileList);
		     // oFile.push(file.file);
		     // console.log(oFile);
		    // console.log(file.thumbUrl);
		    // console.log(file.url);
		},

		customRequest(file){
		  // console.log(file.file);
		// console.log(123);

		  oFile.push(file.file);
		  console.log(oFile);
		  // var oMyForm = new FormData();
		  // oMyForm.append("username", "Groucho");
		  // oMyForm.append("accountnum", 123456); // 数字123456被立即转换成字符串"123456"
		   
		  // // fileInputElement中已经包含了用户所选择的文件

		  // for (var i=0;i<oFile.length;i++) {
		  //   console.log(oFile[i]);
		  //   oMyForm.append("userfile", oFile[i]);
		  // }
		  // //var oFile = document.getElementById("uploadImage").files[0]
		  // //oMyForm.append("userfile", oFile);
		   
		  // var oFileBody = '<a id="a"><b id="b">hey!</b></a>'; // Blob对象包含的文件内容
		  // var oBlob = new Blob([oFileBody], { type: "text/xml"});
		  // oMyForm.append("webmasterfile", oBlob);
		  // var oReq = new XMLHttpRequest();
		  // oReq.open("POST", "/upload.do");
		  // oReq.send(oMyForm);

		},
		onRemove(file){
			for (let i = 0; i < fileListlength; i++) {
				if(oFile[i].name==file.name){
					oFile.splice(i,1);
				}

			}
			// console.log(oFile);
		  // console.log(file);
		}
	};

	return(
		<Wrap
		   last="店仓维护"
		   next="新增店仓"
		   >
		  
		  <AddShopinfo {...addInfoProps}>
		  <PicturesWall  {...uploadProps}/>
		  </AddShopinfo>
		  <p style={{color:'#333',fontSize:12,textAlign:'center'}}>
		  <span style={{paddingRight:14}}>Copyright</span>
		  <span style={{paddingRight:14}}>2016</span>
		  <span style={{paddingRight:14}}>版权所有</span>
		  <span style={{paddingRight:14}}>北京智慧境界科技发展有限公司</span>
		  <span style={{paddingRight:14}}>2016-12-13</span>
		  <span style={{paddingRight:14}}>12:30</span>
		  </p>
		   </Wrap>

		);
}


Shopadd.propTypes = {
  shopinfo: PropTypes.object,
  uploadProps: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ shopinfo }) {
  return { shopinfo };
}
export default connect(mapStateToProps)(Shopadd);
