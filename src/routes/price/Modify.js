import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Modifyprice from '../../components/Price/Modifyprice';
import StyleModal from '../../components/Price/ChoosestyleModal';
var brandCode;
var categoryCode;
var seasonCode;
var styleNo;
var yearCode;
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
//将json对象中为undefined字符串的值转化为undefined
function setProps(obj) {
    for (var p in obj) {
        switch (obj[p]) {
            case 'undefined':
                obj[p] = undefined;
                break;
        }
    }
    return obj;
}



function Modify({dispatch,price}) {
  const {
    detaildatasource,
    modalyear,
    modalseason,
    modalbrand,
    modalcategory,
    chosestylemodal,
    modalstyle,
   }=price;
  const modifyProps={
    detaildatasource,
    choosestyle(){
      dispatch({
        type:'price/publicDate',
        payload:{
          chosestylemodal:true
        }
      });
    },
    onDelete(item){

    },
    onSuccess(ret){
      console.log(ret);
    }
  };
  const modalProps={
    visible:chosestylemodal,
    modalyear,
    modalseason,
    modalbrand,
    modalcategory,
    modalstyle,//穿梭框数据
    onOk(){

    },
    handleCancel(){
      dispatch({
        type:'price/publicDate',
        payload:{
          chosestylemodal:false
        }
      });
    },
    passdata(data){
      console.log(setProps(data));
      //将所有的为undefined的字符串转化为undefined类型
      let datas=setProps(data);
      brandCode=datas.brandCode;
      categoryCode=datas.categoryCode;
      seasonCode=datas.seasonCode;
      styleNo=datas.styleNo;
      yearCode=datas.yearCode;
      const commitdata={brandCode,categoryCode,seasonCode,styleNo,yearCode};
      console.log(commitdata);
      console.log(JSON.stringify(commitdata));




      dispatch({
        type:'price/getstyle',
        payload:commitdata
      });
    }
  }

  return (
    <Wrap
    num="2"
    url="/audit"
    last="价格维护"
    next="修改调价单"
    >
      <Modifyprice {...modifyProps}/>
      <StyleModal {...modalProps}/>
   </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Modify);
