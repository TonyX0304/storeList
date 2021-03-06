import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd-mobile/dist/antd-mobile.css';
import Router from './router/index';
import * as serviceWorker from './serviceWorker';

const render = Component => {
  ReactDOM.render(
    <Component />, 
    document.getElementById('root')
  )
}

render(Router)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
