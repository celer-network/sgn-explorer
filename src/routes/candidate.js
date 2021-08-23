import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import bech32 from 'bech32';
import web3 from 'web3';
import axios from 'axios';
import { Button, Card, Skeleton, Statistic, Row, Col, Tabs, message, PageHeader } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

import DelegateForm from '../components/candidate/delegate-form';
import WithdrawForm from '../components/candidate/withdraw-form';
import CommissionForm from '../components/candidate/commission-form';
import DelegatorTable from '../components/candidate/delegator-table';
import SlashTable from '../components/candidate/slash-table';
import { formatCelrValue } from '../utils/unit';
import { CANDIDATE_STATUS } from '../utils/dpos';
import { RATE_BASE } from '../utils/constant';
import { getSimple, copyToClip } from "../utils/utils";

import "./candidate.less";

// function jsonp(obj) {
//   var {url, params, callback} = obj;
//   debugger;
//   return new Promise((resolve, reject) => {
//     let script = document.createElement('script');
//     window[callback] = function(data) {
//       resolve(data);
//       document.body.removeChild(script);
//     }
//     params = {...params, callback};
//     let arrs = [];
//     for(let key in params) {
//       arrs.push(`${key}=${params[key]}`)
//     }
//     script.src=`${url}?${arrs.join('&')}`;
//     document.body.appendChild(script);
//   })
// }

