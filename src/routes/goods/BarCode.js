import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Barcode from '../../components/ModelNumber/Barcode';


function BarCode({dispatch,moudelnum}) {
	const {}=moudelnum;
  return (
    <Wrap
     num="1"
	 last="款号维护"
	 >
		  <Barcode />

	</Wrap>

  );
}

function mapStateToProps({moudelnum}) {
  return {moudelnum};
}

export default connect(mapStateToProps)(BarCode);