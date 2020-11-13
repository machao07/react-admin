import React from 'react'
import { Menu } from 'antd';
import { HashRouter, Link } from 'react-router-dom'
import menuList from './menu'
import { createFromIconfontCN } from '@ant-design/icons';

// const history = require('history').createBrowserHistory();
const { SubMenu } = Menu;
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2196242_dq7mz11miut.js', // icon-home  icon-gouwucheman
  ],
});
class Slider extends React.Component {
  render() {
    return (
      <HashRouter>
        <Menu theme="dark" defaultOpenKeys={['home']} defaultSelectedKeys={['home']} mode="inline">
          {
            menuList.map((item)=>{
              if(item.subs){
                return (
                  <SubMenu key={item.index} title={item.name} icon={<IconFont type={item.icon} />}>
                    {
                      item.subs.map((subItem) => {
                        return (
                          <Menu.Item key={subItem.index}>
                            <Link to={subItem.path}>{subItem.name}</Link>
                          </Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              }else{
                return (
                  <Menu.Item key={item.index} icon={<IconFont type={item.icon} />}>
                    <Link to={item.path}>{item.name}</Link>
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </HashRouter>
    );
  }
}

export default Slider