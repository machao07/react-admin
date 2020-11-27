import React from 'react'
import { HashRouter } from 'react-router-dom'
import './style.css'
import { Menu, Dropdown } from 'antd';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import { removeToken } from '../../api/token'
import { getLoginName } from '../../utils/storage'
const router = new HashRouter()

const handleMenuClick = ({key}) => {
  if(key === 'layout'){
    removeToken()
    window.location.hash = '#login'
  }
  if(key === 'modify'){
    window.location.hash = '#modify'
  }
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="modify">修改密码</Menu.Item>
    <Menu.Item key="layout">退出登录</Menu.Item>
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
              <UserOutlined className="ft14 mr5"/>{getLoginName()}<CaretDownOutlined className="ft14 ml5"/>
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header