import React from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Row, Col, message, Table } from 'antd';
import axios from 'axios';
import web3 from 'web3';

import { formatCelrValue } from '../../utils/unit';

const columns = [
  {
    title: 'address',
    dataIndex: 'delegatorAddr'
  },
  {
    title: 'Delegated Stake',
    dataIndex: 'delegatedStake',
    sorter: (a, b) => {
      return web3.utils.toBN(a.delegatedStake).cmp(web3.utils.toBN(b.delegatedStake));
    },
    sortOrder: 'descend',
    render: (text) => {
      return formatCelrValue(text);
    }
  }
];

class DelegatorTable extends React.Component {
  constructor(props, context) {
    super(props);

    const {
      candidateId,
      network: { setting }
    } = props;
    this.state = {};

    axios
      .get(`${setting.gateway}/validator/candidate-delegators/${candidateId}`)
      .then((res) => {
        const delegators = res.data.result.map((delegator) => ({
          candidateAddr: delegator.candidate_addr,
          delegatedStake: delegator.delegated_stake,
          delegatorAddr: delegator.delegator_addr
        }));
        this.setState({
          delegators
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

  render() {
    const { delegators } = this.state;
    return (
      <Row>
        <Col span={24}>
          <Table dataSource={delegators} columns={columns} pagination={false} />
        </Col>
      </Row>
    );
  }
}

DelegatorTable.propTypes = {};

DelegatorTable.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {
  const { network } = state;

  return {
    network
  };
}

export default drizzleConnect(DelegatorTable, mapStateToProps);
