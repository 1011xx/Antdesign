import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Editstyle from '../../components/ModelNumber/Editstyle';
import Savesuccess from '../../commonComponents/Savesuccess/Savesuccess';
// var arr=[];
// var arrlabel=[];
var result='';
var result2='';
//新增款号页面
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
    labelarr,
    keyarr
  }=moudelnum;

//通过从后台获取的规则来计算款号和品名
  // const getname=function(){
  //   result="";
  //   result2="";
  //   for(let i=0;i<styleNumbrules.length;i++){
  //     if(arr[styleNumbrules[i]]){
  //       console.log(arr[styleNumbrules[i]]);
  //       result+=arr[styleNumbrules[i]];
  //     }
  //   }
  //   for(let i=0;i<styleNamerules.length;i++){
  //     if(arrlabel[styleNamerules[i]]){
  //       console.log(arrlabel[styleNamerules[i]]);
  //       result2+=arrlabel[styleNamerules[i]];
  //     }
  //   }
  //   dispatch({
  //     type:'moudelnum/publicDate',
  //     payload:{
  //       stylename:result2,
  //       stylenum:result
  //     }
  //   });
  //
  // }
  const getname=function(){
    result="";
    result2="";
    for(let i=0;i<styleNumbrules.length;i++){
      if(keyarr[styleNumbrules[i]]){
        console.log(keyarr[styleNumbrules[i]]);
        result+=keyarr[styleNumbrules[i]];
      }
    }
    for(let i=0;i<styleNamerules.length;i++){
      if(labelarr[styleNamerules[i]]){
        console.log(labelarr[styleNamerules[i]]);
        result2+=labelarr[styleNamerules[i]];
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
      labelarr[1]=value.label;
      keyarr[1]=value.key;
      // arrlabel[1]=value.label;
      // arr[1]=value.key;
      console.log('labelarr:',labelarr,'keyarr:',keyarr);
      getname();
    },
    onChange2(value){
      labelarr[2]=value.label;
      keyarr[2]=value.key;
      //  arr[2]=value.key;
      //  arrlabel[2]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
       getname();

    },
    onChange3(value){
      labelarr[3]=value.label;
      keyarr[3]=value.key;
      // arr[3]=value.key;
      //  arrlabel[3]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
       getname();

    },
    onChange4(e){
      labelarr[4]=e.target.value;
      keyarr[4]=e.target.value;
      // arr[4]=e.target.value;
      //  arrlabel[4]=e.target.value;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
      getname();
    },
    onChange5(value){
      labelarr[5]=value.label;
      keyarr[5]=value.key;
      //   arr[5]=value.key;
      //  arrlabel[5]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
       getname();
    },
    onChange6(value){
      labelarr[6]=value.label;
      keyarr[6]=value.key;
      // arr[6]=value.key;
      //  arrlabel[6]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
      getname();
    },
    onChange7(value){
      labelarr[7]=value.label;
      keyarr[7]=value.key;
      //  arr[7]=value.key;
      //  arrlabel[7]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
      getname();
    },
    onChange8(value){
      labelarr[8]=value.label;
      keyarr[8]=value.key;
      //   arr[8]=value.key;
      //  arrlabel[8]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
      getname();
    },
    onChange9(value){
      labelarr[9]=value.label;
      keyarr[9]=value.key;
      //  arr[9]=value.key;
      //  arrlabel[9]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
      getname();
    },
    onChange10(value){
      labelarr[10]=value.label;
      keyarr[10]=value.key;
      //  arr[10]=value.key;
      //  arrlabel[10]=value.label;
       console.log('labelarr:',labelarr,'keyarr:',keyarr);
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
            savedone:false,
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
