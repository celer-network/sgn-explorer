import React from "react";
import { withRouter, Link } from 'dva/router';
import { Layout, Menu, Button } from 'antd';
import "./index.css";
import { getSimple } from "../../utils/utils";

const menuList = [
    {
        name: "All Validators",
        link: "dpos",
    },
    {
        name: "My Rewards",
        link: "reward",
    },
]

const Header = (props) => {
    const { location, accounts} = props;
    const { pathname } = location;
    return (
        <header className="page-header">
            <div className="header-left">
                <div className="icon">SGN</div>
                <Menu theme="light" mode="horizontal" selectedKeys={[pathname.slice(1)]}>
                    {menuList.map((item) => {
                        return <Menu.Item key={item.link}>
                            <Link to={`/${item.link}`}>{item.name}</Link>
                        </Menu.Item>
                    })}
                </Menu>
            </div>
            <div className="header-right">
                {getSimple(accounts[0])}
            </div>
        </header>
    )
}

export default Header;