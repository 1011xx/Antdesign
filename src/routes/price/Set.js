import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import LookupModal from '../../components/Price/LookupModal';
import Pricemaintain from '../../components/Price/Pricemaintain';

function Set({dispatch,price}) {
  const {dataSource, statedata,lookupvis,auditdetaildata }=price;
  const auditProps={
    dataSource,
    statedata,
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
  return (
    <Wrap
       num="1"
       last="价格审核"
       >
       <Pricemaintain {...auditProps}/>
        <LookupModal {...lookupProps}/>
       </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Set);
