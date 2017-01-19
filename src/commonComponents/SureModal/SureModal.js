import React, { PropTypes } from 'react';
import {  Modal} from 'antd';
import styles from './SureModal.less';


const SureModel = ({
	visibleSure,
  handleCancel,
  makeSure,
	
}) => {
	return(
   
        <Modal title={'删除'}
          visible={visibleSure}
          onOk={makeSure}
          onCancel={handleCancel}
          closable={false}
          className={styles.modal}
        >
         <p className={styles.titlecenter}><b><i className={styles.scimg}></i>是否确认删除本条数据？</b></p>
         <p className={styles.center}>删除后无法恢复</p>
        </Modal>
        
		    );
}

SureModel.propTypes = {
  makeSure:PropTypes.func,
  handleCancel:PropTypes.func,
  visibleSure: PropTypes.bool
};

export default SureModel;