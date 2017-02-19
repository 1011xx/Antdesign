import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Modifyprice from '../../components/Price/Modifyprice';
import CommitModal from '../../components/Price/CommitModal';
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
    detaildatasource,//修改吊牌价时候获取到的数据源
    setType,
    setStatus,
    modalyear,
    modalseason,
    modalbrand,
    modalcategory,
    chosestylemodal,
    modalstyle,
    newData,//新增吊牌价时候存储的数据
    saveState,//暂存tempsave，提交审核commit
    commitvis,
    commitdata,
    textareavalue,
    uploadExcel
   }=price;
  const modifyProps={
    setType,
    detaildatasource:setType==='create'?newData:detaildatasource,//这里判断是新增还是修改
    choosestyle(){
      dispatch({
        type:'price/publicDate',
        payload:{
          chosestylemodal:true
        }
      });
    },
    onDelete(item){
        if(setType=='create'){
          let copyCreatejson=Object.assign({}, newData);
          for(let index in copyCreatejson.dataList){
            if(copyCreatejson.dataList[index].key==item.key){
              console.log(item.key,copyCreatejson.dataList[index].key);
              copyCreatejson.dataList.splice(index,1);
            }
          };
          dispatch({
            type:'price/publicDate',
            payload:{
              newData:copyCreatejson
            }
          });
        }else{
          let copyCreatejson=Object.assign({}, detaildatasource);
          for(let index in copyCreatejson.dataList){
            if(copyCreatejson.dataList[index].key==item.key){
              console.log(item.key,copyCreatejson.dataList[index].key);
              copyCreatejson.dataList.splice(index,1);
            }
          };
          dispatch({
            type:'price/publicDate',
            payload:{
              newData:copyCreatejson
            }
          });

        }



    },
    onSuccess(ret){
      if(ret.code==0){
          if(setType=='create'){
            let copyCreatejson=Object.assign({}, newData);
            let createDatalength=0;
            //这里没有做导入的数据重复的判断
            if(copyCreatejson&&copyCreatejson.dataList){
              //如果存在dataList，说明之前已经添加数据
              createDatalength=copyCreatejson.dataList.length;

              for (let value of ret.data) {
                console.log(value);
                value.key=++createDatalength;
                //在json中天加标记用于去获取表单
                value.priceFlag=`configTagprice${createDatalength}`;
                value.remarkFlag=`remarks${createDatalength}`;
                copyCreatejson.dataList.push(value);
              }
            }else{
              //如果之前没有添加数据
              let tempCreatearr=[];
              for (let value of ret.data) {
                console.log(value);
                value.key=++createDatalength;
                value.priceFlag=`configTagprice${createDatalength}`;
                value.remarkFlag=`remarks${createDatalength}`;
                tempCreatearr.push(value);
                // copyCreatejson.dataList.push(value);
              }
              copyCreatejson.dataList=tempCreatearr;
            }



            console.log('copyCreatejson:',copyCreatejson);
            dispatch({
              type:'price/publicDate',
              payload:{
                newData:copyCreatejson
              }
            });
          }else{
            console.log(ret);
            let copyjson=Object.assign({}, detaildatasource);
            let lenghtofdata=detaildatasource.dataList.length;
            for (let variable of ret.data) {
              console.log(variable);
              variable.key=++lenghtofdata;
              copyjson.dataList.push(variable);
            }
            dispatch({
              type:'price/publicDate',
              payload:{
                detaildatasource:copyjson
              }
            });
          console.log(detaildatasource);
          }
      }

    },
    getdata(values){
      if(setType=='create'){
        // console.log('新建吊牌价');
        if(saveState=='commit'){
          console.log('新建提交审核');
          // console.log(values);
          //这里将表单中获取的数据组装好
          newData.expectEffectiveDate=values.expectEffectiveDate;
          newData.remarks=values.remarks;
          //遍历object对象，找除相应的key对应的value,并更改newData中的值准备提交用
          for (let key of Object.keys(values)) {
            for (let index in newData.dataList) {
              // console.log(newData.dataList[index]);
              if(key==newData.dataList[index].priceFlag){
                newData.dataList[index].configTagprice=values[key];
              }
              if(key==newData.dataList[index].remarkFlag){
                newData.dataList[index].remarks=values[key];
              }
            }
                // console.log(key + ": " + values[key]);
            }




          dispatch({
            type:'price/publicDate',
            payload:{
              commitdata:newData,
              commitvis:true
            }
          });

        }else{
          console.log('新建暂存');
          console.log(values);
          // dispatch({
          //   type:'price/tempsave',
          //   payload:
          // });
        }
      }else{
        // console.log('修改吊牌价');
        if(saveState=='commit'){
          console.log('修改提交审核');
          //修改吊牌价

          //这里会获取到期待的日期，和评论
          detaildatasource.expectEffectiveDate=values.expectEffectiveDate;
          detaildatasource.remarks=values.remarks;
          //遍历object对象，找除相应的key对应的value,并更改newData中的值准备提交用
          for (let key of Object.keys(values)) {
            for (let index in detaildatasource.dataList) {
              // console.log(newData.dataList[index]);
              if(key==detaildatasource.dataList[index].priceFlag){
                detaildatasource.dataList[index].configTagprice=values[key];
              }
              if(key==detaildatasource.dataList[index].remarkFlag){
                detaildatasource.dataList[index].remarks=values[key];
              }
            }
                // console.log(key + ": " + values[key]);
            }

          // console.log('detaildatasource:',detaildatasource);

          dispatch({
            type:'price/publicDate',
            payload:{
              commitdata:detaildatasource,
              commitvis:true
            }
          });
        }else{
          console.log('修改暂存');
          console.log(values);
          // dispatch({
          //   type:'price/tempsave',
          //   payload:detaildatasource
          // });
        }
      }


    },
    backurl(){
      dispatch(routerRedux.push('/audit'));
    },
    Submitted (){
      //提交审核
      dispatch({
        type:'price/publicDate',
        payload:{
          saveState:'commit'
        }
      });

    },
    temporaryStorage(){
      //暂存
      dispatch({
        type:'price/publicDate',
        payload:{
          saveState:'tempsave'
        }
      });

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
  };

  const commitProps={
     commitvis,
     commitdata,
     initvalue:"",
     handleCancel(e){
       //取消提交关闭弹窗
       dispatch({
         type:'price/publicDate',
         payload:{
           commitvis:false
         }
       });
     },
     makeSure(Value){
       //组装要发给后台的数据，点击提交的时候发送的数据

       // detaildatasource是获取到的详情数据，需要从获取到的详情数据中提取数据发送给后台
    if(setType=='create'){
      newData.description=Value.description;
      console.log('newData:',newData);
      dispatch({
        type:'price/commit',
        payload:newData
      });
    }else{
      detaildatasource.description=Value.description;
      console.log('detaildatasource:',detaildatasource);
      dispatch({
        type:'price/commit',
        payload:detaildatasource
      });

    }

      //  let tempcommitobj={};
      //  if(Value.description){
      //    //获取description数据
      //    tempcommitobj.description=Value.description;
      //  }
      //  tempcommitobj.id=detaildatasource.id;
      //  tempcommitobj.documentNumber=detaildatasource.documentNumber;
      //  tempcommitobj.expectEffectiveDate=detaildatasource.expectEffectiveDate;
      //  tempcommitobj.state=detaildatasource.state;
      //  tempcommitobj.remarks=detaildatasource.remarks;
       //
      //  let tempcommitarr=[];
      //  for (let value of detaildatasource.dataList) {
      //    //遍历dataList并组装数据
      //      let temparrobj={};
      //      temparrobj.id=value.configId;
      //      temparrobj.styleNo=value.styleNo;
      //      temparrobj.currentTagprice=value.currentTagprice;
      //      temparrobj.configTagprice=value.configTagprice;
      //      temparrobj.remarks=value.remarks;
      //      temparrobj.seqno=value.seqno;
      //      tempcommitarr.push(temparrobj);
      //    }
      //  tempcommitobj.tagpriceConfigDetailDto=tempcommitarr;
       //


       //确定提交后要执行操作,关闭弹窗，然后执行提交操作
      //  dispatch({
      //    type:'price/publicDate',
      //    payload:{
      //      commitvis:false
      //    }
      //  });


     },
     explain(e){
       //获取说明输入框的内容
       exp = e.target.value;
       console.log(exp);
       dispatch({
         type:'price/publicDate',
         payload:{
           explaintext:e.target.value
         }
       });
     }
  };

  return (
    <Wrap
    num="2"
    url="/audit"
    last="价格维护"
    next={setStatus}
    >
      <Modifyprice {...modifyProps}/>
      <StyleModal {...modalProps}/>
      <CommitModal {...commitProps}/>
   </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Modify);
