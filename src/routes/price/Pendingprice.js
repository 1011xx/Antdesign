import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Wrap from '../../commonComponents/wrap/wrap';
import Pending from '../../components/Price/Pending';
import Savesuccess from '../../commonComponents/Savesuccess/Savesuccess';

function Pendingprice({dispatch,price}){
  const {detaildatasource,pending_visible,pending_spin}=price;
  const pendingProps={
    detaildatasource,
    pending_spin,
    getdata(data){
      data.id=detaildatasource.id;
      console.log(data);
      dispatch({type:'price/publicDate',
      payload:{
        pending_spin:true
      }
    })
      dispatch({
        type:'price/setAudit',
        payload:data
      });
    },
    backurl(){
      dispatch(routerRedux.push('/set'));
    }
  };
  const saveProps={
    content:'审核成功！',
  	visibleSave:pending_visible,
    handleOk(){
      dispatch(routerRedux.push('/set'));
      dispatch({type:'price/publicDate',
      payload:{
        pending_visible:false
      }
    });
    }
  };
  return (
    <div>
    <Pending {...pendingProps}/>
    <Savesuccess {...saveProps}/>
    </div>
  );
}

function mapStateToProps({price}) {
  return {price};
}

export default connect(mapStateToProps)(Pendingprice);
