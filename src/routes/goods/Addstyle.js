import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Addstyle from '../../components/ModelNumber/Addstyle';


function Addstyleroute({dispatch,moudelnum}) {
  const {}=moudelnum;
  return (
    <Wrap
     num="2"
     url="/modelnumber"
     last="款号维护"
     next="修改款号"
     >
     <Addstyle />
   </Wrap>
  );
}

function mapStateToProps(moudelnum) {
  return {moudelnum};
}

export default connect(mapStateToProps)(Addstyleroute);
