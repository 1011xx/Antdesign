import React from 'react';
import {Link} from 'dva/router';
import styles from './mainlayout.less';
import {
  Button,
  Spin,
  Dropdown,
  Menu,
  Breadcrumb,
  Icon,
} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const menu = (
  <Menu>
    <Menu.Item key="100">
      <a target="_blank" rel="noopener noreferrer" href="#">我的资料</a>
    </Menu.Item>
    <Menu.Item key="101">
      <a target="_blank" rel="noopener noreferrer" href="#">我的消息</a>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item key="102">
      <a target="_blank" rel="noopener noreferrer" href="#">注销</a>
    </Menu.Item>
  </Menu>
);
function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}


const Header=({children,location}) =>{
	return(
			<div className={styles.ant_layout_aside}>
        <aside className={styles.ant_layout_sider}>
          <div className={styles.ant_layout_logo}>
            <p className={styles.ant_layout_logo_text}>绚丽之梦后台管理系统</p>
          </div>
          <Menu mode="inline" theme="dark" >
            <SubMenu key="sub1" title={< span > <Icon type="user"/>店仓维护 < /span>}>
              <Menu.Item key="1">
               <Link to="/shopinfo"><Icon type="bars" />店仓信息</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={< span > <Icon type="laptop"/>服装属性 < /span>}>
              <Menu.Item key="2">款号属性维护</Menu.Item>
              <Menu.Item key="3">维护颜色</Menu.Item>
              <Menu.Item key="4">维护尺寸</Menu.Item>
              <Menu.Item key="5">维护尺寸组</Menu.Item>
                 <SubMenu key="sub3" title="款号维护">
                    <Menu.Item key="6">款号信息</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={< span > <Icon type="notification"/>价格定制 < /span>}>
              <Menu.Item key="7">设置吊牌价</Menu.Item>
              <Menu.Item key="8">审核吊牌价</Menu.Item>
            </SubMenu>
          </Menu>
        </aside>
        <div className={styles.ant_layout_main}>
          <div className={styles.ant_layout_header}>

           {/*上方用户栏*/}
          <div className={styles.user}>
        <img src="http://reactjs.cn/react/img/logo.svg" className={styles.who}/>
        <Dropdown overlay={menu}>
          <a className={styles.ant_dropdown_link} >
            John.Smith
            <Icon type="down"/>
          </a>
        </Dropdown>
      </div>

      {/*上方用户栏*/}

           {/*上方导航栏*/}
            <Menu theme="dark" mode="horizontal"
            defaultSelectedKeys={['1']} style={{lineHeight: '64px',paddingLeft:'80px'}}>
            <Menu.Item key="1">
           	 <Link to="/basicplantform">基础平台</Link>
            </Menu.Item>
            <Menu.Item key="2">会员子系统</Menu.Item>
            <Menu.Item key="3">策略子系统</Menu.Item>
            <Menu.Item key="4">销售收银子系统</Menu.Item>
          </Menu>
           {/*上方导航栏*/}


      

          </div>
          {/*<div className={styles.ant_layout_breadcrumb}>
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>应用列表</Breadcrumb.Item>
              <Breadcrumb.Item>表格查询</Breadcrumb.Item>
            </Breadcrumb>
          </div>*/}
          <div className={styles.ant_layout_container}>
            <div className={styles.ant_layout_content}>
              

              	{children}
                 
              
            </div>
          </div>
        </div>

      </div>
		);
}

export default Header;