import React from 'react'
import { NavLink } from "react-router-dom";
import { Menu, Dropdown } from 'antd';
import { UserOutlined, CaretDownOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { removeToken } from 'api/token';
import { getLoginName } from 'utils/storage';
import './style.css';

interface States {
    collapsed: boolean
}

interface Props {
    changeCollapse: (value: boolean) => void
}

class Header extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            this.props.changeCollapse(this.state.collapsed)
        });
    }
    render() {
        const handleMenuClick = (value: any) => {
            // console.log('value==', value)
            const { key } = value;
            if (key === 'layout') {
                removeToken()
            }
        }

        const menu = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="modify"><NavLink to="/modify">修改密码</NavLink></Menu.Item>
                <Menu.Item key="layout"><NavLink to="/login">退出登录</NavLink></Menu.Item>
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

export default Header 