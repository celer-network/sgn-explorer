import React from 'react';
import PropTypes from 'prop-types';
import { Descriptions } from 'antd';

import Form from '../form';
import { PARAM_NAMES } from '../../utils/dpos';

class ParamValue extends React.Component {
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

      const { param } = values;

      this.contracts.DPoS.methods.getUIntValue(param).call((err, value) => {
        this.setState({
          value
        });
      });
    });
  };

  renderResult() {
    const { value } = this.state;

    if (!value) {
      return;
    }

    return (
      <>
        <Descriptions title="Result">
          <Descriptions.Item label="Value">{value}</Descriptions.Item>
        </Descriptions>
      </>
    );
  }

  render() {
    const recordOptions = PARAM_NAMES.map((param, index) => [index, param]);

    const formItems = [
      {
        name: 'param',
        label: 'Param Name',
        field: 'select',
        fieldOptions: {
          options: recordOptions,
          placeholder: 'The parameter record'
        },

        rules: [
          {
            message: 'Please select Param Name!',
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

ParamValue.propTypes = {};

ParamValue.contextTypes = {
  drizzle: PropTypes.object
};

export default ParamValue;
