import React from "react";
import { formatCelrValue } from '../../utils/unit';
import { Statistic, Row, Col } from 'antd';

function getCandidateTotal(candidates) {
  if(candidates && candidates.length > 0) {
    return candidates.reduce((prev,current)=>{
        const celr = formatCelrValue(current.value.stakingPool);
        const celerNum = celr.slice(0, -5);
        return prev+Number(celerNum);
    }, 0)
  }
  else {
      return 0;
  }
}

const CandidateTotal = (props) => {
    const { candidates } = props;
    const totalValidators = candidates.length;
    const totalStake = getCandidateTotal(candidates);
    return (
        <Row style={{ marginTop: '10px' }}>
          <Col span={12}>
            <Statistic
              title="Total Validators"
              value={totalValidators}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Stake"
              value={totalStake}
              suffix="Celr"
            />
          </Col>
        </Row>
    )
}

export default CandidateTotal;