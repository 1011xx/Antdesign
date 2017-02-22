import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Editstyle from '../../components/ModelNumber/Editstyle';
import Savesuccess from '../../commonComponents/Savesuccess/Savesuccess';
var arr=[];
var arrlabel=[];
var result='';
var result2='';

function Editstyleroute({dispatch,moudelnum}) {
  const {
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
    savedone,//保存成功
    saveFlag,//保存状态
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
  // const clear=function(){
  //   //当进入页面的时候
  //   console.log('location.hash:',location.hash);
  //   console.log(location.hash.split("?")[0].split("/")[2]);
  //   if(location.hash.split("?")[0].split("/")[2]==="editstyle"){
  //     console.log(122222222222222222);
  //   }
  //   // if(flag){
  //   //  arr=[];
  //   //  arrlabel=[];
  //   // }
  // }

  	const editProps={
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
      stylename,
      stylenum,
      saveFlag,
      passdata(value){
        console.log(value);
        dispatch({
          type:'moudelnum/publicDate',
          payload:{
            saveFlag:true
          }
        });
        dispatch({
          type:'moudelnum/create',
          payload:value
        })
      },
      cancel(){
        //点击取消按钮需要执行的事件，返回到列表页面
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
    };
     const saveProps={
    content:'保存成功',
    visibleSave:savedone,
      handleOk(){
        dispatch({
          type:'moudelnum/publicDate',
          payload:{
            savedone:false
          }
        });
         //当保存成功后，点击弹出确定按钮后，跳转到列表页
        dispatch(routerRedux.push('/modelnumber'));
      }

  };
  return (
    <Wrap
     num="2"
     url="/modelnumber"
     last="款号维护"
     next="新增款号"
     >

     <Editstyle {...editProps}/>
      <Savesuccess {...saveProps}/>
   </Wrap>
  );
}
Editstyleroute.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps({moudelnum}) {
  return {moudelnum};
}

export default connect(mapStateToProps)(Editstyleroute);
