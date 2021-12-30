import React from 'react'
import { Layout } from 'antd';
import Header from 'views/header';
import Slider from 'views/slider';
import ContentMain from 'components/contentMain';

const { Content, Footer, Sider } = Layout;
class App extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: boolean) => {
        this.setState({ collapsed });
    };

    changeCollapse (value: boolean) {
        this.setState({collapsed: value})
    }

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider theme={'light'} style={{ background: '#fff' }} trigger={null} collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <Slider collapsed={collapsed} />
                </Sider>
                <Layout className="site-layout">
                    <Header changeCollapse={this.changeCollapse.bind(this)} />
                    <Content className={collapsed === true ? 'noLeft' : 'left'} style={{ position: 'absolute', top: 70, right: 0, bottom: 0 }}>
                        <ContentMain />
                    </Content>
                    <Footer className={collapsed === true ? 'noLeft footer' : 'left footer'} style={{ position: 'absolute', right: 0, bottom: 0 }}>React and Ant Design ©2021 Created by Machao </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default App;