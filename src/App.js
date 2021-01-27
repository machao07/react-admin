import React from 'react'
import { Layout } from 'antd'
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './views/header'
import Slider from './views/slider'
import ContentMain from './component/contentMain'


const { Content, Footer, Sider } = Layout;
class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render(){
    const { collapsed } = this.state;
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Slider collapsed={collapsed} />
          </Sider>
          <Layout className="site-layout">
            <Header />
            <Content className={collapsed == true ? 'noLeft' : 'left'} style={{ position: 'absolute',top: 70,right: 0,bottom: 0 }}>
              <ContentMain/>
            </Content>
            <Footer className="tc" style={{ position: 'realitive',bottom: 10 }}>React and Ant Design ©2020 Created by Machao </Footer>
          </Layout>
        </Layout>
    )
  }
}

export default App