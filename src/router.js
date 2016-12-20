import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import Login from './routes/login';
import System from './routes/system';



export default function({ history }) {
  return (
    <Router history={history}>

      <Route path="/" component={Login} />
      <Route path="/system" component={System} />
    </Router>
  );
};
