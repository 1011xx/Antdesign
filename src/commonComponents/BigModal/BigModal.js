import React, { PropTypes } from 'react';
import {  Modal} from 'antd';
import styles from './BigModal.less';


const BigModal = ({
  children,
	visible,
  handleCancel,
  handleOk,
  title,
  closable,
  maskClosable

}) => {
	return(
      
        <Modal title={title}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={closable}
          maskClosable={maskClosable}
          width={700}
          className={styles.modal}
        >
        {children}
        </Modal>

		    );
}

BigModal.propTypes = {
  handleOk:PropTypes.func,
  handleCancel:PropTypes.func,
  visible: PropTypes.bool
};

export default BigModal;
