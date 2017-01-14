import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Editstyle from '../../components/ModelNumber/Editstyle';


function Editstyleroute({dispatch,moudelnum}) {
  const {}=moudelnum;
  return (
    <Wrap
     num="2"
     url="/modelnumber"
     last="款号维护"
     next="新增款号"
     >
     <Editstyle />
   </Wrap>
  );
}

function mapStateToProps(moudelnum) {
  return {moudelnum};
}

export default connect(mapStateToProps)(Editstyleroute);
