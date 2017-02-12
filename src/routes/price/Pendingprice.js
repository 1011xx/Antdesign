import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Pending from '../../components/Price/Pending';


function Pendingprice({dispatch,price}){
  const {detaildatasource}=price;
  const pendingProps={
    detaildatasource,
    getdata(data){

    },
    backurl(){
      dispatch(routerRedux.push('/set'));
    }
  }
  return (
    <Pending {...pendingProps}/>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Pendingprice);
