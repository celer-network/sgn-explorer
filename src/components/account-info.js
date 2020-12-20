import React, { useState } from 'react';
import { Card, Statistic, Button } from 'antd';

import { formatCelrValue } from '../utils/unit';

function AccountInfo(props) {
  const { celrValue } = props;
  const [showSetting, setShowSetting] = useState(false);

  return (
    <>
      <Card
        className="account-info"
        title="Account info"
        extra={<Button icon="setting" title="Setting" onClick={() => setShowSetting(true)} />}
      >
        <Statistic title="CELR allowance for DPoS Contract" value={formatCelrValue(celrValue)} />
      </Card>
    </>
  );
}

export default AccountInfo;
