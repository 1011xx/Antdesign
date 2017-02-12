import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Priceaudit from '../../components/Price/Priceaudit';
import LookupModal from '../../components/Price/LookupModal';
import CommitModal from '../../components/Price/CommitModal';
import SureModel from '../../commonComponents/SureModal/SureModal';
var exp;

function Audit({dispatch,price}) {
  const {dataSource, lookupvis,statedata,visibleSure,commitvis,commitdata,textareavalue,auditdetaildata,deleteid }=price;
  const auditProps={
    dataSource,
    statedata,
    passdata(data){
      //当点击提交按钮的时候,
      console.log(data);
    },
    setPrice(){
      //当点击设置吊牌价的时候
    },
    onCommit(item){
      //当点击提交的时候，获取当前行表格的数据，在模态框上显示
      item.createDate=item.createDate.split(" ")[0];
      dispatch({
        type:'price/publicDate',
        payload:{
          commitvis:true,
          commitdata:item
        }
      });
    },
    onDelete(item){
      //当点击删除按钮的时候,显示删除弹窗
      console.log(item.id);
      dispatch({
        type:'price/publicDate',
        payload:{
          visibleSure:true,
          deleteid:item.id
        }
      });
    },
    onLook(item){
      //当点击详情的时候
      dispatch({
        type:'price/auditdetail',
        payload:item.id
      })
      dispatch({
        type:'price/publicDate',
        payload:{
          lookupvis:true
        }
      });
    },
  };
  const lookupProps={
      lookupvis,
      auditdetaildata,
      onOk(){
        //当点击模态框上的确定按钮的时候
        dispatch({
          type:'price/publicDate',
          payload:{
            lookupvis:false
          }
        });
      },
    	handleCancel(){
        //当点击模态框上的取消按钮的时候
        dispatch({
          type:'price/publicDate',
          payload:{
            lookupvis:false
          }
        });
      },
  };
  const commitProps={
     commitvis,
     commitdata,
     initvalue:textareavalue,
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
       console.log(Value);


       //确定提交后要执行操作,关闭弹窗，然后执行提交操作
       dispatch({
         type:'price/publicDate',
         payload:{
           commitvis:false
         }
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
  const delProps={
    visibleSure,
    handleCancel(){
      //取消删除关闭弹窗
      dispatch({
        type:'price/publicDate',
        payload:{
          visibleSure:false
        }
      });
    },
    makeSure(){
      //确定删除后要执行操作,关闭弹窗，然后执行删除操作
      dispatch({
        type:'price/publicDate',
        payload:{
          visibleSure:false
        }
      });
      //执行删除操作
      dispatch({
        type:'price/delete',
      });
    },
  };
  return (
    <Wrap
       num="1"
       last="价格维护"
       >
       <Priceaudit {...auditProps}/>
       <LookupModal {...lookupProps}/>
       <CommitModal {...commitProps}/>
       <SureModel {...delProps}/>
   </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Audit);
