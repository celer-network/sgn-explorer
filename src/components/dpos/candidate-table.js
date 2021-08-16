import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { routerRedux } from 'dva/router';
import { Table, Button } from 'antd';
import web3 from 'web3';

import { CANDIDATE_STATUS } from '../../utils/dpos';
import { formatCelrValue } from '../../utils/unit';
import { RATE_BASE } from '../../utils/constant';
import { getSimple } from '../../utils/utils';

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
    width: 200,
    // sorter: (a, b) => a.address - b.address,
    render: (text) => getSimple(text)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 200,
    // filters: _.map(CANDIDATE_STATUS, (text, index) => ({
    //   text,
    //   value: index.toString()
    // })),
    // filterMultiple: false,
    // onFilter: (value, record) => record.status === value,
    // sorter: (a, b) => a.status - b.status,
    render: (text) => CANDIDATE_STATUS[text]
  },
  {
    title: 'Staking Pool',
    dataIndex: 'stakingPool',
    width: 300,
    defaultSortOrder: 'descend',
    sorter: (a, b) => {
      return web3.utils.toBN(a.stakingPool).cmp(web3.utils.toBN(b.stakingPool));
    },
    render: (text) => formatCelrValue(text)
  },
  {
    title: 'Commission',
    dataIndex: 'commissionRate',
    sorter: (a, b) => a.commissionRate - b.commissionRate,
    render: (text) => `${text / RATE_BASE} %`
  },
  {
    title: ' ',
    dataIndex: 'delegate',
    width: 100,
    render: (text) => <Button style={{textAlign: "right"}}>Delegate</Button>
  }
];

class CandidateTable extends React.Component {
  onRow = (record) => {
    const { dispatch } = this.props;

    return {
      onClick: () => {
        dispatch(
          routerRedux.push({
            pathname: `/candidate/${record.address}`
          })
        );
      }
    };
  };

  render() {
    const { candidates } = this.props;
    const dataSource = candidates.map((candidate) => ({
      ...candidate.value,
      address: candidate.args[0]
    }));

    return (
      <Table dataSource={dataSource} columns={columns} pagination={false} onRow={this.onRow} />
    );
  }
}

CandidateTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidates: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {};
}

export default drizzleConnect(CandidateTable, mapStateToProps);