class Candidate extends React.Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
    this.state = {
      candidate: null,
      slashes: [],
      isDelegateModalVisible: false,
      isWithdrawModalVisible: false,
      isCommissionModalVisible: false
    };

    const {
      match,
      network: { setting }
    } = props;
    const candidateId = match.params.id;
    this.contracts.SGN.methods.sidechainAddrMap.cacheCall(candidateId);

    this.contracts.DPoS.events.Slash(
      {
        fromBlock: 0,
        filter: { validator: candidateId }
      },
      (err, event) => {
        if (err) {
          return;
        }

        this.setState({
          slashes: [...this.state.slashes, event.returnValues]
        });
      }
    );

    this.contracts.DPoS.methods.getDelegatorInfo.cacheCall(
      candidateId,
      window.ethereum.selectedAddress
    );

    axios
      .get(`${setting.gateway}/validator/candidate/${candidateId}`)
      .then((res) => {
        const { result } = res.data;

        this.setState({
          ...result,
          commissionRate: result.commission_rate,
          stakingPool: result.staking_pool
        });
      })
      .catch((err) => {
        console.error(err);

        if (err.response) {
          message.error(err.response.data.error);
          return;
        }

        message.warning('Please config gateway url in setting to load sidechain info correctly');
      });
  }

  componentDidMount() {
    // window.getData = function(data) {
    //   console.log(data);
    // }
    // jsonp({
    //   url: "https://cbridge-stat.s3.us-west-2.amazonaws.com/mainnet/cbridge-stat.json",
    //   callback: "getData"
    // }).then(() => {
    //   console.log("success")
    // }).catch((e) => {
    //   console.log(e);
    // });
  }

  static getDerivedStateFromProps(props) {
    const { match, DPoS = {} } = props;
    const candidateId = match.params.id;
    const candidates = _.values(DPoS.getCandidateInfo);
    const candidate = _.find(candidates, (candidate) => candidate.args[0] === candidateId);
    const delegators = _.values(DPoS.getDelegatorInfo).filter(
      (delegator) => delegator.args[0] === candidateId
    );

    return { candidate, candidateId, delegators };
  }

  toggleDelegateModal = () => {
    this.setState((prevState) => ({
      isDelegateModalVisible: !prevState.isDelegateModalVisible
    }));
  };

  toggleWithdrawModal = () => {
    this.setState((prevState) => ({
      isWithdrawModalVisible: !prevState.isWithdrawModalVisible
    }));
  };

  toggleCommissionModal = () => {
    this.setState((prevState) => ({
      isCommissionModalVisible: !prevState.isCommissionModalVisible
    }));
  };

  confirmWithdraw = () => {
    const { candidateId } = this.state;

    this.contracts.DPoS.methods.confirmWithdraw.cacheSend(candidateId);
  };

  confirmIncreaseCommissionRate = () => {
    this.contracts.DPoS.methods.confirmIncreaseCommissionRate.cacheSend();
  };

  claimValidator = () => {
    this.contracts.DPoS.methods.claimValidator.cacheSend();
  };

  renderAction = () => {
    const { accounts, DPoS } = this.props;
    const { candidate } = this.state;
    const { status } = candidate.value;

    // TODO: Calculate actual withdraw amount
    const delegatorInfo = _.values(DPoS.getDelegatorInfo)[0];
    const delegatedStake = (delegatorInfo && delegatorInfo.value.delegatedStake) || '0';
    const undelegatingStake = (delegatorInfo && delegatorInfo.value.undelegatingStake) || '0';
    const isOwner = accounts[0] === candidate.args[0];

    return (
      <>
        {delegatedStake !== "0" ? (
          <Button type="primary" className="extra-button btn-stake" onClick={this.toggleDelegateModal}>
            Stake
          </Button>
        ) : ([
          <Button type="primary" className="extra-button btn-stake" onClick={this.toggleDelegateModal}>
            Stake More
          </Button>,
          <Button type="primary" className="extra-button btn-unbond" onClick={this.toggleWithdrawModal}>
            Unbond
          </Button>,
          <Button
            type="primary"
            className="extra-button btn-withdraw" 
            onClick={this.confirmWithdraw}
            disabled={undelegatingStake === '0'}
          >
            withdraw
          </Button>
        ])}
        {isOwner && [
          <Button type="primary" onClick={this.toggleCommissionModal}>
            Announce Increase Commission Rate
          </Button>,
          <Button type="primary" onClick={this.confirmIncreaseCommissionRate}>
            Confirm Increase Commission Rate
          </Button>,
          <Button type="primary" onClick={this.claimValidator}>
            Claim Validator
          </Button>
        ]}
      </>
    );
  };

  renderCandidateDetail = () => {
    const { SGN, DPoS = {} } = this.props;
    const { candidate, slashes, description = {} } = this.state;
    const candidateId = candidate.args[0];
    const { minSelfStake, stakingPool, status, commissionRate, rateLockEndTime } = candidate.value;

    const delegatorInfo = _.values(DPoS.getDelegatorInfo)[0];
    const delegatedStake = (delegatorInfo && delegatorInfo.value.delegatedStake) || '0';
    const undelegatingStake = (delegatorInfo && delegatorInfo.value.undelegatingStake) || '0';
    const WithdrawableStake = '0';

    const sidechainHexAddr = _.chain(SGN.sidechainAddrMap)
      .find((data) => data.args[0] === candidateId)
      .get('value', '')
      .value();
    const sidechainAddr =
      sidechainHexAddr &&
      bech32.encode('sgn', bech32.toWords(web3.utils.hexToBytes(sidechainHexAddr)));

    return (
      <div className="candidateDetail">
        <Row>
          <Col span={6}>
            <Statistic title="Staking Pool" value={formatCelrValue(stakingPool)} />
          </Col>
          <Col span={6}>
            <Statistic title="Your Stake" value={formatCelrValue(delegatedStake)} />
          </Col>
          <Col span={6}>
            <Statistic title="Unbonding Stake" value={formatCelrValue(undelegatingStake)} />
          </Col>
          <Col span={6}>
            <Statistic title="Withdrawable" value={formatCelrValue(WithdrawableStake)} />
          </Col>
        </Row>
        <Row style={{ padding: '24px', borderTop: "1px solid #ECEBEE" }}>
          <Col span={4} onClick={() => copyToClip(candidateId)}>
            <Statistic title="Address" suffix={<CopyOutlined/>} value={getSimple(candidateId, 8, -6)} />
          </Col>
          <Col span={4} onClick={() => copyToClip(sidechainAddr)}>
            <Statistic title="Sidechain Address" suffix={<CopyOutlined/>} value={getSimple(sidechainAddr, 8, -6)} />
          </Col>
          <Col span={4}>
            <Statistic title="Commission Rate" value={`${commissionRate / RATE_BASE} %`} />
          </Col>
          <Col span={4}>
            <Statistic title="Rate Lock End Time" value={`${rateLockEndTime} block height`} />
          </Col>
          <Col span={4}>
            <Statistic title="Contact" value={description.security_contact || 'N/A'} />
          </Col>
          <Col span={4}>
            <Statistic title="Website" value={description.website || 'N/A'} />
          </Col>
        </Row>
      </div>
    );
  };

  renderDelegatorsAndSlashes = () => {
    const { candidate, slashes } = this.state;
    const candidateId = candidate.args[0];
    return (
      <Row style={{ marginTop: '10px' }}>
        <Col span={24}>
          <Tabs>
            <Tabs.TabPane tab="Delegators" key="delegators">
              <DelegatorTable candidateId={candidateId} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Slashes" key="slashes">
              <SlashTable slashes={slashes} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    )
  }

  goBack = () => {
    window.history.go(-1);
  }

  render() {
    const {
      candidate,
      candidateId,
      isDelegateModalVisible,
      isWithdrawModalVisible,
      isCommissionModalVisible
    } = this.state;

    if (!candidate) {
      return <Skeleton />;
    }

    return (
      <>
        <PageHeader title="Back to all validators"  onBack={this.goBack}/>
        <Card title="Candidate" className="candidate-card" extra={this.renderAction()}>
          {this.renderCandidateDetail()}
          <DelegateForm
            candidateId={candidateId}
            visible={isDelegateModalVisible}
            onClose={this.toggleDelegateModal}
          />
          <WithdrawForm
            candidate={candidate}
            visible={isWithdrawModalVisible}
            onClose={this.toggleWithdrawModal}
          />
          <CommissionForm
            candidate={candidate}
            visible={isCommissionModalVisible}
            onClose={this.toggleCommissionModal}
          />
        </Card>
        <Card className="delegators-card">
          {this.renderDelegatorsAndSlashes()}
        </Card>
      </>
    );
  }
}

Candidate.propTypes = {
  dispatch: PropTypes.func.isRequired
};

Candidate.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {
  const { accounts, contracts, network, DPoS, SGN } = state;
  return {
    accounts,
    network,
    DPoS: { ...DPoS, ...contracts.DPoS },
    SGN: { ...SGN, ...contracts.SGN }
  };
}

export default drizzleConnect(Candidate, mapStateToProps);
