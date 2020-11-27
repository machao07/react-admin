import React from 'react'
import { Layout } from 'antd'
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './views/header'
import Slider from './views/slider'

import Home from './views/home'
import Promotion from './views/order_Manage/promotion'

const { Content, Footer, Sider } = Layout;
class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render(){
    const { collapsed } = this.state;
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Slider/>
          </Sider>
          <Layout className="site-layout">
            <Header />
            <Content className="site-layout-background" style={{ padding: 10, height: '100%', overflowY: 'scroll' }}>
              <Switch>
                <Route exact path="/home" component={ Home } />
                <Route path='/promotion' component={ Promotion }/>
              </Switch>
            </Content>
            <Footer className="tc">Ant Design ©2020 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    )
  }
}

export default App