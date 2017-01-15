import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Priceaudit from '../../components/Price/Priceaudit';
import styles from './Audit.css';

function Audit({dispatch,price}) {
  const { }=price;
  return (
    <Wrap
       num="1"
       last="价格审核"
       >
       <Priceaudit/>
       </Wrap>
  );
}

function mapStateToProps(price) {
  return {price};
}

export default connect(mapStateToProps)(Audit);
