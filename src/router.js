import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import Login from './routes/login/login';
import System from './routes/system';
import Shopinfo from './routes/shop/shopinfo';
import Basicplantform from './routes/basicplantform';
import StyleAttr from './routes/goods/styleAttr';
import MainAttrList from './routes/goods/mainattrList';
import MaintainColor from './routes/goods/MaintainColor';
import MaintainSize from './routes/goods/MaintainSize';
import MaintainSizeItem from './routes/goods/MaintainSizeItem';
import Shopadd from './routes/shop/shopadd';
import Shopedit from './routes/shop/shopedit';
import Text from './routes/upload';






import AddShopinfo from './components/Storeinfo/addshopinfo';





import Shopdetail from "./routes/shop/Shopdetail.js";





import Moudelnumber from "./routes/goods/Moudelnumber.js";
import BarCode from "./routes/goods/BarCode.js";
import Addstyleroute from "./routes/goods/Addstyle.js";
import Editstyleroute from "./routes/goods/Editstyle.js";
import Styledetails from "./routes/goods/Styledetails.js";
import ConfigColorSize from "./routes/goods/ConfigColorSize.js";
import Modalchosecolor from "./components/ModelNumber/Modalchosecolor.js";





import Audit from "./routes/price/Audit.js";
import Set from "./routes/price/Set.js";
import SetPricedetails from "./routes/price/SetPricedetails.js";
import AuditPricedetails from "./routes/price/AuditPricedetails.js";
import Add from "./routes/price/Add.js";
import Edit from "./routes/price/Edit.js";
import Pendingprice from "./routes/price/Pendingprice.js";
import PicturesWall from "./routes/price/upload.js";



const handleEnter=({params})=>{
	console.log('handleEnter:',params);
}



//使用这样的方式可以按需加载，不用将一个js打包的很大，可以分好多打包。
// const Set = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('./routes/price/Set').default)
//     },'Set')
// }
//
//
// const Basicplantform = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('./routes/basicplantform').default)
//     },'Basicplantform')
// }





export default function({ history }) {

  return (
    <Router history={history}>
      <Route path="/" component={System} >
     	 <IndexRoute  component={Basicplantform}></IndexRoute>
     	 <Route path="/basicplantform" component={Basicplantform} />

     	 <Route path="/shopinfo" component={Shopinfo} />
       <Route path="/shopinfo/shopdetail/:id" onEnter={handleEnter} component={Shopdetail} />
       <Route path="/shopinfo/shopadd" component={Shopadd} />
       <Route path="/shopinfo/shopedit/:id" component={Shopedit} />

       <Route path="/mainattrlist" component={MainAttrList} />
       <Route path="/mainattrlist/styleattr/:id" component={StyleAttr} />

       <Route path="/maintaincolor" component={MaintainColor} />

       <Route path="/maintainsize" component={MaintainSize} />

       <Route path="/maintainsizeitem" component={MaintainSizeItem} />

       <Route path="/modelnumber" component={Moudelnumber} />
       <Route path="/modelnumber/barcode/:id" component={BarCode} />//条码页面
			 <Route path="/modelnumber/addstyle/:id" component={Addstyleroute} /> //修改款号
			 <Route path="/modelnumber/editstyle" component={Editstyleroute} /> //新增款号
			 <Route path="/modelnumber/configcolorsize/:id" component={ConfigColorSize} />
			 <Route path="/modelnumber/styledetails/:id" component={Styledetails} />//查看详情页面

			  <Route path="/test" component={Modalchosecolor} />
				<Route path="/audit" component={Audit} />
        <Route path="/audit/auditpricedetails/:id" component={AuditPricedetails} />
				<Route path="/set/setpricedetails/:id" component={SetPricedetails} />
				<Route path="/audit/Edit/:id" component={Edit} />
        <Route path="/audit/Add" component={Add} />



        // <Route path="/set" component={Set} />
				  <Route path="/set" component={Set} />
         <Route path="/set/pending/:id" component={Pendingprice} />

       </Route>



 <Route path="/upload" component={Text} />

      <Route path="/login" component={Login} />
      <Route path="/Moudelnumber" component={Moudelnumber} />
    </Router>
  );
}
