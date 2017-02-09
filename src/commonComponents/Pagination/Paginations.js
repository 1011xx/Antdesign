
import React, { PropTypes } from 'react';
import {Pagination} from 'antd';
import styles from './Paginations.less';


const Paginations = ({
		total,
		current,
		defaultPageSize,
		onShowSizeChange,
		onPageChange
	}) => {
	return(
        <div className={styles.Pagination_wrap}>
           <Pagination
             className={styles.pagination}
             size="small"
             total={total}
             current={current}
             defaultPageSize={10}
             onShowSizeChange={onShowSizeChange}
             onChange={onPageChange}
             showQuickJumper
             showSizeChanger
           />
        </div>
		    );
}

Paginations.propTypes = {
   total: PropTypes.any,
   current: PropTypes.any,
   defaultPageSize: PropTypes.any,
   onPageChange: PropTypes.func,
   onShowSizeChange: PropTypes.func
};

export default Paginations;
