import React, { PropTypes } from 'react';
import { Form, Icon, Input, Button, Badge } from 'antd';
const FormItem = Form.Item;
import styles from './login.less';

const Logincpt = ({
  flag,
  showtext,
  onlogin,
  changestatus,
  item = {},
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
    },
}) =>{

function onTap() {
     validateFields((errors) => {
          if (errors) {
            return;
          }
          const data = { ...getFieldsValue() };
          // console.log("data:");
          // console.log(data);
          onlogin(data);
        });
     }



return (
        <div className={styles.wrap}>
    <div className={styles.wrap_top}>
      <div className={styles.content_plan}>
        <div className={styles.xunli_logo}>
          <div>
            <img className={styles.login_logo} src="./src/assets/login_logo.png" />
          </div>
          <h1 className={styles.company}>绚丽之梦营销管理平台</h1>
        </div>
        <div className={styles.login_pannel}>
          <div className={styles.title}>
            <p className={styles.title_name}>用户登录</p>
          </div>

          <Form horizontal className={styles.form}>
        <FormItem
          hasFeedback
        >
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              { required: true, message: '用户名未填写' },
            ],
          })(
            <Input addonBefore={<Icon type="user" className={styles.icon}/>} type="text" placeholder="请输入用户名" className={styles.input} onFocus={()=>changestatus()}/>
          )}
        </FormItem>
        <FormItem hasFeedback >
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              { required: true, message: '密码未填写' },

            ],
          })(
            <Input addonBefore={<Icon type="lock" className={styles.icon}/>} type="text" placeholder="请输入密码" className={styles.input} onFocus={()=>changestatus()}/>
          )}
        </FormItem >
        <FormItem >
        <div className={styles.yangzi}>
          <span className={flag?styles.warning:styles.isok}>
            <Badge status="error" text="賬號或密碼錯誤" />
          </span>
        </div>
             <div className={styles.login_btn}>
                <input type="button" className={styles.btn} value="登陆" onClick={() =>onTap()}/>
             </div>
        </FormItem >
        </Form>

        </div>
      </div>

    </div>
    <div className={styles.wrap_btn}>
      <span className={styles.copyright}>版权所有：北京智慧境界科技发展有限公司</span>
    </div>
  </div>

  );
};

Logincpt.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onlogin: PropTypes.func
};


export default Form.create()(Logincpt);
