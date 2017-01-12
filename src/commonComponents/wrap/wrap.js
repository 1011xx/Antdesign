import React, { PropTypes } from 'react';
import {Link} from 'dva/router';
import {Breadcrumb,Icon} from 'antd';
import styles from './wrap.less';


function Wrap({num,url,last,next,afternext,children}) {
	if(num==="1"){
		return(

		<div className={styles.main_content} >
		        <div className={styles.main_content_top}>
		            <Breadcrumb className={styles.Breadcrumb} >
		              <Breadcrumb.Item >
		               <Link to={url}>
		                <Icon type="home" />
		                <span>{last}</span>
		                </Link>
		              </Breadcrumb.Item>
		            </Breadcrumb>
		        </div>
		        <div className={styles.main_content_btm}>
		         {children}
		        </div>
		        
			</div>
			
		);

	}else if(num==="2"){
		return(

		<div className={styles.main_content} >
		        <div className={styles.main_content_top}>
		            <Breadcrumb className={styles.Breadcrumb} separator=">">
		              <Breadcrumb.Item >
		               <Link to={url}>
		                <Icon type="home" />
		                <span>{last}</span>
		                </Link>
		              </Breadcrumb.Item>
		              <Breadcrumb.Item>{next}</Breadcrumb.Item>
		            </Breadcrumb>
		        </div>
		        <div className={styles.main_content_btm}>
		         {children}
		        </div>
		        
			</div>
			
		);
	}else if(num==="3"){
		return(

		<div className={styles.main_content} >
		        <div className={styles.main_content_top}>
		            <Breadcrumb className={styles.Breadcrumb} separator=">">
		              <Breadcrumb.Item >
		               <Link to={url}>
		                <Icon type="home" />
		                <span>{last}</span>
		                </Link>
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

	
}

export default Wrap;