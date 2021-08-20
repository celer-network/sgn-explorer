import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Skeleton, Card, Statistic, Row, Col, Button, message, List } from 'antd';
import axios from 'axios';
import { ArrowDownOutlined } from '@ant-design/icons';

import { formatCelrValue } from '../utils/unit';

const INIT_ACTION = 'init';
const WAIT_ACTION = 'wait';
const REDEEM_ACTION = 'redeem';

const data = [
  {
    id: '001',
    yourStake: "200,003,554.96 CELR",
    unbondedStake: "--",
    withdrawable: "--",
  },
  {
    id: '002',
    yourStake: "100,003,554.96 CELR",
    unbondedStake: "100 CELR",
    withdrawable: "--",
  },
  {
    id: '003',
    yourStake: "300,003,554.96 CELR",
    unbondedStake: "--",
    withdrawable: "80 CELR",
  },
  {
    id: '004',
    yourStake: "400,003,554.96 CELR",
    unbondedStake: "--",
    withdrawable: "--",
  },
  {
    id: '005',
    yourStake: "500,003,554.96 CELR",
    unbondedStake: "--",
    withdrawable: "--",
  },
]

class Reward extends React.Component {
  constructor(props, context) {
    super(props);

    const {
      accounts,
      network: { setting }
    } = props;
    this.currentUser = accounts[0];
    this.contracts = context.drizzle.contracts;
    this.state = {
      action: INIT_ACTION
    };

    this.contracts.SGN.methods.redeemedServiceReward.cacheCall(this.currentUser);
    this.contracts.DPoS.methods.redeemedMiningReward.cacheCall(this.currentUser);

    this.gateway = axios.create({
      baseURL: setting.gateway,
      timeout: 1000
    });

    this.gateway
      .get(`/validator/reward/${this.currentUser}`)
      .then((res) => {
        const { result } = res.data;
        this.setState({
          miningReward: result.mining_reward,
          serviceReward: result.service_reward
        });
      })
      .catch((err) => {
        console.error(err);

        if (err.response) {
          message.error(err.response.data.error);
          return;
        }

        message.warning('Please config gateway url in setting to load sgn reward correctly');
      });
  }

