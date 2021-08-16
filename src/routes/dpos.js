import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Card } from 'antd';

import CandidateTable from '../components/dpos/candidate-table';
import CandidateTotal from "../components/dpos/candidate-total";
class DPoS extends React.Component {
  render() {
    const { DPoS } = this.props;
    return (
      <div className="container" style={{
        margin: "0 3.5rem"
      }}>
        <Card title="Network Overview" style={{borderRadius: "1rem"}}> 
          <CandidateTotal candidates={_.values(DPoS.getCandidateInfo)} />
        </Card>
        <Card title="All Validators" extra="Become a Validator" style={{
          marginTop: "1.5rem",
          borderRadius: "1rem"
        }}> 
          <CandidateTable candidates={_.values(DPoS.getCandidateInfo)} />
        </Card>
      </div>
    );
  }
}

DPoS.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {
  const { contracts, DPoS } = state;

  return {
    DPoS: { ...DPoS, ...contracts.DPoS }
  };
}

export default drizzleConnect(DPoS, mapStateToProps);
