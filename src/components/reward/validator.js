import React from "react";
import { Skeleton, Card, Statistic, Row, Col, Button, message } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { drizzleConnect } from '@drizzle/react-plugin';
import { RATE_BASE } from '../../utils/constant';
import { formatCelrValue } from "../../utils/unit";
import "./myDelegations.less";

class Validator extends React.Component {
    constructor(props, context) {
        super(props);
        this.contracts = context.drizzle.contracts;
        this.state = {
            delegator: null
        }
    }
    componentDidMount() {
        const { candidateId, accounts } = this.props;
        this.contracts.DPoS.methods.getDelegatorInfo(candidateId, accounts[0])
        .call((err, delegator) => {
            this.setState({
                delegator
            });
        });
    }
    confirmWithdraw = () => {
        const { candidateId } = this.props;
        this.contracts.DPoS.methods.confirmWithdraw.cacheSend(candidateId);
    };
    render() {
        const {stakeMethod, unBondMethod, DPoS, candidateId} = this.props;
        const delegatorInfo = this.state.delegator;
        const candidates = _.values(DPoS.getCandidateInfo);
        const candidate = _.find(candidates, (candidate) => candidate.args[0] === candidateId);
        const { commissionRate } = candidate.value;
        const delegatedStake = (delegatorInfo && delegatorInfo.delegatedStake) || '0';
        const undelegatingStake = (delegatorInfo && delegatorInfo.undelegatingStake) || '0';
        if(delegatedStake === "0") {
            return null;
        }
        return (
            <Col span={8} className="block-col">
                <Card className="validator-card">
                    <Row>
                        <Col span={12}>
                            rate: {`${commissionRate / RATE_BASE} %`}
                        </Col>
                        <Col span={12}>
                            id: {candidateId}
                        </Col>
                        <Col span={6}>
                            Your Stake
                        </Col>
                        <Col span={18}>
                            {formatCelrValue(delegatedStake)}
                        </Col>
                        <Col span={6}>
                            Unbonded Stake
                        </Col>
                        <Col span={18}>
                            {formatCelrValue(undelegatingStake)}
                        </Col>
                        <Col span={6}>
                        Withdrawable
                        </Col>
                        <Col span={18}>
                            --
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col span={7}>
                            <Button type="primary" className="extra-button btn-stake" onClick={stakeMethod} block>
                                Stake More
                            </Button>
                        </Col>
                        <Col span={7}>
                            <Button type="primary" className="extra-button btn-unbond" onClick={unBondMethod} block>
                                Unbond
                            </Button>
                        </Col>
                        <Col span={8}>
                            <Button
                                block
                                type="primary"
                                className="extra-button btn-withdraw" 
                                onClick={this.confirmWithdraw}
                                disabled={undelegatingStake === '0'}
                            >
                                withdraw
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Col>
        )
    }
}

Validator.propTypes = {
    dispatch: PropTypes.func.isRequired
};

Validator.contextTypes = {
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
  
export default drizzleConnect(Validator, mapStateToProps);