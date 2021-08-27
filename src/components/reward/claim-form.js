import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { Modal, Spin, Button } from 'antd';
import { CheckOutlined } from "@ant-design/icons";
import "./claim-form.less";
import careerPng from "../../images/careerbanner.png";

const INIT_ACTION = 'init';
const WAIT_ACTION = 'wait';
const REDEEM_ACTION = 'redeem';
const SUCCESS_ACTION = 'suceess';

const modal_titile = {
    [INIT_ACTION]: "Unlock Reward",
    [WAIT_ACTION]: "Unlocking Your Reward",
    [REDEEM_ACTION]: "Claim reward",
    [SUCCESS_ACTION]: "Claim reward",
}

class ClaimForm extends React.Component {
    constructor(props, context) {
        super(props);
    }

    renderBtn = () => {
        const { action } = this.props;
        switch(action) {
            case INIT_ACTION:
                return <Button type="primary" onClick={this.props.intendWithdraw}>Unlock Reward</Button>;
            case WAIT_ACTION:
                return <Button type="primary" className="waiting" disabled><Spin/></Button>;
            case REDEEM_ACTION:
                return <Button type="primary" onClick={this.props.redeemReward}>Claim</Button>
        }
    }

    renderContent = () => (
        <div className="claimform-container">
            <div className="claimform-img">
                <img src={careerPng}/>
            </div>
            <div className="claimform-content">
                <div className="unlock-reward">
                    <span>Unlock Reward</span>
                    <span>{this.props.reward}</span>
                </div>
                {this.renderBtn()}
            </div>
        </div>
    )

    renderSuccess = () => {
        return (
            <div className="success-content">
                <CheckOutlined className="icon-success"/>
                <div className="mian-title">Claim Reward Completed</div>
                <div className="sub-title">Congratulation! You’ve redeemed your rewards.</div>
                <div className="action-check">Check on Etherscan</div>
                <Button type="primary" className="action-ok" onClick={this.props.toggleClaimForm}>OK</Button>
            </div>
        )
    }

    render() {
        const{ visible, action } = this.props;
        return (
            <Modal
                title={modal_titile[action]}
                visible={visible}
                footer={null}
                width={401}
                className="claimForm-modal"
                onCancel={this.props.toggleClaimForm}
            >
                <div className="claimform-container">
                    {action !== SUCCESS_ACTION ? this.renderContent() : this.renderSuccess()}
                </div>
            </Modal>
        )
    }
}

ClaimForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };
  
  ClaimForm.contextTypes = {
    drizzle: PropTypes.object
  };
  
  function mapStateToProps(state) {
    const { network, contracts, accountBalances, accounts } = state;
    return {
        network,
        CELRToken: contracts.CELRToken,
        accountBalances,
        account: accounts[0],
    };
  }
  export default drizzleConnect(ClaimForm, mapStateToProps);