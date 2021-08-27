import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import MyDelegations from "../components/reward/myDelegations";
import MyReward from '../components/reward/myReward';

class Reward extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { DPoS } = this.props;
    const candidates=_.values(DPoS.getCandidateInfo);

    return (
      <>
        <MyReward />
        <MyDelegations candidates={candidates}/>
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
