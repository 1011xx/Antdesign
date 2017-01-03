import React, { PropTypes } from 'react';
import {Link} from 'dva/router';
import {
  Button,
  Spin,
  Dropdown,
  Menu,
  Breadcrumb,
  Icon,
} from 'antd';
import styles from './mainlayout.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const menu = (
  <Menu>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="#">修改密码</a>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item key="2">
      <a target="_blank" rel="noopener noreferrer" href="#">注销</a>
    </Menu.Item>
  </Menu>
);



const Header=({
  children,
  location,
  currentopenkey,
  currentselectkey,
  onOpenChange,
  handleClick
}) =>{
  

	return(
 <div className={styles.ant_layout_wrap} >
      <div className={styles.ant_layout_header}>
        <div className={styles.ant_layout_wrapper}>
          <div className={styles.ant_layout_logo}>
            <img src="./src/assets/logo.png" />
          </div>
          <div className={styles.function_menu}>
            <div className={styles.user}>
              <img src="http://reactjs.cn/react/img/logo.svg" className={styles.who}/>
              <Dropdown overlay={menu}>
              <a className={styles.ant_dropdown_link} >汤姆·马修
                <Icon type="down"/>
              </a>
              </Dropdown>
            </div>
          <Menu theme="dark" mode="horizontal"
            defaultSelectedKeys={['1']} style={{lineHeight: '64px',float:'right'}}>
            <Menu.Item key="1">基础平台</Menu.Item>
            <Menu.Item key="2">会员子系统</Menu.Item>
            <Menu.Item key="3">策略子系統</Menu.Item>
            <Menu.Item key="4">销售收银子系统</Menu.Item>
          </Menu>

          
      </div>

        </div>
      </div>
      <div className={styles.content_wrap}>
      <div className={styles.left_dropbar_wrap}>
      {/*selectedKeys={[this.state.current]}*/}
      <Menu
        mode="inline"
        openKeys={currentopenkey}
        selectedKeys={[currentselectkey]}
        onOpenChange={onOpenChange}
        onClick={handleClick}
        style={{ width: 210 }}
      >
        <SubMenu key="sub1" title={<span><Icon className={styles.iicon} /><span>店仓档案</span></span>}>
          <Menu.Item key="1">
            <Link to="/shopinfo">店仓维护</Link>
          </Menu.Item>

        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon className={styles.iicon1} /><span>商品档案</span></span>}>
          <Menu.Item key="2">
          <Link to="/styleattr">属性维护</Link>
          </Menu.Item>
          <Menu.Item key="3">
           <Link to="/maintaincolor">颜色维护</Link>
          </Menu.Item>
          <Menu.Item key="4">
           <Link to="/maintainsize">尺寸维护</Link>
          </Menu.Item>
          <Menu.Item key="5">尺寸组维护</Menu.Item>
          <Menu.Item key="6">款号维护</Menu.Item>

          {/*<SubMenu key="sub3" title="Submenu">
                      <Menu.Item key="7">Option 7</Menu.Item>
                      <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>*/}
        </SubMenu>

         <SubMenu key="sub4" title={<span><Icon className={styles.iicon3} /><span>价格档案</span></span>}>
          <Menu.Item key="7">价格维护</Menu.Item>
          <Menu.Item key="8">价格审核</Menu.Item>
        </SubMenu>
      </Menu>
      </div>
       <div className={styles.Frameproduct}>
         <div className={styles.product}>
           {children}
         </div> 
       </div>
          
       
    </div>
  </div>











		);
}

Header.propTypes={
  onOpenChange: PropTypes.func,
  handleClick: PropTypes.func,
  currentopenkey: PropTypes.any,
  currentselectkey: PropTypes.any,
}



export default Header;
