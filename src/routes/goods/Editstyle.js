import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Editstyle from '../../components/ModelNumber/Editstyle';
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
      //手动维护
      brandManualMaintain ,//品牌
      yearManualMaintain ,//年份
      seasonManualMaintain ,//季节
      seriesnumManualMaintain ,//序号
      categoryManualMaintain ,//类别
      materialsManualMaintain ,//面料
      seriesManualMaintain ,//"系列"
      bigCategoryManualMaintain ,//"大类别"
      smallCategoryManualMaintain ,//"小类别"
      saleTypeManualMaintain ,//"销售类型"
      styleNumbrules,
      styleNamerules,
      stylename,
      stylenum,
      passdata(value){
        console.log(value);

        dispatch({
          type:'moudelnum/create',
          payload:value
        })
      },
    onChange1(value,selectOption){
      console.log(selectOption);
      arrlabel[1]=selectOption[0].label;
      arr[1]=value[0];
      getname();


    },
    onChange2(value,selectOption){
      arr[2]=value[0];
       arrlabel[2]=selectOption[0].label;
       getname();

    },
    onChange3(value,selectOption){
      arr[3]=value[0];
       arrlabel[3]=selectOption[0].label;
       getname();

    },
    onChange4(e){
      arr[4]=e.target.value;
       arrlabel[4]=e.target.value;
      getname();
    },
    onChange5(value,selectOption){
       arr[5]=value[0];
       arrlabel[5]=selectOption[0].label;
       getname();
    },
    onChange6(value,selectOption){
      arr[6]=value[0];
       arrlabel[6]=selectOption[0].label;
      getname();
    },
    onChange7(value,selectOption){
      arr[7]=value[0];
       arrlabel[7]=selectOption[0].label;
      getname();
    },
    onChange8(value,selectOption){
      arr[8]=value[0];
       arrlabel[8]=selectOption[0].label;
      getname();
    },
    onChange9(value,selectOption){
      arr[9]=value[0];
       arrlabel[9]=selectOption[0].label;
      getname();
    },
    onChange10(value,selectOption){
      arr[10]=value[0];
       arrlabel[10]=selectOption[0].label;
      getname();
    },
    };
  return (
    <Wrap
     num="2"
     url="/modelnumber"
     last="款号维护"
     next="新增款号"
     >

     <Editstyle {...editProps}/>
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