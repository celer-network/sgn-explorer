import React from 'react';
import PropTypes from 'prop-types';
import web3 from 'web3';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Modal, Spin, Button, InputNumber, Row,Col, Statistic, Form } from 'antd';

// import Form from '../form';
import { celrFieldOptions } from '../../utils/form';
class DelegateForm extends React.Component {
  constructor(props, context) {
    super(props);

    this.form = React.createRef();
    this.contracts = context.drizzle.contracts;
    this.state = { approving: false };
  }

  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  onSubmit = () => {
    const { CELRToken } = this.props;
    const celerAllowance = _.values(CELRToken.allowance)[0] || {};
    const fieldsValues = this.form.current.getFieldsValue();
    const { stateNum } = fieldsValues;

    if (stateNum > web3.utils.fromWei(celerAllowance.value)) {
      debugger;
      this.contracts.CELRToken.methods
        .approve(
          this.contracts.DPoS.address,
          web3.utils.toWei(Number.MAX_SAFE_INTEGER.toString(), 'ether')
        )
        .send({})
        .on('receipt', (receipt) => {
          debugger;
          this.sendDelegate(stateNum);
        });
      this.setState({
        approving: true
      });
    } else {
      debugger;
      this.sendDelegate(stateNum);
    }
    // debugger;
    // this.form.current.validateFields((err, values) => {
    //   debugger;
    //   if (err) {
    //     return;
    //   }

      // const { value } = values;

      // if (value > web3.utils.fromWei(celerAllowance.value)) {
      //   this.contracts.CELRToken.methods
      //     .approve(
      //       this.contracts.DPoS.address,
      //       web3.utils.toWei(Number.MAX_SAFE_INTEGER.toString(), 'ether')
      //     )
      //     .send({})
      //     .on('receipt', (receipt) => {
      //       this.sendDelegate(value);
      //     });
      //   this.setState({
      //     approving: true
      //   });
      // } else {
      //   this.sendDelegate(value);
      // }
    // });
  };

  sendDelegate = (value) => {
    debugger;
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

  onFinish1 = (values) => {
    console.log('Received values of form:', values);
    const { CELRToken } = this.props;
    const celerAllowance = _.values(CELRToken.allowance)[0] || {};
    // const fieldsValues = this.form.current.getFieldsValue();
    const { stateNum } = values;

    if (stateNum > web3.utils.fromWei(celerAllowance.value)) {
      debugger;
      this.contracts.CELRToken.methods
        .approve(
          this.contracts.DPoS.address,
          web3.utils.toWei(Number.MAX_SAFE_INTEGER.toString(), 'ether')
        )
        .send({})
        .on('receipt', (receipt) => {
          this.sendDelegate(stateNum);
        });
      this.setState({
        approving: true
      });
    } else {
      debugger;
      this.sendDelegate(stateNum);
    }
  }

  render() {
    const { visible, onClose, accountBalances, account } = this.props;
    const maxValue = accountBalances[account];
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
      <Modal
        title="Delegate"
        visible={visible}
        width="25rem"
        onCancel={(e) => {onClose(); e.stopPropagation();}}
        footer={null}
      >
        <div>10%Commission</div>
        <Spin spinning={this.state.approving} tip="Approving CELR token...">
          <Form ref={this.form} onFinish={this.onFinish1}>
            <Form.Item name="stateNum" rules={[{ required: true }]}>
              <InputNumber />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="MIN Stake Amount" value={1} />
              </Col>
              <Col span={12}>
                <Statistic title="Available Amount" value={maxValue} />
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Spin>
        {/* <div>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="MIN Stake Amount" value={1} />
          </Col>
          <Col span={12}>
            <Statistic title="Available Amount" value={maxValue} />
          </Col>
        </Row>
        </div> */}
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
  const { contracts, accountBalances, accounts } = state;

  return {
    CELRToken: contracts.CELRToken,
    accountBalances,
    account: accounts[0],
  };
}

export default drizzleConnect(DelegateForm, mapStateToProps);
