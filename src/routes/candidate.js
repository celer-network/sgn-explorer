import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import bech32 from 'bech32';
import web3 from 'web3';
import axios from 'axios';
import { Button, Card, Skeleton, Statistic, Row, Col, Tabs, message } from 'antd';

import DelegateForm from '../components/candidate/delegate-form';
import WithdrawForm from '../components/candidate/withdraw-form';
import CommissionForm from '../components/candidate/commission-form';
import DelegatorTable from '../components/candidate/delegator-table';
import SlashTable from '../components/candidate/slash-table';
import { formatCelrValue } from '../utils/unit';
import { CANDIDATE_STATUS } from '../utils/dpos';
import { RATE_BASE } from '../utils/constant';

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
    const undelegatingStake = (delegatorInfo && delegatorInfo.value.undelegatingStake) || '0';

    const isOwner = accounts[0] === candidate.args[0];

    return (
      <div>
        <Button type="primary" onClick={this.toggleDelegateModal}>
          Delegate
        </Button>
        {status === '0' ? (
          <Button type="primary" onClick={this.toggleWithdrawModal}>
            Withdraw
          </Button>
        ) : (
          [
            <Button type="primary" onClick={this.toggleWithdrawModal}>
              Initialize Withdraw
            </Button>,
            <Button
              type="primary"
              onClick={this.confirmWithdraw}
              disabled={undelegatingStake === '0'}
            >
              Confirm Withdraw
            </Button>
          ]
        )}
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
      </div>
    );
  };

  renderCandidateDetail = () => {
    const { SGN } = this.props;
    const { candidate, slashes, description = {} } = this.state;
    const candidateId = candidate.args[0];
    const { minSelfStake, stakingPool, status, commissionRate, rateLockEndTime } = candidate.value;
    const sidechainHexAddr = _.chain(SGN.sidechainAddrMap)
      .find((data) => data.args[0] === candidateId)
      .get('value', '')
      .value();
    const sidechainAddr =
      sidechainHexAddr &&
      bech32.encode('sgn', bech32.toWords(web3.utils.hexToBytes(sidechainHexAddr)));

    return (
      <Row style={{ marginTop: '10px' }}>
        <Col span={12}>
          <Statistic title="Address" value={candidateId} />
        </Col>
        <Col span={12}>
          <Statistic title="Status" value={CANDIDATE_STATUS[status]} />
        </Col>
        <Col span={12}>
          <Statistic title="Min Self Stake" value={formatCelrValue(minSelfStake)} />
        </Col>
        <Col span={12}>
          <Statistic title="Staking Pool" value={formatCelrValue(stakingPool)} />
        </Col>
        <Col span={12}>
          <Statistic title="Commission Rate" value={`${commissionRate / RATE_BASE} %`} />
        </Col>
        <Col span={12}>
          <Statistic title="Rate Lock End Time" value={`${rateLockEndTime} block height`} />
        </Col>
        <Col span={12}>
          <Statistic title="Website" value={description.website || 'N/A'} />
        </Col>
        <Col span={12}>
          <Statistic title="Contact" value={description.security_contact || 'N/A'} />
        </Col>
        <Col span={12}>
          <Statistic title="Sidechain Address" value={sidechainAddr} />
        </Col>
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
    );
  };

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
      <Card title="Candidate" extra={this.renderAction()}>
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
