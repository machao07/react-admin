import React from 'react'
import { Layout } from 'antd'
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from './views/header'
import Slider from './views/slider'

import Home from './views/home'
import Modify from './views/modify_password'
import Promotion from './views/order_Manage/promotion.tsx'

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
            <Slider/>
          </Sider>
          <Layout className="site-layout">
            <Header />
            <Content className={collapsed == true ? 'noLeft' : 'left'} style={{ position: 'absolute',top: 70,right: 0,bottom: 0 }}>
              <div className="content">
                <Switch>
                  <Route exact path="/home" component={ Home } />
                  <Route exact path="/modify" component={ Modify } />
                  <Route path='/promotion' component={ Promotion }/>
                </Switch>
              </div>
              <Switch>
                <Route exact path="/home" component={ Home } />
                <Route exact path="/modify" component={ Modify } />
                <Route path='/promotion' component={ Promotion }/>
              </Switch>
            </Content>
            <Footer className="tc">React and Ant Design ©2020 Created by Machao </Footer>
          </Layout>
        </Layout>
    )
  }
}

export default App