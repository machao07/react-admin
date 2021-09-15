import React from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown } from 'antd';
import { UserOutlined, CaretDownOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { removeToken } from 'api/token';
import { getLoginName } from 'utils/storage';
import './style.css';

interface States {
    collapsed: boolean
}

class Header extends React.Component<any, States> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: false
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('nextProps====', nextProps)
    //   console.log('nextState====', nextState)
    //   return nextState.collapsed !== this.state.collapsed
    // }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const handleMenuClick = (value: any) => {
            // console.log('value==', value)
            const { key } = value;
            if (key === 'layout') {
                removeToken()
                this.props.history.push({
                    pathname: 'login'
                })
            }
            if (key === 'modify') {
                this.props.history.push('modify')
            }
        }

        const menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="modify">修改密码</Menu.Item>
                <Menu.Item key="layout">退出登录</Menu.Item>
            </Menu>
        )

        return (
            <div className="header">
                <div className="collapse">
                    {
                        React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })
                    }
                </div>

                <div>
                    <Dropdown overlay={menu}>
                        <a className="user-name">
                            <UserOutlined className="ft14 mr5" />{getLoginName()}<CaretDownOutlined className="ft14 ml5" />
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);