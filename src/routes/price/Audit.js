import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Priceaudit from '../../components/Price/Priceaudit';
import LookupModal from '../../components/Price/LookupModal';


function Audit({dispatch,price}) {
  const {dataSource, lookupvis }=price;
  const auditProps={
    dataSource,
    passdata(data){
      //当点击提交按钮的时候
      console.log(data);
    },
    setPrice(){
      //当点击设置吊牌价的时候
    },
    onCommit(item){
      //当点击提交的时候
    },
    onDelete(item){
      //当点击删除按钮的时候
    },
    onLook(item){
      //当点击查看的时候
    },
  };
  const lookupProps={
      lookupvis,
  };
  return (
    <Wrap
       num="1"
       last="价格审核"
       >
       <Priceaudit {...auditProps}/>
       <LookupModal {...lookupProps}/>
   </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Audit);
