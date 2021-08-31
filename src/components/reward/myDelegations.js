import React, { useState } from "react";
import { Card, Row, } from 'antd';
import "./myDelegations.less";
import TransForm from "../form-component";
import DelegateForm from '../candidate/delegate-form';
import WithdrawForm from '../candidate/withdraw-form';
import Validator from "./validator";
import {STAKE_TYPE, UNBOND_TYPE, WITHDRAW_TYPE} from "../../constant";

const MyDelegations = (props) => {
    const [candidateId, setCandidateId] = useState("");
    const [candidate, setCandidate] = useState(null);
    const [transModalVisible, setTransModalVisible] = useState(false);
    const [transModalType, setTransModalType] = useState(null);

    const toggleTransForm = () => {
        setTransModalVisible(!transModalVisible);
    }
    const stakeMethod = (id) => {
        setCandidateId(id);
        setTransModalType(STAKE_TYPE)
        toggleTransForm();
    }
    const unBondMethod = (id, data) => {
        setCandidateId(id);
        setCandidate(data);
        setTransModalType(UNBOND_TYPE)
        toggleTransForm();
    }
    const withdrawMethod = (id) => {
        setTransModalType(WITHDRAW_TYPE)
        setCandidateId(id);
        toggleTransForm();
    }

    const {candidates} = props;
    const candidateIds = candidates.map((candidate) => {
        return {candidateId: candidate.args[0]};
    })

    return (
        <Card title="My Delegations" className="myDelegations">
            <Row>
                {candidateIds.map((validator, index) => {
                    return <Validator key={index} {...validator} stakeMethod={stakeMethod} unBondMethod={unBondMethod} withdrawMethod={withdrawMethod}/>
                })}
            </Row>
            <TransForm
                type={transModalType}
                candidateId={candidateId}
                candidate={candidate}
                visible={transModalVisible}
                onClose={toggleTransForm}
            />
        </Card>
    )
}

export default MyDelegations;