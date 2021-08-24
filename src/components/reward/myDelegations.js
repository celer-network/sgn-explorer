import React, { useState } from "react";
import { Card, Row, } from 'antd';
import "./myDelegations.less";
import DelegateForm from '../candidate/delegate-form';
import WithdrawForm from '../candidate/withdraw-form';
import Validator from "./validator";

const MyDelegations = (props) => {
    const [candidateId, setCandidateId] = useState("");
    const [candidate, setCandidate] = useState(null);
    const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
    const [isDelegateModalVisible, setIsDelegateModalVisible] = useState(false);

    const toggleDelegateModal = () => {
        setIsDelegateModalVisible(!isDelegateModalVisible);
    }
    const toggleWithdrawModal = () => {
        setIsWithdrawModalVisible(!isWithdrawModalVisible);
    }
    const stakeMethod = (id) => {
        setCandidateId(id);
        toggleDelegateModal();
    }
    const unBondMethod = (data) => {
        setCandidate(data);
        toggleWithdrawModal();
    }

    const {candidates} = props;
    const candidateIds = candidates.map((candidate) => {
        return {candidateId: candidate.args[0]};
    })

    return (
        <Card title="My Delegations" className="myDelegations">
            <Row>
                {candidateIds.map((validator, index) => {
                    return <Validator key={index} {...validator} stakeMethod={stakeMethod} unBondMethod={unBondMethod}/>
                })}
            </Row>
            <DelegateForm
                candidateId={candidateId}
                visible={isDelegateModalVisible}
                onClose={toggleDelegateModal}
            />
            <WithdrawForm
                candidate={candidate}
                visible={isWithdrawModalVisible}
                onClose={toggleWithdrawModal}
            />
        </Card>
    )
}

export default MyDelegations;