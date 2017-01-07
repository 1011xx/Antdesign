import React from 'react';
import {message} from 'antd';
import styles from './Message.css';
const success = function () {
  message.success('信息保存成功！');
};

const error = function () {
  message.error('保存失败请重试！');
};
function Message(props) {
  return (
    <div className={styles.normal}>
      Component: 'Message'
    </div>
  );
}

export default Message;
