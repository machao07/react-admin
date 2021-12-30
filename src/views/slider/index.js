import React from 'react'
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import menuList from './menu'
import { createFromIconfontCN } from '@ant-design/icons';

const { SubMenu } = Menu;
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_2370456_9g9eu6j06v.js',
    ],
});
class Slider extends React.Component {
    constructor(props) {
        super(props);
        console.log('props=====', props)
        this.state = {
            openKeys: [],
            selectedKeys: []
        }
    }
    componentDidMount() {
        // console.log(this.props)
        const { pathname } = this.props.location

        if (pathname) {
            this.setState({
                selectedKeys: this.props.location.pathname
            })
        }
    }

    // 一级菜单
    renderMenuItem = ({ key, icon, title }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}>
                    {icon && <IconFont type={icon} />}
                    <span>{title}</span>
                </Link>
            </Menu.Item>
        )
    }

    // 二级菜单
    renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <SubMenu key={key} title={<span>{icon && <IconFont type={icon} />}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </SubMenu>
        )
    }

    handleMenu = (e) => {
        this.setState({ selectedKeys: [e.key] })
        // console.log('menu======', e)
    }

    onOpenChange = (openKeys) => {
        // console.log('change=====', openKeys)
        if (openKeys.length === 0 || openKeys.length === 1) {
            this.setState({
                openKeys
            })
            return
        }

        //最新展开的菜单
        const latestOpenKey = openKeys[openKeys.length - 1]
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({ openKeys })
        } else {
            this.setState({
                openKeys: [latestOpenKey]
            })
        }
    }

    render() {
        const { openKeys, selectedKeys } = this.state;
        const defaultProps = this.props.collapsed ? {} : { openKeys };  // 代替openKeys 解决切换菜单时二级菜单收缩时不跟随问题
        return (
            <div>
                {/* <p style={{color: '#fff'}}>{openKeys} - {selectedKeys}</p> */}

                {
                    this.props.collapsed ?
                        <div className='logoSmall'>LOGO</div> :
                        <div className="logo">
                            <p>重构项目LOGO</p>
                            {/* <img src={require('../../assets/logo_left.png')} alt="" /> */}
                        </div>
                }

                <Menu
                    {...defaultProps}
                    onClick={this.handleMenu}
                    onOpenChange={this.onOpenChange}
                    // openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    theme={this.props.theme ? this.props.theme : 'light'}
                    mode='inline'
                    inlineCollapsed={this.props.collapsed}
                >
                    {
                        menuList && menuList.map(item => {
                            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                        })
                    }
                </Menu>
            </div>
        );
    }
}

export default withRouter(Slider);