import React from 'react';
import PropTypes from 'prop-types';
import web3 from 'web3';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Modal, Spin, Form, InputNumber, Button, Row, Col, Statistic, Avatar, PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { celrFieldOptions } from '../../utils/form';
import { formatCelrValue } from '../../utils/unit';
import { RATE_BASE } from '../../utils/constant';
import {STAKE_TYPE, UNBOND_TYPE, WITHDRAW_TYPE} from "../../constant";
import "./index.less";

class ActionForm extends React.Component {
    constructor(props, context) {
        super(props);
        this.formRef = React.createRef();
        this.contracts = context.drizzle.contracts;
        this.state = { approving: false };
        this.contracts.DPoS.methods.getDelegatorInfo.cacheCall(
            this.props.candidateId,
            window.ethereum.selectedAddress
          );
    }

    renderTitle = () => {
        const { type } = this.props;
        switch(type) {
            case STAKE_TYPE:
                return "Delegate";
            case UNBOND_TYPE:
                return "Unbond";
            case WITHDRAW_TYPE:
                return "Withdraw";
        }
    }

    renderUserInfo = () => {
        const { candidateId, DPoS } = this.props;
        const candidates = _.values(DPoS.getCandidateInfo);
        const candidate = _.find(candidates, (candidate) => candidate.args[0] === candidateId) || {};
        console.log(candidateId, candidate);
        // debugger;
        const { commissionRate } = candidate.value;
        return (
            <div className="form-userInfo">
                <Avatar size={56} icon={<UserOutlined />} />
                <div className="avatar-info">
                    <div>{candidateId}</div>
                    <div>{`${commissionRate / RATE_BASE} %`}</div>
                </div>
            </div>
        )
    }

    renderForm = () => {
        const { accountBalances, account, type } = this.props;
        console.log({accountBalances})
        const maxValue = accountBalances[account];
        console.log({maxValue})
        return (
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
                        {type}
                    </Button>
                    </Form.Item>
                </Form>
            </Spin>
        )
    }

    renderWithdrawDom = () => {
        const delegatorInfo = _.values(this.props.DPoS.getDelegatorInfo)[0];
        const delegatedStake = (delegatorInfo && delegatorInfo.value.delegatedStake) || '0';
        const undelegatingStake = (delegatorInfo && delegatorInfo.value.undelegatingStake) || '0';
        return (
            <div className="claimform-content">
                <div className="unlock-reward">
                    <span>Amount</span>
                    <span>{formatCelrValue(undelegatingStake)}</span>
                </div>
                <Button type="primary" htmlType="submit" block style={{backgroundColor: "#2ED57B", color: "#000000", border: "1px solid #0AAD55", height: "3.625rem", fontSize:"1.125rem", borderRadius:"0.6rem", marginTop: "1.5rem"}}>
                    Withdraw
                </Button>
            </div>
        )
    }

    renderContent = () => {
        const {type} = this.props;
        switch(type){
            case STAKE_TYPE:
            case UNBOND_TYPE:
                return this.renderForm();
            case WITHDRAW_TYPE:
                return this.renderWithdrawDom();
        }
    }

    onFinish = (value) => {
        const { type } = this.props;
        switch(type) {
            case STAKE_TYPE:
                return this.delegate(value);
            case UNBOND_TYPE:
                return this.unbond(value);
        }
    }

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

    delegate = (value) => {
        const { CELRToken } = this.props;
        const celerAllowance = _.values(CELRToken.allowance)[0] || {};
        const { stateNum } = value;
        if (stateNum > web3.utils.fromWei(celerAllowance.value)) {
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
            this.sendDelegate(stateNum);
        }
    }

    unbond = (value) => {
        const {candidate} = this.props;
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
        this.props.onClose();
    }

    confirmWithdraw = () => {
        const { candidateId } = this.props;
        this.contracts.DPoS.methods.confirmWithdraw.cacheSend(candidateId);
    };

    setMax = () => {
        const { accountBalances, account } = this.props;
        const maxValue = accountBalances[account];
        this.formRef.current.setFieldsValue({stateNum: maxValue});
    }

    render() {
        const { visible, onClose, accountBalances, account, type } = this.props;
        const maxValue = accountBalances[account];
        // const maxValue = "200000000000000000000";
        // console.log(maxValue, web3.utils.toWei(maxValue.toString(), 'ether'))
        console.log(type);
        if(type === null) {
            return null;
        }
        return (
            <Modal title={this.renderTitle()} className={type === WITHDRAW_TYPE ? "withdraw-modal" : "form-modal"} width="25rem" visible={visible} onCancel={onClose} footer={null}>
                {this.renderUserInfo()}
                {this.renderContent()}
            </Modal>
        );
    }
}

ActionForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

ActionForm.contextTypes = {
  drizzle: PropTypes.object
};

function mapStateToProps(state) {
    const { contracts, accountBalances, accounts, DPoS, SGN } = state;
    return {
        CELRToken: contracts.CELRToken,
        accountBalances,
        account: accounts[0],
        DPoS: { ...DPoS, ...contracts.DPoS },
        SGN: { ...SGN, ...contracts.SGN }
    };
}
export default drizzleConnect(ActionForm, mapStateToProps);
