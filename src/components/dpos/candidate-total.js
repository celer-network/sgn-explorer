import React from "react";
import { formatCelrValue } from '../../utils/unit';

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
        <div style={{
            width: "100%",
            height: "3rem",
            display: "flex",
        }}>
            <div style={{ flex: 1 }}>
                <div>Total Validators</div>
                <div>{totalValidators}</div>
            </div>
            <div style={{ flex: 1}}>
                <div>Total Stake</div>
                <div>{totalStake} Celr</div>
            </div>
        </div>
    )
}

export default CandidateTotal;