import React, { PropTypes } from 'react';
import { connect } from 'dva';
import Wrap from '../../commonComponents/wrap/wrap';
import Searchinfo from '../../components/ModelNumber/Searchinfo';

function Moudelnumber({dispatch,moudelnum}) {
	const {}=moudelnum;
  return (
    <Wrap
     num="1"
	 last="款号维护"
	 >
		  <Searchinfo/>
	</Wrap>

  );
}

function mapStateToProps({moudelnum}) {
  return {moudelnum};
}

export default connect(mapStateToProps)(Moudelnumber);
