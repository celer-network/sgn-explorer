import React from 'react';
import PropTypes from 'prop-types';
import web3 from 'web3';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Modal, Spin, Form, InputNumber, Button, Row, Col, Statistic } from 'antd';
import { celrFieldOptions } from '../../utils/form';
import { formatCelrValue } from '../../utils/unit';

class WithdrawForm extends React.Component {
    constructor(props, context) {
      super(props);
  
      this.formRef = React.createRef();
      this.contracts = context.drizzle.contracts;
      this.state = { approving: false };
    }
  
    onFinish = (value) => {
        const { onClose, candidate } = this.props;
        const candidateAddr = candidate.args[0];
        const { stateNum } = value;

        if (candidate.value.status === '0') {
            this.contracts.DPoS.methods.withdrawFromUnbondedCandidate.cacheSend(
                candidateAddr,
                web3.utils.toWei(stateNum.toString(), 'ether')
            );
        } else {
            this.contracts.DPoS.methods.intendWithdraw.cacheSend(
                candidateAddr,
                web3.utils.toWei(stateNum.toString(), 'ether')
            );
        }
        onClose();
    }
  
    setMax = () => {
      const { accountBalances, account } = this.props;
      const maxValue = accountBalances[account];
      this.formRef.current.setFieldsValue({stateNum: maxValue});
    }
  
    render() {
      const { visible, onClose, accountBalances, account } = this.props;
      const maxValue = accountBalances[account];
      // const maxValue = "200000000000000000000";
      console.log(maxValue, web3.utils.toWei(maxValue.toString(), 'ether'))
  
      return (
        <Modal title="Delegate" className="delegate-form" width="25rem" visible={visible} onCancel={onClose} footer={null}>
          <Spin spinning={this.state.approving} tip="Approving CELR token...">
            <Form ref={this.formRef} onFinish={this.onFinish} initialValues={{stateNum: 1}}>
              <div className="btn-group">
                <Form.Item name="stateNum" rules={[{
                  message: 'Please enter a value!',
                  required: true
                }]}>
                  <InputNumber {...celrFieldOptions}/>
                </Form.Item>
                <Button block onClick={this.setMax}>
                  max
                </Button>
              </div>
              <Row gutter={16} className="delegate-info">
                <Col span={12}>
                  <Statistic title="MIN Stake Amount" value={1} />
                </Col>
                <Col span={12}>
                  <Statistic title="Available Amount" value={formatCelrValue(maxValue)} />
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" block style={{backgroundColor: "#2ED57B", color: "#000000", border: "1px solid #0AAD55", height: "3.625rem", fontSize:"1.125rem", borderRadius:"0.6rem", marginTop: "1.5rem"}}>
                  Delegate
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      );
    }
  }

WithdrawForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

WithdrawForm.contextTypes = {
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
export default drizzleConnect(WithdrawForm, mapStateToProps);
