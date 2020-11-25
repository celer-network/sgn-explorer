import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Descriptions, Table } from 'antd';

import Form from '../form';

const columns = [
  {
    title: 'Intent Withdraw Amount',
    dataIndex: 'intentAmount'
  },
  {
    title: 'Intent Withdraw Block Height',
    dataIndex: 'intentProposedTime'
  }
];

class DelegatorInfo extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {};
    this.form = React.createRef();
    this.contracts = context.drizzle.contracts;
  }

  handleQuery = () => {
    this.form.current.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }

      const { candidateAddr, delegatorAddr } = values;

      this.contracts.DPoS.methods
        .getDelegatorInfo(candidateAddr, delegatorAddr)
        .call((err, delegator) => {
          this.setState({
            delegator
          });
        });
    });
  };

  renderResult() {
    const { delegator } = this.state;

    if (!delegator) {
      return;
    }

    const { delegatedStake, undelegatingStake, intentAmounts, intentProposedTimes } = delegator;
    const dataSource = _.zip(intentAmounts, intentProposedTimes).map(
      ([intentAmount, intentProposedTime]) => ({
        intentAmount,
        intentProposedTime
      })
    );

    return (
      <>
        <Descriptions title="Result">
          <Descriptions.Item label="Delegated Stake">{delegatedStake}</Descriptions.Item>
          <Descriptions.Item label="Undelegating Stake">{undelegatingStake}</Descriptions.Item>
        </Descriptions>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </>
    );
  }

  render() {
    const formItems = [
      {
        name: 'candidateAddr',
        label: 'Candidate Address',
        fieldOptions: {
          placeholder: 'Candidate Address'
        },
        rules: [
          {
            message: 'Please enter Candidate Address!',
            required: true
          }
        ]
      },
      {
        name: 'delegatorAddr',
        label: 'Delegator Address',
        fieldOptions: {
          placeholder: 'Delegator Address'
        },
        rules: [
          {
            message: 'Please enter Delegator Address!',
            required: true
          }
        ]
      }
    ];

    return (
      <div>
        <Form ref={this.form} items={formItems} submitText="Query" onSubmit={this.handleQuery} />
        {this.renderResult()}
      </div>
    );
  }
}

DelegatorInfo.propTypes = {};

DelegatorInfo.contextTypes = {
  drizzle: PropTypes.object
};

export default DelegatorInfo;
