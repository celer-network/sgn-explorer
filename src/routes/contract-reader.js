import React from 'react';
import PropTypes from 'prop-types';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Card, Collapse } from 'antd';

import DelegatorInfo from '../components/contract-reader/delegator-info';
import ParamValue from '../components/contract-reader/param-value';

const { Panel } = Collapse;

class ContractReader extends React.Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
  }

  render() {
    return (
      <Card title="Contract Reader">
        <Collapse defaultActiveKey={['DelegatorInfo']} onChange={console.log}>
          <Panel header="GetDelegatorInfo" key="DelegatorInfo">
            <DelegatorInfo />
          </Panel>
          <Panel header="GetParamValue" key="ParamValue">
            <ParamValue />
          </Panel>
        </Collapse>
      </Card>
    );
  }
}

ContractReader.propTypes = {
  dispatch: PropTypes.func.isRequired
};

ContractReader.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {}

export default drizzleConnect(ContractReader, mapStateToProps);
