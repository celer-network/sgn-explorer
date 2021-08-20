import * as React from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from '@drizzle/react-plugin';
import { withRouter, Link } from 'dva/router';
import { Layout, Menu, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

import Setting from './components/setting';
import { subscribeEvent, subscribeChainInfo } from './utils/subscribe';
import { getNetworkConfig } from './utils/network';

import Header from "./components/header";

import './App.css';

const { Sider, Content, Footer } = Layout;

class App extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = { showSetting: false };
    this.contracts = context.drizzle.contracts;
    this.web3 = context.drizzle.web3;
  }

  componentWillMount() {
    const { accounts, dispatch } = this.props;
    subscribeEvent(accounts[0], this.contracts, dispatch);
    subscribeChainInfo(this.web3, dispatch);

    dispatch({
      type: 'network/save',
      payload: getNetworkConfig(this.web3.currentProvider.networkVersion)
    });
  }

  toggleSetting = () => {
    this.setState((prevState) => ({
      showSetting: !prevState.showSetting
    }));
  };

  render() {
    const { showSetting } = this.state;
    const { children, location, accounts } = this.props;
    const { pathname } = location;

    return (
      <Layout>
        <Header location={location} accounts={accounts}/>
        {/* <Sider width={220}>
          <Menu theme="dark" mode="inline" selectedKeys={[pathname.slice(1)]}>
            <Menu.Item key="dpos">
              <Link to="/dpos">Validators</Link>
            </Menu.Item>
            <Menu.Item key="reward">
              <Link to="/reward">Reward</Link>
            </Menu.Item>
            <Menu.Item key="contract-reader">
              <Link to="/contract-reader">Contract Reader</Link>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://github.com/celer-network/sgn-networks/blob/master/docs/delegator.md"
                target="_blank"
              >
                <LinkOutlined />
                Delegator Instructions
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://github.com/celer-network/sgn-networks" target="_blank">
                <LinkOutlined />
                Network Configurations
              </a>
            </Menu.Item>
            <Menu.Item>
              <a href="https://discord.gg/jAehyvryHe" target="_blank">
                <LinkOutlined />
                Community Support
              </a>
            </Menu.Item>
            <div className="setting">
              <Button type="primary" icon="setting" title="Setting" onClick={this.toggleSetting} />
              <Setting visible={showSetting} onClose={this.toggleSetting} />
            </div>
          </Menu>
        </Sider> */}
        {/* <Layout> */}
        <Content style={{ margin: "0 3.5rem" }}>{children}</Content>
          {/* <Footer style={{ textAlign: 'center' }}>SGN © 2019-2020 Celer Network</Footer> */}
        {/* </Layout> */}
      </Layout>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
};

App.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {
  const { accounts, contracts } = state;

  return {
    accounts,
    CELRToken: contracts.CELRToken
  };
}

export default withRouter(drizzleConnect(App, mapStateToProps));
