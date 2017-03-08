
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
		//这里是对页面的页数进行设置
  const pageSizeOptions=['10', '30', '50'];
	return(
        <div className={styles.Pagination_wrap}>
           <Pagination
             className={styles.pagination}
             size="small"
             total={total}
             current={current}
             pageSizeOptions={pageSizeOptions}
             defaultPageSize={defaultPageSize}
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
