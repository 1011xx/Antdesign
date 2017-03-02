import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Addstyle from '../../components/ModelNumber/Addstyle';
import Savesuccess from '../../commonComponents/Savesuccess/Savesuccess';
import {setProps} from '../../utils/common';
var result='';
var result2='';

function Addstyleroute({dispatch,moudelnum}) {
  const {
    item,
    brand,//品牌
    year,//年份
    season,//季节
    seriesnum,//序号
    category,//类别
    materials,//面料
    series,//"系列"
    bigCategory,//"大类别"
    smallCategory,//"小类别"
    saleType,//"销售类型"
    sizeItem,//尺寸组
    styleUnit,//单位
    styleNumbrules,
    styleNamerules,
    stylename,//品名
    stylenum,//款号
    currentItem,
    arr,
    arrlabel,
    savedtwo,//修改成功
    switchstatus,
    saveFlag,
    styleCode,
    categoryCode,
    yearCode,

  }=moudelnum;
  //通过从后台获取的规则来计算款号和品名
    const getname=function(){
      result="";
      result2="";
      for(let i=0;i<styleNumbrules.length;i++){
        if(arr[styleNumbrules[i]]){
          console.log(arr[styleNumbrules[i]]);
          result+=arr[styleNumbrules[i]];
        }
      }
      for(let i=0;i<styleNamerules.length;i++){
        if(arrlabel[styleNamerules[i]]){
          console.log(arrlabel[styleNamerules[i]]);
          result2+=arrlabel[styleNamerules[i]];
        }
      }
      dispatch({
        type:'moudelnum/publicDate',
        payload:{
          stylename:result2,
          stylenum:result
        }
      });
    }
    const addProps={
      brand ,//品牌
      year ,//年份
      season ,//季节
      seriesnum ,//序号
      category ,//类别
      materials ,//面料
      series ,//"系列"
      bigCategory ,//"大类别"
      smallCategory ,//"小类别"
      saleType ,//"销售类型"
      sizeItem,//尺寸组
      styleUnit,//单位
      styleNumbrules,
      styleNamerules,
      switchstatus,
      stylename,
      stylenum,
      saveFlag,
      currentItem,//根据id获取到的数据
      passdata(value){
        console.log(value);

        dispatch({
          type:'moudelnum/publicDate',
          payload:{
              saveFlag:true
          }
        });
        dispatch({
          type:'moudelnum/update',
          payload:value
        })
      },
      cancel(){
        //点击取消后返回到列表页面。
        dispatch(routerRedux.push('/modelnumber'));
      },
      onChange1(value){
       arrlabel[1]=value.label;
       arr[1]=value.key;
       getname();


     },
     onChange2(value){
        arr[2]=value.key;
        arrlabel[2]=value.label;
        getname();

     },
     onChange3(value){
       arr[3]=value.key;
        arrlabel[3]=value.label;
        getname();

     },
     onChange4(e){
       arr[4]=e.target.value;
        arrlabel[4]=e.target.value;
       getname();
     },
     onChange5(value){
         arr[5]=value.key;
        arrlabel[5]=value.label;
        getname();
     },
     onChange6(value){
       arr[6]=value.key;
        arrlabel[6]=value.label;
       getname();
     },
     onChange7(value){
        arr[7]=value.key;
        arrlabel[7]=value.label;
       getname();
     },
     onChange8(value){
         arr[8]=value.key;
        arrlabel[8]=value.label;
       getname();
     },
     onChange9(value){
        arr[9]=value.key;
        arrlabel[9]=value.label;
       getname();
     },
     onChange10(value){
        arr[10]=value.key;
        arrlabel[10]=value.label;
       getname();
     },
    statustest(){

      if(switchstatus){
          dispatch({
          type:'moudelnum/publicDate',
          payload:{
              switchstatus:false
          }
        });
      }else{
          dispatch({
          type:'moudelnum/publicDate',
          payload:{
              switchstatus:true
          }
        });
      }

    }
    };
    const saveProps={
    content:'修改成功',
    visibleSave:savedtwo,
      handleOk(){
        dispatch({
          type:'moudelnum/publicDate',
          payload:{
            savedtwo:false
          }
        });
        //当修改成功后，点击弹出确定按钮后，跳转到列表页
        dispatch(routerRedux.push('/modelnumber'));
        //当跳转到列表页面后，根据当前页面的搜索条件包括页数，重新请求数据
        let queryobj={styleCode,categoryCode,yearCode};
        queryobj=setProps(queryobj);
        // console.error(queryobj);
        dispatch({
          type:'moudelnum/querypage',
          payload:queryobj
        });
      }
  };
  return (
    <Wrap
     num="2"
     url="/modelnumber"
     last="款号维护"
     next="修改款号"
     >
     <Addstyle {...addProps}/>
     <Savesuccess {...saveProps}/>
   </Wrap>
  );
}

function mapStateToProps({moudelnum}) {
  return {moudelnum};
}

export default connect(mapStateToProps)(Addstyleroute);