  intendWithdraw = () => {
    this.gateway
      .post('/validator/withdrawReward', {
        eth_addr: this.currentUser
      })
      .then(() => {
        message.success('Success! Please wait a few seconds to trigger redeem.');
        this.waitSigs();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  waitSigs = () => {
    this.setState({
      action: WAIT_ACTION,
      waitTime: 30
    });

    this.interval = setInterval(() => {
      const { waitTime } = this.state;

      if (waitTime === 0) {
        this.setState({
          action: REDEEM_ACTION
        });
        clearInterval(this.interval);
        return;
      }
      this.setState({
        waitTime: waitTime - 1
      });
    }, 1000);
  };

  redeemReward = () => {
    this.gateway
      .get(`/validator/rewardRequest/${this.currentUser}`)
      .then((res) => {
        const { result } = res.data;
        const { DPoS, SGN } = this.props;
        const { redeemedMiningReward } = DPoS;
        const { redeemedServiceReward } = SGN;

        if (
          result.mining_reward === _.values(redeemedMiningReward)[0].value &&
          result.service_reward === _.values(redeemedServiceReward)[0].value
        ) {
          message.warn('You do not have more reward to redeem.');
          return;
        }

        this.contracts.SGN.methods.redeemReward.cacheSend('0x' + result.reward_request_proto_bytes);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  renderActions = () => {
    const { action, waitTime } = this.state;
    switch (action) {
      case INIT_ACTION:
        return [
          <Button type="primary" onClick={this.intendWithdraw}>
            Initialize Redeem
          </Button>
        ];
      case WAIT_ACTION:
        return [<Button disabled>Collecting signatures. {waitTime} seconds left</Button>];
      case REDEEM_ACTION:
        return [
          <Button type="primary" onClick={this.redeemReward}>
            Redeem Reward
          </Button>
        ];
    }
  };

  render() {
    const { DPoS, SGN } = this.props;
    const { miningReward, serviceReward } = this.state;
    const { redeemedMiningReward } = DPoS;
    const { redeemedServiceReward } = SGN;

    if (_.isEmpty(redeemedServiceReward) || _.isEmpty(redeemedMiningReward)) {
      return <Skeleton />;
    }

    return (
      // <Card title="My Reward" style={{borderRadius: "1rem"}} actions={this.renderActions()}></Card>
      <>
        <Card title="My Reward" style={{borderRadius: "1rem"}}>
          <Row style={{ marginTop: '10px', display:"flex", alignItems: "center"  }}>
            <Col span={8}>
              <Statistic
                title="Cumulative Mining Reward"
                value={formatCelrValue(miningReward, true)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Cumulative Service Reward"
                value={formatCelrValue(serviceReward, true)}
              />
            </Col>
            <Col span={4}>
              <Button type="primary" style={{width: "100%", height:"2.8rem", borderRadius: "0.6rem"}}>Unlock to claim</Button>
            </Col>
          </Row>
          <Row style={{ position: "relative",marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #ECEBEE", display:"flex", alignItems: "center" }}>
            <Col span={8}>
              <Statistic
                title="Redeemed Mining Reward"
                value={formatCelrValue(_.values(redeemedMiningReward)[0].value, true)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Redeemed Service Reward"
                value={formatCelrValue(_.values(redeemedServiceReward)[0].value, true)}
              />
            </Col>
            <Col span={4}>
              <Button type="primary" style={{width: "100%", height:"2.8rem", borderRadius: "0.6rem",}}>Claim</Button>
            </Col>
            <ArrowDownOutlined  style={{fontSize: "1rem", padding: "0.2rem", position: "absolute", top: "-0.6rem", right: "8%",backgroundColor: "#ECEBEE", borderRadius: "50%"}}/>
          </Row>
        </Card>
        <Card title="My Delegations" style={{borderRadius: "1rem", marginTop: "1rem"}}>
          <Row gutter={16}>
            {data.map((item) => (
              <Col span={8}>
                <Card style={{borderRadius: "1rem", marginTop: "2rem"}}>
                  <div>Card content</div>
                  <Row type="flex" justify="space-between" style={{marginTop: "0.7rem"}}>
                    <Col span={6} style={{fontSize: "12px", color: "#87828D"}}>yourStake</Col>
                    <Col style={{textAlign: "right", fontSize: "18px"}} span={18}>{item.yourStake}</Col>
                  </Row>
                  <Row type="flex" justify="space-between" style={{marginTop: "0.7rem"}}>
                    <Col span={6} style={{fontSize: "12px", color: "#87828D"}}>Unbonded Stake</Col>
                    <Col style={{textAlign: "right", fontSize: "18px"}} span={6}>{item.unbondedStake}</Col>
                  </Row>
                  <Row type="flex" justify="space-between" style={{marginTop: "0.7rem"}}>
                    <Col span={6} style={{fontSize: "12px", color: "#87828D"}}>Withdrawable</Col>
                    <Col style={{textAlign: "right", fontSize: "18px"}} span={18}>{item.withdrawable}</Col>
                  </Row>
                  <Row type="flex" justify="space-between" style={{marginTop: "1rem"}}>
                    <Col span={6} style={{fontSize: "12px", color: "#87828D"}}>
                      <Button style={{width: "100%", height: "3rem",background: "#2ED57B", borderRadius: "9px", fontWeight: "bold"}}>Stake More</Button>
                    </Col>
                    <Col span={6} style={{fontSize: "12px", color: "#87828D"}}>
                      <Button style={{width: "100%", height: "3rem",background: "#FFFFFF", color:"#FF5656", borderRadius: "9px", border: "1px solid #FF5656", fontWeight: "bold"}}>Unbond</Button>
                    </Col>
                    <Col span={8} style={{fontSize: "12px", color: "#87828D"}}>
                      <Button style={{width: "100%", height: "3rem",background: "#C4C4C4", color: "#909090", borderRadius: "9px", fontWeight: "bold"}}>Withdraw</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </>
    );
  }
}

Reward.propTypes = {
  dispatch: PropTypes.func.isRequired
};

Reward.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {
  const { network, accounts, contracts, DPoS, SGN } = state;

  return {
    network,
    accounts,
    DPoS: { ...DPoS, ...contracts.DPoS },
    SGN: { ...SGN, ...contracts.SGN }
  };
}

export default drizzleConnect(Reward, mapStateToProps);
