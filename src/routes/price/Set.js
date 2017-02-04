import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Pricemaintain from '../../components/Price/Pricemaintain';

function Set({dispatch,price}) {
  const { }=price;
  return (
    <Wrap
       num="1"
       last="价格维护"
       >
       <Pricemaintain/>
       </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Set);
