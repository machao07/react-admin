import React from 'react'
import { Menu, Dropdown } from 'antd';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
const menu = (
  <Menu>
    <Menu.Item>修改密码</Menu.Item>
    <Menu.Item>退出登录</Menu.Item>
  </Menu>
)

class Header extends React.Component {
  render(){
    return (
      <div className="header">
        <div className="logo">
          <img src={require('../../assets/logo_left.png')} alt=""/>
        </div>

        <div>
          <Dropdown overlay={menu}>
            <a className="user-name">
              <UserOutlined className="ft14 mr5"/>18645548332<CaretDownOutlined className="ft14 ml5"/>
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header