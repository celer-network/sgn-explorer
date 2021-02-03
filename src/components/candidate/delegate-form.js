import React from 'react';
import PropTypes from 'prop-types';
import web3 from 'web3';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Modal, Spin } from 'antd';

import Form from '../form';
import { celrFieldOptions } from '../../utils/form';

class DelegateForm extends React.Component {
  constructor(props, context) {
    super(props);

    this.form = React.createRef();
    this.contracts = context.drizzle.contracts;
    this.state = { approving: false };
  }

  onSubmit = () => {
    const { CELRToken } = this.props;
    const celerAllowance = _.values(CELRToken.allowance)[0] || {};
    this.form.current.validateFields((err, values) => {
      if (err) {
        return;
      }

      const { value } = values;

      if (value > web3.utils.fromWei(celerAllowance.value)) {
        this.contracts.CELRToken.methods
          .approve(
            this.contracts.DPoS.address,
            web3.utils.toWei(Number.MAX_SAFE_INTEGER.toString(), 'ether')
          )
          .send({})
          .on('receipt', (receipt) => {
            this.sendDelegate(value);
          });
        this.setState({
          approving: true
        });
      } else {
        this.sendDelegate(value);
      }
    });
  };

  sendDelegate = (value) => {
    const { onClose, candidateId } = this.props;

    this.contracts.DPoS.methods.delegate.cacheSend(
      candidateId,
      web3.utils.toWei(value.toString(), 'ether')
    );

    this.setState({
      approving: false
    });
    onClose();
  };

  render() {
    const { visible, onClose } = this.props;
    const formItems = [
      {
        name: 'value',
        field: 'number',
        fieldOptions: {
          ...celrFieldOptions,
          placeholder: 'The amount of CELR to delegate'
        },
        rules: [
          {
            message: 'Please enter a value!',
            required: true
          }
        ]
      }
    ];

    return (
      <Modal title="Delegate Stake" visible={visible} onOk={this.onSubmit} onCancel={onClose}>
        <Spin spinning={this.state.approving} tip="Approving CELR token...">
          <Form ref={this.form} items={formItems} />
        </Spin>
      </Modal>
    );
  }
}

DelegateForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

DelegateForm.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {
  const { contracts } = state;

  return {
    CELRToken: contracts.CELRToken
  };
}

export default drizzleConnect(DelegateForm, mapStateToProps);
