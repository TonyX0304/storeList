import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import StoreList from '../pages/store_list';
import SearchResult from '../pages/search_result';


const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={StoreList} />
      <Route exact path="/search/result" component={SearchResult} />
    </Switch>
  </HashRouter>
);

export default BasicRoute;