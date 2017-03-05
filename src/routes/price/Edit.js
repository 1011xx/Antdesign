import React from 'react';
import { connect } from 'dva';
import { Modal} from 'antd';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Editprice from '../../components/Price/Editprice';
import CommitModal from '../../components/Price/CommitModal';
import StyleModal from '../../components/Price/ChoosestyleModal';
import Setallprice from '../../components/Price/setAllprice';
import Savesuccess from '../../commonComponents/Savesuccess/Savesuccess';
var brandCode;
var categoryCode;
var seasonCode;
var styleCode;
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



function Edit({dispatch,price}) {
  const {
    detaildatasource,//修改吊牌价时候获取到的数据源
    modalyear,
    modalseason,
    modalbrand,
    modalcategory,
    chosestylemodal,
    modalstyle,//穿梭框数据
    copymodalstyle,//拷贝穿梭框数据
    newData,//新增吊牌价时候存储的数据
    commitvis,
    commitdata,
    textareavalue,
    uploadExcel,
    targetKeys,
    allpriceModal,
    selectedRows,
    commitdone,
    addeditloading,
    confirmLoading,
    tiptitle

   }=price;
  const editProps={
    detaildatasource:detaildatasource,//这里判断是新增还是修改
    addeditloading,
    choosestyle(){
      dispatch({
        type:'price/publicDate',
        payload:{
          chosestylemodal:true
        }
      });
    },
    setprice(){
      dispatch({
        type:'price/publicDate',
        payload:{
          allpriceModal:true
        }
      });
    },
    selecteonChange(selected){
      console.log(selected);
      dispatch({
        type:'price/publicDate',
        payload:{
          selectedRows:selected
        }
      });
    },
    onDelete(item){
      //当点击删除的时候，删除newDate.dsataList数组里面的数据，同时要把穿梭框里面的数据复原
          let copyCreatejson=Object.assign({}, detaildatasource);
          let temptransf=modalstyle.concat();
          for(let index in copyCreatejson.dataList){
            if(copyCreatejson.dataList[index].num==item.num){
              copyCreatejson.dataList.splice(index,1);
              //把删除的数据删除后，重新给dataList.key排序
              console.log('copyCreatejson.dataList',copyCreatejson.dataList);
              let rowkey=1;
              for(let index_k in copyCreatejson.dataList){
                copyCreatejson.dataList[index_k].num=rowkey;
                copyCreatejson.dataList[index_k].priceFlag=`configTagprice${rowkey}`;
                copyCreatejson.dataList[index_k].remarkFlag=`remarks${rowkey}`;
                rowkey++;
              }
            }
          };
          //从以前备份的穿梭框中找出删除的code对应的key
          for(let value of copymodalstyle){
            if(value.code==item.styleNo){
              let tempobj={};
              tempobj.key=value.key;
              tempobj.code=value.code;
              temptransf.unshift(tempobj);
            }
          }
          dispatch({
            type:'price/publicDate',
            payload:{
              detaildatasource:copyCreatejson,
              modalstyle:temptransf
            }
          });

    },
    onErrors(err) {
      //当批量导入是出现错误时，弹框提示
      let str=" "+err;
      Modal.error({
        title: '错误',
        content: str,
      });
    },
    onSuccess(ret){
      if(ret.code==0){

            //如果是新建
            let copyCreatejson=Object.assign({}, detaildatasource);
            let createDatalength=0;
            //这里没有做导入的数据重复的判断
            //当没有数据的时候这里后端一定要返回detaildatasource.dataList为空数组
            if(detaildatasource.dataList.length>0){
              // console.error('存在');
              var transFormdata=modalstyle.concat();
              //如果存在dataList，说明之前已经添加数据
              createDatalength=copyCreatejson.dataList.length;
              //在这个for玄幻里判断是否和绵绵有重复的款号，如果有则删除，以页面上原有的为准
              for(let j in ret.data){
                for(let i in detaildatasource.dataList){
                  if(ret.data[j].styleNo==detaildatasource.dataList[i].styleNo){
                    console.log(ret.data[j].styleNo,detaildatasource.dataList[i].styleNo);
                    ret.data.splice(j,1);
                  }
                }
              }
                //这里将批量导入的数据导入到页面中
              for (let value of ret.data) {
                value.key=++createDatalength;
                //在json中天加标记用于去获取表单
                value.priceFlag=`configTagprice${createDatalength}`;
                value.remarkFlag=`remarks${createDatalength}`;
                copyCreatejson.dataList.push(value);

                // 从穿梭框中去掉导入数据中有的款号
                for(let index in transFormdata){
                  if(transFormdata[index].code==value.styleNo){
                    transFormdata.splice(index,1);
                  }
                }
              }
            }else{
              // console.error('不存在');
              //如果之前没有添加数据
              let tempCreatearr=[];
              var transFormdata=modalstyle.concat();
              for (let value of ret.data) {

                value.key=++createDatalength;
                value.priceFlag=`configTagprice${createDatalength}`;
                value.remarkFlag=`remarks${createDatalength}`;
                tempCreatearr.push(value);


                // 从穿梭框中去掉导入数据中有的款号
                for(let index in transFormdata){
                  // console.log(transFormdata[index].code,value.styleNo);
                  if(transFormdata[index].code==value.styleNo){
                    transFormdata.splice(index,1);
                    // console.log(transFormdata);
                  }
                }
              }
              copyCreatejson.dataList=tempCreatearr;
            }

            // console.log('copyCreatejson:',transFormdata);
            dispatch({
              type:'price/publicDate',
              payload:{
                detaildatasource:copyCreatejson,
                modalstyle:transFormdata
              }
            });

      }

    },
    getdata(values){

              // console.log('新建吊牌价');

                console.log('修改提交审核');


                dispatch({
                  type:'price/publicDate',
                  payload:{
                    commitdata:detaildatasource,
                    commitvis:true,
                    tiptitle:'提交审核'
                  }
                });






    },
    backurl(){
      dispatch(routerRedux.push('/audit'));
    },
    tagPrice(value, index,key){
      //设置吊牌价
      let tempobj=Object.assign({},detaildatasource);
      let num=parseFloat(value).toFixed(3);
      let numvalue=num.substring(0,num.lastIndexOf('.')+3)
      console.log('toFixed:',numvalue);

      tempobj.dataList[index][key] = numvalue;
    dispatch({
      type:'price/publicDate',
      payload:{
        detaildatasource:tempobj
      }
    });
console.log(typeof(detaildatasource.dataList[index][key]));
    },
    tagremarks(value, index,key){
      //table中的备注
      detaildatasource.dataList[index][key] = value;
      dispatch({
        type:'price/publicDate',
        payload:{
          detaildatasource:detaildatasource
        }
      });
    },
    datechanger( value,key){
      //日期选择器
      // console.log( value.format('YYYY-MM-DD'),key);
      if(value){
        detaildatasource[key]=value.format('YYYY-MM-DD');
      }else{
        detaildatasource[key]=value;
      }

      // console.log(newData);
    },
    remarkschange(value,key){
      //总体价格信息下的备注
      detaildatasource[key]=value;
      // console.log(newData);
    },
    temporaryStorage(){
      //暂存
      console.log('暂存');
      detaildatasource.tagpriceConfigDetailDto=detaildatasource.dataList;
       let temp=Object.assign({},detaildatasource);
      delete temp.dataList;
      console.log(temp);
      dispatch({
        type:'price/publicDate',
        payload:{
          addeditloading:true,
          tiptitle:'暂存'
        }
      });
      //通过接口提交数据
      dispatch({
        type:'price/audittempsave',
        payload:temp
      });

    }
  };
  const transforProps={
    visible:chosestylemodal,
    modalyear,
    modalseason,
    modalbrand,
    modalcategory,
    modalstyle,//穿梭框数据
    targetKeys,//选中的数据
    onOk(){
    //   //从穿梭框数据元中通过key找出选中的数据

    // 1.如果打开新增页面，没有进行任何添加操作
    // 2.如果先通过Excel导入数据，后通过穿梭框导入数据
    // 3.如果先从穿梭框添加数据，后从excel导入。


          //从穿梭框数据元中通过key找出选中的数据
            let tempobj={};//定义零时对象
            // let temparr=[];//定义零时数组
            let transftempdata=modalstyle.concat();
            let copyDetaildatasource=Object.assign({}, detaildatasource);

              if(detaildatasource.dataList){
                console.log('hasdata');
              var lengthList=detaildatasource.dataList.length;
              }else{
                console.log('nodata');
              var lengthList=0;
              }


          for(let j in targetKeys){
            for (let index_i in modalstyle) {

                let temp={};
              //如果key相同说明就是需要照的数据
              if(modalstyle[index_i].key==targetKeys[j]){
                console.info(modalstyle[index_i].key,targetKeys[j],index_i,j);

                lengthList=lengthList+1;
                temp.num=lengthList;
                temp.configTagprice=undefined;
                temp.remarks=undefined;
                temp.styleNo=modalstyle[index_i].code;
                // console.log(modalstyle[index_i].code);
                // temp.styleNocode=modalstyle[index_i].key;
                temp.priceFlag='configTagprice'+lengthList;
                temp.remarkFlag='remarks'+lengthList;
                //删除已经选中的穿梭框数据

                // console.log('transftempdata:',modalstyle[index_i].code,);
                modalstyle.splice(index_i,1)
                // console.log(transftempdata);
                if(copyDetaildatasource.dataList){
                  copyDetaildatasource.dataList.push(temp);
                }else{
                  let arr=[];
                  arr.push(temp);
                  copyDetaildatasource.dataList=arr;
                }

              }
            }
          }
      // copyDetaildatasource.dataList=temparr;
      // console.log('tempobj:',tempobj);

          //完成操作后关闭弹框，并清空穿梭框中选中的数据
    		dispatch({
    			type:'price/publicDate',
    			payload:{
    				chosestylemodal:false,
            detaildatasource:copyDetaildatasource,
            modalstyle:modalstyle,
    				targetKeys:[]
    			}
    		});
    },
    handleTransferChange(targetKey, direction, moveKeys){
      console.log('targetKey:',targetKey,direction,moveKeys);

		dispatch({
			type:'price/publicDate',
			payload:{
				targetKeys:targetKey
			}
		});
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
      //按条件查询
      console.log(setProps(data));
      //将所有的为undefined的字符串转化为undefined类型
      let datas=setProps(data);
      brandCode=datas.brandCode;
      categoryCode=datas.categoryCode;
      seasonCode=datas.seasonCode;
      styleCode=datas.styleNo;
      yearCode=datas.yearCode;
      const commitdata={brandCode,categoryCode,seasonCode,styleCode,yearCode};
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
     confirmLoading,
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

//点击确定按钮后，让按钮呈加载状态，并且不可以重复点击
       dispatch({
         type:'price/publicDate',
         payload:{
           confirmLoading:true
         }
       });
       //组装要发给后台的数据，点击提交的时候发送的数据

       // detaildatasource是获取到的详情数据，需要从获取到的详情数据中提取数据发送给后台

      //修改提交
      // detaildatasource.description=Value.description;
      detaildatasource.tagpriceConfigDetailDto=detaildatasource.dataList;
      // delete detaildatasource.dataList;
      let temp=Object.assign({},detaildatasource);
      delete temp.dataList;
      console.log('temp:',temp);
      dispatch({
        type:'price/updatecommitsave',
        payload:temp
      });






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
  const priceProps={
    visible:allpriceModal,
    getdata(data){
      dispatch({
        type:'price/publicDate',
        payload:{
          allpriceModal:false
        }
      });
      console.log(data);

          console.log('detaildatasource',detaildatasource);
          let copyDetaildatasource=Object.assign({}, detaildatasource);
          for (let i in copyDetaildatasource.dataList) {
            for (let j in selectedRows) {
              if (copyDetaildatasource.dataList[i].key==selectedRows[j].key) {
                  copyDetaildatasource.dataList[i].configTagprice=data.ALLprice;
              }
            }
          }
          dispatch({
            type:'price/publicDate',
            payload:{
              detaildatasource:copyDetaildatasource
            }
          });


    },
    handleCancel(){
      dispatch({
        type:'price/publicDate',
        payload:{
          allpriceModal:false
        }
      });
    }
  };
  const saveProps={
   content:`${tiptitle}成功`,
   visibleSave:commitdone,
     handleOk(){
       dispatch({
         type:'price/publicDate',
         payload:{
           commitdone:false,
           addeditloading:false,
          
         }
       });
        //当保存成功后，点击弹出确定按钮后，跳转到列表页
       dispatch(routerRedux.push('/audit'));
     }
 };

  return (
    <Wrap
    num="2"
    url="/audit"
    last="价格维护"
    next="修改调价单"
    >
      <Editprice {...editProps}/>
      <StyleModal {...transforProps}/>
      <CommitModal {...commitProps}/>
      <Setallprice {...priceProps}/>
      <Savesuccess {...saveProps}/>
   </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Edit);
