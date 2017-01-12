import React, { PropTypes } from 'react';
// import { routerRedux } from 'dva/router';
// import { connect } from 'dva';
import {Breadcrumb,Icon} from 'antd';
import styles from './wrap.less';


function Wrapthree({last,next,afternext,children}) {

	return(

		<div className={styles.main_content}>
		        <div className={styles.main_content_top}>
		            <Breadcrumb className={styles.Breadcrumb}>
		              <Breadcrumb.Item href="">
		                <Icon type="home" />
		                <span>{last}</span>
		              </Breadcrumb.Item>
		              <Breadcrumb.Item>{next}</Breadcrumb.Item>
		               <Breadcrumb.Item>{afternext}</Breadcrumb.Item>
		            </Breadcrumb>
		        </div>
		        <div className={styles.main_content_btm}>
		         {children}
		        </div>
			</div>
			
		);
}

export default Wrapthree;