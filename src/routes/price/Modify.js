import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Modifyprice from '../../components/Price/Modifyprice';

function Modify({dispatch,price}) {
  const { }=price;
  const auditProps={

  };

  return (
    <Wrap
    num="2"
    url="/audit"
    last="价格维护"
    next="修改调价单"
    >
      <Modifyprice />
   </Wrap>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Modify);
