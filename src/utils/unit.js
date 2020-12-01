import _ from 'lodash';
import web3 from 'web3';

import './network';

export const CELR = 'CELR';

export const getUnitByAddress = (supportedTokens, address) => {
  const token = _.find(supportedTokens, (supportedToken) => supportedToken.address === address);

  if (!token) {
    return '';
  }
  return token.symbol;
};

export const formatCurrencyValue = (value, unit, showDecimal) => {
  if (!value) {
    return;
  }

  if (showDecimal) {
    return `${web3.utils.fromWei(value)} ${unit}`;
  }

  return `${web3.utils.fromWei(value).split('.')[0]} ${unit}`;
};

export const formatCelrValue = (value, showDecimal) => {
  return formatCurrencyValue(value, CELR, showDecimal);
};
