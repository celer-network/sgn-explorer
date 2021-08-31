import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Skeleton, Card, Statistic, Row, Col, Button, message } from 'antd';
import axios from 'axios';
import { ArrowDownOutlined } from "@ant-design/icons";
import web3 from 'web3';
import { formatCelrValue } from '../../utils/unit';
import ClaimForm from "./claim-form";
import protobuf from "protobufjs";
import "./myReward.less";

const util = protobuf.util;

const INIT_ACTION = 'init';
const WAIT_ACTION = 'wait';
const REDEEM_ACTION = 'redeem';
const SUCCESS_ACTION = 'suceess';

class MyReward extends React.Component {
    constructor(props, context) {
        super(props);
    
        const {
          accounts,
          network: { setting }
        } = props;
        this.currentUser = accounts[0];
        this.contracts = context.drizzle.contracts;
        this.state = {
          action: INIT_ACTION,
          visible: false
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
            const {reward_proto_bytes} = result;
            protobuf.load("sgn.proto").then((root) => {
                let message=root.lookupType('sgn.Reward');
                const buffer = util.newBuffer(util.base64.length(reward_proto_bytes));
                util.base64.decode(reward_proto_bytes, buffer, 0);
                const cumulativeMiningReward = message.decode(buffer).cumulativeMiningReward;
                const bn_cumulativeMiningReward = web3.utils.toBN(web3.utils.bytesToHex(cumulativeMiningReward));
                const s_cumulativeMiningReward = bn_cumulativeMiningReward.toString();
                const celer_ = formatCelrValue(s_cumulativeMiningReward);
                console.log(celer_);
            }).catch((err) => {
                throw err;
            })
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

    toggleClaimForm = () => {
        const {visible} = this.state;
        this.setState({
            visible: !visible
        })
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
            message.error("Error! Please wait a few seconds to try again.");
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
            this.setState({
                action: SUCCESS_ACTION
            })
        }).catch((err) => {
            message.error('Transaction Reject');
            console.error(err);
        });
    };

    initRewardStatus = () => {
        this.setState({
            action: INIT_ACTION,
            visible: false
        });
    }
    
    render() {
        const { DPoS, SGN } = this.props;
        const { miningReward = "0", serviceReward = "0", action, waitTime, visible } = this.state;
        const { redeemedMiningReward } = DPoS;
        const { redeemedServiceReward } = SGN;
    
        if (_.isEmpty(redeemedServiceReward) || _.isEmpty(redeemedMiningReward)) {
          return <Skeleton />;
        }
        const lockedMiningReward = `${Number(miningReward) - Number(_.values(redeemedMiningReward)[0].value)}`;
          return (
            <Card title="My Reward" className="my-reward">
                <Row style={{marginTop: "10px"}}>
                    <Col span={10}>
                        <Statistic
                        title="Cumulative Mining Reward"
                        value={formatCelrValue(miningReward, true)}
                        />
                    </Col>
                    <Col span={10}>
                        <Statistic
                        title="Locked Mining Reward"
                        value={formatCelrValue(lockedMiningReward, true)}
                        />
                    </Col>
                    <Col span={4}>
                        <Button onClick={this.toggleClaimForm}>
                        Unlock to claim
                        </Button>
                    </Col>
                </Row>
                <Row style={{borderTop: "1px solid #ECEBEE", paddingTop: "40px", marginTop: "40px"}}>
                    <Col span={10}>
                        <Statistic
                        title="Redeemed Mining Reward"
                        value={formatCelrValue(_.values(redeemedMiningReward)[0].value, true)}
                        />
                    </Col>
                    <Col span={10}>
                        <Statistic
                        title="Claimable Mining Reward"
                        value={formatCelrValue(_.values(redeemedServiceReward)[0].value, true)}
                        />
                    </Col>
                    <Col span={4}>
                        <ArrowDownOutlined style={{position: "absolute", top: "-52px", left: "74px", fontSize: "16px", borderRadius: "12px", padding:"4px", background: "#ECEBEE"}}/>
                        <Button disabled={action !== REDEEM_ACTION} onClick={this.toggleClaimForm}>
                        Claim
                        </Button>
                    </Col>
                </Row>
                <ClaimForm
                    visible={visible}
                    reward={formatCelrValue(miningReward, true)}
                    action={action}
                    toggleClaimForm={this.toggleClaimForm}
                    intendWithdraw={this.intendWithdraw}
                    redeemReward={this.redeemReward}
                    initRewardStatus={this.initRewardStatus}
                />
            </Card>
          )
      }
}

MyReward.propTypes = {
    dispatch: PropTypes.func.isRequired
};

MyReward.contextTypes = {
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

export default drizzleConnect(MyReward, mapStateToProps);