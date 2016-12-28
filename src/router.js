import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import Login from './routes/login';
import System from './routes/system';
import Shopinfo from './routes/shopinfo';
import Basicplantform from './routes/basicplantform';
import StyleAttr from './routes/styleAttr';
import MainAttrList from './routes/mainattrList';
import MaintainColor from './routes/MaintainColor';
import Shopadd from './routes/shopadd';
import Text from './routes/upload';






import AddShopinfo from './components/Storeinfo/addshopinfo';


const handleEnter=()=>{
	console.log('enter--IndexRoute');
}

export default function({ history }) {

  return (
    <Router history={history}>
      <Route path="/" component={System} >
     	 <IndexRoute onEnter={handleEnter} component={Basicplantform}></IndexRoute>
     	 <Route path="/basicplantform" component={Basicplantform} />
     	 <Route path="/shopinfo" component={Shopinfo} />
         
       
       <Route path="/shopinfo/shopadd" component={Shopadd} />
       <Route path="/mainattrlist" component={MainAttrList} />
       <Route path="/styleattr" component={StyleAttr} />
       <Route path="/maintaincolor" component={MaintainColor} />
      <Route path="/upload" component={Text} />
      </Route>
    </Router>
  );
};
