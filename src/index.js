import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReduxTest from './views/ReduxTest';
import 'antd/dist/antd.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
/**
 * 主文件入口：
 * React: 默认 React 组件等主要依赖；
 * ReactDOM：DOM 渲染依赖；
 * serviceWorker：服务配置，适用于断网或是第二次加载的更快，做了下缓存；
 * React.StrictMode：严格模式；
 */
ReactDOM.render(
  <ReduxTest />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
