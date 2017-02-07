import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Pricemaintain from '../../components/Price/Pricemaintain';

function Set({dispatch,price}) {
  const {dataSource, statedata }=price;
  const auditProps={
    dataSource,
    statedata,
    onLook(item){
      //当点击查看的时候
    },
  };
  return (
    <Wrap
       num="1"
       last="价格审核"
       >
       <Pricemaintain {...auditProps}/>
       </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Set);
