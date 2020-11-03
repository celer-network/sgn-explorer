import { Modal } from 'antd';

const MAINNET = '1';
const ROPSTEN = '3';
const RINKEBY = '4';

const networkConfigs = {};

const localNetworkConfig = {};

export const getNetworkConfig = (networkID) => {
  let networkConfig = localNetworkConfig;
  if (networkConfigs[networkID]) {
    networkConfig = networkConfigs[networkID];
  }

  return networkConfig;
};

export const checkNetworkCompatibility = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const networkVersion = window.web3.currentProvider.networkVersion;
  const requiredId = process.env.REACT_APP_NETWORK_ID;
  let requiredName;
  switch (requiredId) {
    case ROPSTEN:
      requiredName = 'ropsten';
      break;
    case MAINNET:
      requiredName = 'mainnet';
      break;
    default:
      requiredName = 'unknown';
  }
  if (networkVersion !== requiredId) {
    Modal.error({
      title: 'Current network is not supported',
      content: `Please switch to ${requiredName}`
    });
    return false;
  }
  return true;
};
