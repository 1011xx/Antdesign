import React from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';

function Moudelnumber(props) {
  return (
    <Wrap
    num="1"
	 last="款号维护"

	 >
		  
		 
		   </Wrap>

  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Moudelnumber);
