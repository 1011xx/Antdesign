import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './login.less';
import Logincpt from '../components/Login/login';

function Login({dispatch,login}){
  const {flag,showtext}=login;

  const loginProps={
    flag,
    showtext,
    onlogin(data){
      // console.log(data);
       dispatch({
              type: 'login/getlogin',
              payload: data,
            });
    },
    changestatus(){
    dispatch({
              type: 'login/ifok',
            });
    },
  };
  return (
    <Logincpt {...loginProps} />
    );
};

Login.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Login);
