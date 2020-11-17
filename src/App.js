import React from 'react'
import { Layout } from 'antd'
import { HashRouter, Route, Redirect } from 'react-router-dom';

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
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Slider/>
          </Sider>
          <Layout className="site-layout">
            <Header />
            <Content>
              <div className="site-layout-background" style={{ padding: 18, minHeight: 360 }}>
                  <Redirect to="/home" component={ Home } />
                  <Route exact path='/home' component={ Home }/> 
                  <Route path='/promotion' component={ Promotion }/>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
}

export default App