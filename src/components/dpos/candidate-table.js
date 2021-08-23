import React, { useState } from 'react';
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

import DelegateForm from '../candidate/delegate-form';

const DelegateModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {candidateId} = props;

  const showModal = (event) => {
    setIsModalVisible(true);
    event.stopPropagation();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Delegate
      </Button>
      <DelegateForm
        candidateId={candidateId}
        visible={isModalVisible}
        onClose={handleCancel}
      />
    </>
  )
}

class CandidateTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { candidates, accountBalances, dispatch } = this.props;
    const columns = [
      {
        title: 'Address',
        dataIndex: 'address',
        width: 200,
        render: (text) => (
          <div onClick={() => {
            dispatch(
              routerRedux.push({
                pathname: `/candidate/${text}`
              })
            );
          }}>{getSimple(text)}</div>
        )
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 200,
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
        render: (text) => <DelegateModal candidateId={text} accountBalances={accountBalances}/>
      }
    ];
    const dataSource = candidates.map((candidate) => ({
      ...candidate.value,
      address: candidate.args[0],
      candidateId: candidate.args[0],
    }));

    return (
      <Table dataSource={dataSource} columns={columns} pagination={false}/>
    );
  }
}

CandidateTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  candidates: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const { accountBalances, } = state;
  return {
    accountBalances,
  };
}

export default drizzleConnect(CandidateTable, mapStateToProps);
