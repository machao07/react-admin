import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style/common.css';
import './style/reset.css';
import MRoute from './router/index'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
// import App from './App';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <MRoute />
  </ConfigProvider>,
  document.getElementById('root')
);
