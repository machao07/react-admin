import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import './style/common.css';
import './style/reset.css';
import MRoute from './router/index'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <MRoute />
    </ConfigProvider>,
    document.getElementById('root')
);
